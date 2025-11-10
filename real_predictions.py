# real_predictions.py - JSON Output for Node Integration
import sys
import os
import json
sys.path.append(os.path.join(os.path.dirname(__file__), 'ml'))

from ml.prediction.ensemble_model import SimpleEnsemble
from fetch_real_data import fetch_stock_data

def predict_stock(ticker='AAPL', period='6mo'):
    print(f"🎯 Making predictions for {ticker} (internal log)")

    df = fetch_stock_data(ticker, period)
    if df is None or df.empty:
        print(f"❌ No data found for {ticker}")
        return None

    model = SimpleEnsemble(seq_len=30)
    try:
        model.train(df)
    except Exception as e:
        print(f"⚠️ Training issue: {e}")

    result = model.predict(df)
    current_price = df['close'].iloc[-1]

    predictions = {
        "ticker": ticker,
        "current_price": float(current_price),
        "predictions": {
            "ensemble": float(result.ensemble),
            "xgboost": float(result.xgb),
            "lstm": float(result.lstm),
            "prophet": float(result.prophet)
        },
        "change_percent": {
            "ensemble": float((result.ensemble - current_price) / current_price * 100),
            "xgboost": float((result.xgb - current_price) / current_price * 100),
            "lstm": float((result.lstm - current_price) / current_price * 100),
            "prophet": float((result.prophet - current_price) / current_price * 100),
        }
    }
    return predictions

if __name__ == "__main__":
    try:
        # Get tickers from Node arguments
        import sys
        args = json.loads(sys.argv[1]) if len(sys.argv) > 1 else {}
        tickers = args.get("tickers", ["AAPL", "GOOGL", "MSFT"])

        results = []
        for ticker in tickers:
            prediction = predict_stock(ticker)
            if prediction:
                results.append(prediction)

        # ✅ Print ONLY JSON Output
        print(json.dumps({"success": True, "predictions": results}))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))