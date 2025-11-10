# lime_explainer.py

import numpy as np
import pandas as pd
from lime.lime_tabular import LimeTabularExplainer
from typing import Dict, Any

class LimeExplainer:
    """
    Wrapper for LIME explanations for tabular models (like XGBoost in your ensemble).
    """
    def __init__(self, feature_names: list, class_names: list = ["price"]):
        """
        Initialize the LIME explainer for regression tasks.
        """
        self.feature_names = feature_names
        self.class_names = class_names
        self.explainer = None

    def fit(self, X_train: np.ndarray):
        """
        Fit the LimeTabularExplainer on training data distribution.
        """
        self.explainer = LimeTabularExplainer(
            X_train,
            feature_names=self.feature_names,
            mode="regression",
            discretize_continuous=True
        )

    def explain(self, model_predict_fn, sample: np.ndarray, num_features: int = 5) -> Dict[str, Any]:
        """
        Generate local explanation for a single prediction.
        Args:
            model_predict_fn: callable, model’s predict function
            sample: np.ndarray of one input row
        Returns:
            dict with feature impact
        """
        if self.explainer is None:
            raise ValueError("Call fit() with training data before explain()")

        exp = self.explainer.explain_instance(
            sample,
            model_predict_fn,
            num_features=num_features
        )

        return {
            "predicted_value": float(model_predict_fn(sample.reshape(1, -1))[0]),
            "explanation": exp.as_list(),
            "weights": exp.local_exp[1] if 1 in exp.local_exp else exp.local_exp[0]
        }

# Example Usage
if __name__ == "__main__":
    from sklearn.datasets import load_boston
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.model_selection import train_test_split

    # Load sample data
    X, y = load_boston(return_X_y=True)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train simple model
    model = RandomForestRegressor().fit(X_train, y_train)

    # Initialize LIME
    explainer = LimeExplainer(feature_names=[f"f{i}" for i in range(X.shape[1])])
    explainer.fit(X_train)

    # Pick a sample
    sample = X_test[0]
    explanation = explainer.explain(model.predict, sample)

    print("Predicted value:", explanation["predicted_value"])
    print("Top contributing features:")
    for feat, val in explanation["explanation"]:
        print(f"  {feat}: {val:+.4f}")
