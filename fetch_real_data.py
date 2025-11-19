# fetch_real_data.py
import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

def fetch_stock_data(ticker: str, period: str = '6mo', interval: str = '1d') -> pd.DataFrame:
    """
    Fetches historical stock data for a given ticker using yfinance.
    Cleans and standardizes the data for ML model usage.
    """
    try:
        print(f"📈 Fetching real data for {ticker} ...")
        end = datetime.now()
        start = end - timedelta(days=180)  # ✅ numeric days (not string)

        # Fetch data
        data = yf.download(
            ticker,
            start=start,
            end=end,
            interval=interval,
            progress=False
        )

        if data is None or data.empty:
            print(f"⚠️ No data returned for {ticker}")
            return pd.DataFrame()

        # Clean up and rename columns
        data = data.rename(columns={
            "Open": "open",
            "High": "high",
            "Low": "low",
            "Close": "close",
            "Volume": "volume"
        })

        data.index = pd.to_datetime(data.index)
        data = data[['open', 'high', 'low', 'close', 'volume']].dropna()

        print(f"✅ {ticker} data fetched: {len(data)} records")
        return data

    except Exception as e:
        print(f"❌ Error fetching data for {ticker}: {e}")
        return pd.DataFrame()


if __name__ == "__main__":
    # Test the function directly
    tickers = ["AAPL", "GOOGL"]
    all_data = {}

    for ticker in tickers:
        df = fetch_stock_data(ticker)
        if not df.empty:
            all_data[ticker] = df
            print(f"{ticker}: {len(df)} rows")

    if not all_data:
        print("⚠️ No valid data fetched for any ticker.")
    else:
        print("✅ All tickers processed successfully.")