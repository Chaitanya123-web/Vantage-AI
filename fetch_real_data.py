import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

def fetch_stock_data(ticker='AAPL', period='1y'):
    """
    Fetch real stock data from Yahoo Finance
    
    Args:
        ticker: Stock symbol (e.g., 'AAPL', 'GOOGL', 'MSFT')
        period: Time period ('1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max')
    
    Returns:
        pandas DataFrame with OHLCV data
    """
    print(f"📊 Fetching data for {ticker}...")
    
    # Download data from Yahoo Finance
    stock = yf.Ticker(ticker)
    df = stock.history(period=period)
    
    if df.empty:
        print(f"❌ No data found for {ticker}")
        return None
    
    # Rename columns to match our format
    df.columns = df.columns.str.lower()
    
    # Keep only what we need
    df = df[['open', 'high', 'low', 'close', 'volume']]
    
    print(f"✅ Fetched {len(df)} days of data")
    print(f"   Date range: {df.index[0].date()} to {df.index[-1].date()}")
    print(f"   Latest close: ${df['close'].iloc[-1]:.2f}")
    
    return df

def fetch_multiple_stocks(tickers=['AAPL', 'GOOGL', 'MSFT'], period='1y'):
    """
    Fetch data for multiple stocks
    
    Returns:
        Dictionary of DataFrames
    """
    data = {}
    for ticker in tickers:
        df = fetch_stock_data(ticker, period)
        if df is not None:
            data[ticker] = df
    return data

def save_to_csv(df, ticker, filename=None):
    """
    Save data to CSV file
    """
    if filename is None:
        filename = f"{ticker}_data.csv"
    df.to_csv(filename)
    print(f"💾 Saved to {filename}")

# Test the function
if __name__ == "__main__":
    print("=" * 50)
    print("🔍 Real Stock Data Fetcher")
    print("=" * 50)
    
    # Test single stock
    df = fetch_stock_data('AAPL', period='1y')
    
    if df is not None:
        print("\n📈 Data Preview:")
        print(df.head())
        print("\n📊 Statistics:")
        print(df.describe())
        
        # Save to CSV
        save_to_csv(df, 'AAPL')
    
    print("\n" + "=" * 50)
    print("✅ Test Complete!")
    print("=" * 50)