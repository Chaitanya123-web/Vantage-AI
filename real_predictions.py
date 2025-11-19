# real_predictions.py - Final Clean Version for Node Integration
import sys
import os
import json
sys.path.append(os.path.join(os.path.dirname(__file__), 'ml'))

from ml.prediction.ensemble_model import SimpleEnsemble
from fetch_real_data import fetch_stock_data

def predict_stock(ticker='AAPL', period='6mo'):
    try:
        df = fetch_stock_data(ticker, period)
        if df is None or df.empty:
            return {"ticker": ticker, "error": "No data"}

        model = SimpleEnsemble(seq_len=30)
        model.train(df)
        result = model.predict(df)
        current_price = float(df['close'].iloc[-1])

        predictions = {
            "ticker": ticker,
            "current_price": current_price,
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
                "prophet": float((result.prophet - current_price) / current_price * 100)
            }
        }
        return predictions

    except Exception as e:
        return {"ticker": ticker, "error": str(e)}

if __name__ == "__main__":
    try:
        args = json.loads(sys.argv[1]) if len(sys.argv) > 1 else {}
        tickers = args.get("tickers", ["AAPL", "GOOGL", "MSFT"])

        results = []
        for ticker in tickers:
            results.append(predict_stock(ticker))

        # ✅ Only output one clean JSON line
        print(json.dumps({"success": True, "predictions": results}))
        sys.exit(0)
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)