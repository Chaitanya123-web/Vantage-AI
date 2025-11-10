# shap_explainer.py

import shap
import numpy as np
import pandas as pd
import torch
from ensemble_model import SimpleEnsemble
from typing import List, Union

class SHAPExplainer:
    """
    Generates SHAP explanations for the Vantage AI ensemble predictions.
    Supports XGBoost and LSTM models.
    """

    def __init__(self, model: SimpleEnsemble, feature_columns: List[str]):
        self.model = model
        self.feature_columns = feature_columns

    def explain_xgb(self, df: pd.DataFrame, max_display: int = 10):
        """
        Explain XGBoost predictions using TreeExplainer.
        """
        xgb_features = self.model.prepare_xgb(df)
        explainer = shap.TreeExplainer(self.model.xgb)
        shap_values = explainer.shap_values(xgb_features)
        
        # Create a DataFrame for visualization
        shap_df = pd.DataFrame(shap_values, columns=['close_mean', 'volume_mean'])
        print("\nSHAP values for XGBoost (first row):")
        print(shap_df.head(1))
        
        # Optional: visualize
        shap.summary_plot(shap_values, xgb_features, feature_names=['close_mean', 'volume_mean'], max_display=max_display)
        return shap_df

    def explain_lstm(self, df: pd.DataFrame, max_display: int = 10):
        """
        Explain LSTM predictions using KernelExplainer.
        Warning: KernelExplainer can be slow for large datasets.
        """
        lstm_features = self.model.prepare_lstm(df).numpy()
        lstm_features = lstm_features.reshape(lstm_features.shape[0], -1)  # flatten for SHAP

        def lstm_predict(x: np.ndarray) -> np.ndarray:
            # Reshape back to sequence format
            x_seq = torch.tensor(x.reshape(x.shape[0], self.model.seq_len, len(self.feature_columns)), dtype=torch.float32)
            self.model.lstm.eval()
            with torch.no_grad():
                preds = self.model.lstm(x_seq).numpy().flatten()
            return preds

        explainer = shap.KernelExplainer(lstm_predict, lstm_features[:50])  # use subset as background
        shap_values = explainer.shap_values(lstm_features)
        
        # Create DataFrame for easier analysis
        shap_df = pd.DataFrame(shap_values, columns=[f"{f}_{t}" for t in range(self.model.seq_len) for f in self.feature_columns])
        print("\nSHAP values for LSTM (first row):")
        print(shap_df.head(1))

        # Optional: visualize
        shap.summary_plot(shap_values, lstm_features, feature_names=shap_df.columns[:max_display], max_display=max_display)
        return shap_df

    def explain(self, df: pd.DataFrame, model_type: str = 'xgb', max_display: int = 10):
        """
        Generic method to choose model type for explanation.
        """
        if model_type == 'xgb':
            return self.explain_xgb(df, max_display=max_display)
        elif model_type == 'lstm':
            return self.explain_lstm(df, max_display=max_display)
        else:
            raise ValueError("Unsupported model_type. Choose 'xgb' or 'lstm'.")

# Example usage
if __name__ == "__main__":
    # Sample data
    dates = pd.date_range("2021-01-01", periods=100)
    df = pd.DataFrame({
        'open': np.random.rand(100)*100,
        'high': np.random.rand(100)*100,
        'low': np.random.rand(100)*100,
        'close': np.random.rand(100)*100,
        'volume': np.random.randint(1000,5000,100)
    }, index=dates)

    features = ['open', 'high', 'low', 'close', 'volume']

    # Load model and train
    model = SimpleEnsemble(seq_len=30)
    model.train(df)

    # Explain predictions
    explainer = SHAPExplainer(model, feature_columns=features)
    xgb_shap = explainer.explain(df, model_type='xgb')
    lstm_shap = explainer.explain(df, model_type='lstm')
