# ml/nlp/sector-mapper.py

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import KNeighborsClassifier
import joblib
import os

class SectorMapper:
    """
    Maps a company name or text to a financial sector.
    """

    def __init__(self, model_path="sector_model.pkl"):
        self.model_path = model_path
        self.vectorizer = TfidfVectorizer(max_features=3000)
        self.model = KNeighborsClassifier(n_neighbors=5)
        if os.path.exists(model_path):
            self.load_model()

    def train(self, texts, sectors):
        X = self.vectorizer.fit_transform(texts)
        self.model.fit(X, sectors)
        joblib.dump((self.model, self.vectorizer), self.model_path)

    def load_model(self):
        self.model, self.vectorizer = joblib.load(self.model_path)

    def predict(self, text):
        X = self.vectorizer.transform([text])
        return self.model.predict(X)[0]

# Example usage
if __name__ == "__main__":
    texts = ["Apple Inc.", "JP Morgan", "Pfizer"]
    sectors = ["Technology", "Finance", "Healthcare"]
    mapper = SectorMapper()
    mapper.train(texts, sectors)
    print(mapper.predict("Microsoft Corporation"))
