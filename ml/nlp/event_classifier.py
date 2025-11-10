# ml/nlp/event_classifier.py

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import os

class EventClassifier:
    """
    Classifies financial events from text.
    """

    def __init__(self, model_path="event_model.pkl"):
        self.model_path = model_path
        self.vectorizer = TfidfVectorizer(max_features=5000)
        self.model = LogisticRegression()
        if os.path.exists(model_path):
            self.load_model()

    def train(self, texts, labels):
        X = self.vectorizer.fit_transform(texts)
        self.model.fit(X, labels)
        joblib.dump((self.model, self.vectorizer), self.model_path)

    def load_model(self):
        self.model, self.vectorizer = joblib.load(self.model_path)

    def predict(self, text):
        X = self.vectorizer.transform([text])
        return self.model.predict(X)[0]

# Example usage
if __name__ == "__main__":
    texts = ["Stock rises after earnings", "Company announces layoffs"]
    labels = ["Positive Event", "Negative Event"]
    classifier = EventClassifier()
    classifier.train(texts, labels)
    print(classifier.predict("Company revenue beats expectations"))
