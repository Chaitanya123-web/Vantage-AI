#test_mp.py
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'ml'))

print("=" * 50)
print("🧪 Testing ML Models")
print("=" * 50)

# Test 1: Import Ensemble Model
print("\n1. Testing Ensemble Model Import...")
try:
    from ml.prediction.ensemble_model import SimpleEnsemble
    print("✅ Ensemble model imported successfully")
except Exception as e:
    print(f"❌ Failed to import ensemble: {e}")

# Test 2: Create and Train Ensemble
print("\n2. Testing Ensemble Training...")
try:
    import pandas as pd
    import numpy as np
    from datetime import datetime
    
    # Create sample data
    dates = pd.date_range(end=datetime.now(), periods=100, freq='D')
    df = pd.DataFrame({
        'open': np.random.rand(100) * 100 + 100,
        'high': np.random.rand(100) * 100 + 110,
        'low': np.random.rand(100) * 100 + 90,
        'close': np.random.rand(100) * 100 + 100,
        'volume': np.random.randint(1000, 5000, 100)
    }, index=dates)
    
    # Train model
    model = SimpleEnsemble(seq_len=30)
    model.train(df)
    print("✅ Model trained successfully")
    
    # Make prediction
    result = model.predict(df)
    print(f"✅ Prediction made:")
    print(f"   Ensemble: ${result.ensemble:.2f}")
    print(f"   XGBoost:  ${result.xgb:.2f}")
    print(f"   LSTM:     ${result.lstm:.2f}")
    print(f"   Prophet:  ${result.prophet:.2f}")
    
except Exception as e:
    print(f"❌ Failed during training/prediction: {e}")

# Test 3: Import SHAP Explainer
print("\n3. Testing SHAP Explainer...")
try:
    from ml.explainable_ai.shap_explainer import SHAPExplainer
    print("✅ SHAP explainer imported successfully")
except Exception as e:
    print(f"❌ Failed to import SHAP: {e}")

# Test 4: Import LIME Explainer
print("\n4. Testing LIME Explainer...")
try:
    from ml.explainable_ai.lime_explainer import LimeExplainer
    print("✅ LIME explainer imported successfully")
except Exception as e:
    print(f"❌ Failed to import LIME: {e}")

# Test 5: Import FinBERT
print("\n5. Testing FinBERT...")
try:
    from ml.nlp.finBert import FinBertSentiment
    finbert = FinBertSentiment()
    print("✅ FinBERT imported successfully")
    
    # Test prediction
    text = "Apple stock surges after strong earnings report"
    sentiment, confidence = finbert.predict(text)
    print(f"✅ Sentiment analysis working:")
    print(f"   Text: '{text}'")
    print(f"   Sentiment: {sentiment}")
    print(f"   Confidence: {confidence:.2%}")
    
except Exception as e:
    print(f"❌ Failed with FinBERT: {e}")

# Test 6: Import Stress Testing
print("\n6. Testing Stress Testing...")
try:
    from ml.prediction.stress_testing import simple_stress_test
    
    # Create sample portfolio
    dates = pd.date_range(end=datetime.now(), periods=100, freq='D')
    prices = pd.DataFrame({
        'AAPL': np.random.rand(100) * 150 + 100,
        'GOOGL': np.random.rand(100) * 200 + 100,
    }, index=dates)
    
    weights = {'AAPL': 0.6, 'GOOGL': 0.4}
    
    result = simple_stress_test(prices, weights)
    print("✅ Stress testing working:")
    print(f"   VaR 95%: {result.var_95:.2%}")
    print(f"   VaR 99%: {result.var_99:.2%}")
    print(f"   Expected Shortfall: {result.expected_shortfall:.2%}")
    
except Exception as e:
    print(f"❌ Failed with stress testing: {e}")

print("\n" + "=" * 50)
print("🎯 Test Complete!")
print("=" * 50)