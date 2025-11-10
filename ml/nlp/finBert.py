# ml/nlp/finBert.py

from transformers import BertTokenizer, BertForSequenceClassification
import torch
import torch.nn.functional as F

class FinBertSentiment:
    """
    FinBERT-based sentiment analysis for financial text.
    """

    def __init__(self, model_name="yiyanghkust/finbert-tone"):
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.model = BertForSequenceClassification.from_pretrained(model_name)
        self.model.eval()

    def predict(self, text):
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, padding=True)
        with torch.no_grad():
            outputs = self.model(**inputs)
            probs = F.softmax(outputs.logits, dim=1)
        sentiment_idx = torch.argmax(probs, dim=1).item()
        labels = ["Neutral", "Positive", "Negative"]
        return labels[sentiment_idx], probs[0][sentiment_idx].item()

# Example usage
if __name__ == "__main__":
    finbert = FinBertSentiment()
    text = "Apple stock surges after iPhone launch announcement"
    sentiment, confidence = finbert.predict(text)
    print(f"Sentiment: {sentiment}, Confidence: {confidence:.2f}")
