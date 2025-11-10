# stress_testing.py

import numpy as np
import pandas as pd
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class StressTestResult:
    var_95: float
    var_99: float
    expected_shortfall: float
    portfolio_returns: List[float]

def simple_stress_test(prices: pd.DataFrame,
                       weights: Dict[str, float],
                       num_simulations: int = 5000) -> StressTestResult:
    """
    Perform a simple Monte Carlo–based stress test on a portfolio.
    """
    # Calculate daily returns
    returns = prices.pct_change().dropna()

    tickers = list(weights.keys())
    rets = returns[tickers].values
    w = np.array([weights[t] for t in tickers])

    # Mean & covariance
    mu = np.mean(rets, axis=0)
    cov = np.cov(rets, rowvar=False)

    # Monte Carlo simulation
    sim_rets = np.random.multivariate_normal(mu, cov, num_simulations)
    port_sim = sim_rets.dot(w)

    # Risk metrics
    var_95 = np.percentile(port_sim, 5)
    var_99 = np.percentile(port_sim, 1)
    expected_shortfall = port_sim[port_sim <= var_95].mean()

    return StressTestResult(
        var_95=var_95,
        var_99=var_99,
        expected_shortfall=expected_shortfall,
        portfolio_returns=port_sim.tolist()
    )

# Example usage
if __name__ == "__main__":
    dates = pd.date_range("2021-01-01", periods=100)
    prices = pd.DataFrame({
        'AAPL': np.random.rand(100)*150 + 100,
        'MSFT': np.random.rand(100)*200 + 100,
        'JPM': np.random.rand(100)*120 + 80
    }, index=dates)

    weights = {'AAPL': 0.4, 'MSFT': 0.4, 'JPM': 0.2}

    result = simple_stress_test(prices, weights)
    print(f"VaR 95%: {result.var_95:.2%}")
    print(f"VaR 99%: {result.var_99:.2%}")
    print(f"Expected Shortfall: {result.expected_shortfall:.2%}")