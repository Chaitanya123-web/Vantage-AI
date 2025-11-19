import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
os.environ["TORCH_CUDA_DUMMY_DEVICE"] = "0"
os.environ["OMP_NUM_THREADS"] = "1"

import numpy as np
import pandas as pd
import xgboost as xgb
from prophet import Prophet
import torch
import torch.nn as nn
from sklearn.preprocessing import StandardScaler
from datetime import datetime
from dataclasses import dataclass

@dataclass
class PredictionResult:
    ensemble: float
    xgb: float
    lstm: float
    prophet: float
    timestamp: datetime


class SimpleLSTM(nn.Module):
    def __init__(self, input_size=5, hidden_size=50):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, x):
        out, _ = self.lstm(x)
        out = out[:, -1, :]
        return self.fc(out)


class SimpleEnsemble:
    def __init__(self, seq_len=30):
        self.seq_len = seq_len
        self.xgb = xgb.XGBRegressor(n_estimators=50, verbosity=0)
        self.lstm = SimpleLSTM()
        try:
            self.prophet = Prophet(daily_seasonality=False)
        except Exception as e:
            print(f"Prophet initialization failed: {e}")
            self.prophet = None
        self.scaler = StandardScaler()
        self.device = 'cpu'

    def prepare_xgb(self, df):
        if len(df) <= self.seq_len:
            return np.empty((0, 2))

        features = []
        for i in range(self.seq_len, len(df)):
            window = df.iloc[i - self.seq_len:i]
            features.append([
                float(window['close'].mean()),
                float(window['volume'].mean())
            ])
        return np.array(features)

    def prepare_lstm(self, df):
        if len(df) <= self.seq_len:
            return torch.tensor([])

        data = df[['open', 'high', 'low', 'close', 'volume']].values
        sequences = [data[i - self.seq_len:i] for i in range(self.seq_len, len(data))]
        return torch.tensor(np.array(sequences), dtype=torch.float32)

    def prepare_prophet(self, df):
        df_reset = df.copy().reset_index()
        df_reset.columns = [c.lower() for c in df_reset.columns]
        if "date" in df_reset.columns:
            df_reset = df_reset.rename(columns={"date": "ds"})
        elif "index" in df_reset.columns:
            df_reset = df_reset.rename(columns={"index": "ds"})
        elif "datetime" in df_reset.columns:
            df_reset = df_reset.rename(columns={"datetime": "ds"})
        else:
            df_reset["ds"] = df_reset.index
        df_reset["ds"] = pd.to_datetime(df_reset["ds"])
        df_reset = df_reset.rename(columns={"close": "y"})
        return df_reset[["ds", "y"]]

    def train(self, df):
        print("Training ensemble model ...")
        xgb_X = self.prepare_xgb(df)
        y = df['close'].values[self.seq_len:]

        if xgb_X.shape[0] == 0 or y.shape[0] == 0:
            print("Not enough data to train the model.")
            return

        try:
            print("Training XGBoost ...")
            self.xgb.fit(xgb_X, y)
            print("XGBoost trained successfully.")
        except Exception as e:
            print(f"XGBoost training failed: {e}")

        try:
            print("Training LSTM ...")
            lstm_X = self.prepare_lstm(df)
            lstm_y = torch.tensor(y.reshape(-1, 1), dtype=torch.float32)
            if len(lstm_X) > 1:
                opt = torch.optim.Adam(self.lstm.parameters(), lr=0.01)
                loss_fn = nn.MSELoss()
                self.lstm.train()
                for epoch in range(5):
                    opt.zero_grad()
                    pred = self.lstm(lstm_X)
                    loss = loss_fn(pred, lstm_y)
                    loss.backward()
                    opt.step()
                print("LSTM trained successfully.")
        except Exception as e:
            print(f"LSTM training failed: {e}")

        if self.prophet is not None:
            try:
                print("🔹 Training Prophet ...")
                prop_df = self.prepare_prophet(df)
                self.prophet.fit(prop_df)
                print("Prophet trained successfully.")
            except Exception as e:
                print(f"Prophet training failed: {e}")
                self.prophet = None

    def predict(self, df):
        print(f"Making predictions for {df.index[-1].strftime('%Y-%m-%d')}")

        try:
            xgb_X = self.prepare_xgb(df)
            if xgb_X.shape[0] == 0:
                raise ValueError("Insufficient data for XGBoost.")
            xgb_pred = float(self.xgb.predict(xgb_X[-1].reshape(1, -1))[0])
        except Exception as e:
            print(f"XGBoost prediction failed: {e}")
            xgb_pred = float(df['close'].iloc[-1])

        try:
            lstm_X = self.prepare_lstm(df)
            self.lstm.eval()
            with torch.no_grad():
                lstm_pred = float(self.lstm(lstm_X[-1].unsqueeze(0)).item())
        except Exception as e:
            print(f"LSTM prediction failed: {e}")
            lstm_pred = float(df['close'].iloc[-1])

        try:
            if self.prophet is not None:
                future = pd.DataFrame({'ds': [df.index[-1] + pd.Timedelta(days=1)]})
                prophet_pred = float(self.prophet.predict(future)['yhat'].iloc[0])
            else:
                prophet_pred = (xgb_pred + lstm_pred) / 2
        except Exception as e:
            print(f"Prophet prediction failed: {e}")
            prophet_pred = (xgb_pred + lstm_pred) / 2

        ensemble_pred = float((xgb_pred + lstm_pred + prophet_pred) / 3)

        print(f"Predictions done → XGB: {xgb_pred:.2f}, LSTM: {lstm_pred:.2f}, Prophet: {prophet_pred:.2f}, Ensemble: {ensemble_pred:.2f}")

        return PredictionResult(
            ensemble=ensemble_pred,
            xgb=xgb_pred,
            lstm=lstm_pred,
            prophet=prophet_pred,
            timestamp=datetime.now()
        )