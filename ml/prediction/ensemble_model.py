# ensemble.py
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
        out = out[:, -1, :]  # take last timestep
        return self.fc(out)

class SimpleEnsemble:
    def __init__(self, seq_len=30):
        self.seq_len = seq_len
        self.xgb = xgb.XGBRegressor(n_estimators=50)
        self.lstm = SimpleLSTM()
        self.prophet = Prophet(daily_seasonality=False)
        self.scaler = StandardScaler()
        self.device = 'cpu'

    def prepare_xgb(self, df):
        features = []
        for i in range(self.seq_len, len(df)):
            window = df.iloc[i-self.seq_len:i]
            features.append([window['close'].mean(), window['volume'].mean()])
        return np.array(features)

    def prepare_lstm(self, df):
        data = df[['open','high','low','close','volume']].values
        sequences = []
        for i in range(self.seq_len, len(data)):
            sequences.append(data[i-self.seq_len:i])
        return torch.tensor(sequences, dtype=torch.float32)

    def prepare_prophet(self, df):
        df = df.reset_index().rename(columns={'index':'ds','close':'y'})
        df['ds'] = pd.to_datetime(df['ds'])
        return df[['ds','y']]

    def train(self, df):
        # Align data
        xgb_X = self.prepare_xgb(df)
        y = df['close'].values[self.seq_len:]

        # Train XGBoost
        self.xgb.fit(xgb_X, y)

        # Train LSTM (only if enough samples)
        lstm_X = self.prepare_lstm(df)
        lstm_y = torch.tensor(y.reshape(-1,1), dtype=torch.float32)
        if len(lstm_X) > 1:  #  prevent batchnorm error
            opt = torch.optim.Adam(self.lstm.parameters(), lr=0.01)
            loss_fn = nn.MSELoss()
            self.lstm.train()
            for _ in range(10):
                opt.zero_grad()
                pred = self.lstm(lstm_X)
                loss = loss_fn(pred, lstm_y)
                loss.backward()
                opt.step()

        # Train Prophet
        prop_df = self.prepare_prophet(df)
        self.prophet.fit(prop_df)

    def predict(self, df):
        # XGBoost
        xgb_X = self.prepare_xgb(df)[-1].reshape(1,-1)
        xgb_pred = self.xgb.predict(xgb_X)[0]

        # LSTM
        lstm_X = self.prepare_lstm(df)[-1].unsqueeze(0)
        self.lstm.eval()
        with torch.no_grad():
            lstm_pred = self.lstm(lstm_X).item()

        # Prophet
        future = pd.DataFrame({'ds':[df.index[-1] + pd.Timedelta(days=1)]})
        prophet_pred = self.prophet.predict(future)['yhat'].iloc[0]

        # Simple average ensemble
        ensemble_pred = (xgb_pred + lstm_pred + prophet_pred)/3

        return PredictionResult(
            ensemble=ensemble_pred,
            xgb=xgb_pred,
            lstm=lstm_pred,
            prophet=prophet_pred,
            timestamp=datetime.now()
        )

# Example usage
if __name__ == "__main__":
    dates = pd.date_range("2021-01-01", periods=100)
    df = pd.DataFrame({
        'open': np.random.rand(100)*100,
        'high': np.random.rand(100)*100,
        'low': np.random.rand(100)*100,
        'close': np.random.rand(100)*100,
        'volume': np.random.randint(1000,5000,100)
    }, index=dates)

    model = SimpleEnsemble(seq_len=30)
    model.train(df)
    result = model.predict(df)
    print("Ensemble:", result.ensemble)
    print("XGB:", result.xgb)
    print("LSTM:", result.lstm)
    print("Prophet:", result.prophet)
    print("Timestamp:", result.timestamp)