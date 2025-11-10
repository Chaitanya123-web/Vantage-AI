import React, { useState } from "react";
import axios from "axios";
import NavbarSimple from "../components/Navbar";
import Footer from "../components/Footer";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StressTesting = () => {
  const [tickers, setTickers] = useState(["AAPL", "MSFT", "JPM"]);
  const [weights, setWeights] = useState({ AAPL: 0.4, MSFT: 0.4, JPM: 0.2 });
  const [prices, setPrices] = useState({
    AAPL: Array(100).fill(0).map(() => (Math.random() * 150 + 100).toFixed(2)),
    MSFT: Array(100).fill(0).map(() => (Math.random() * 200 + 100).toFixed(2)),
    JPM: Array(100).fill(0).map(() => (Math.random() * 120 + 80).toFixed(2))
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleWeightChange = (ticker, value) => {
    setWeights({ ...weights, [ticker]: parseFloat(value) });
  };

  const runStressTest = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/predictions/stress-testing", {
        prices,
        weights
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error running stress test!");
    }
    setLoading(false);
  };

  return (
    <div>
      <NavbarSimple />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Stress Testing</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Portfolio Weights</h2>
          {tickers.map((t) => (
            <div key={t} className="mb-2">
              <label className="mr-2">{t}:</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={weights[t]}
                onChange={(e) => handleWeightChange(t, e.target.value)}
                className="border p-1 w-20"
              />
            </div>
          ))}
        </div>

        <button
          onClick={runStressTest}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Running..." : "Run Stress Test"}
        </button>

        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Results</h2>
            <p>VaR 95%: {result.var_95.toFixed(2)}</p>
            <p>VaR 99%: {result.var_99.toFixed(2)}</p>
            <p>Expected Shortfall: {result.expected_shortfall.toFixed(2)}</p>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Portfolio Returns (sample)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={result.portfolio_returns.map((val, i) => ({ name: i, value: val }))}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default StressTesting;
