import React, { useState, useEffect } from "react";
import NavbarSimple from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

const PortfolioForm = () => {
  const [name, setName] = useState("");
  const [tickers, setTickers] = useState([""]);
  const [weights, setWeights] = useState([""]);
  const [message, setMessage] = useState("");
  const [portfolio, setPortfolio] = useState(null);

  // Fetch existing portfolio if user already has one
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get("/api/portfolio");
        setPortfolio(res.data);
      } catch (err) {
        console.log("No existing portfolio");
      }
    };
    fetchPortfolio();
  }, []);

  const addRow = () => {
    setTickers([...tickers, ""]);
    setWeights([...weights, ""]);
  };

  const removeRow = (index) => {
    const updatedTickers = tickers.filter((_, i) => i !== index);
    const updatedWeights = weights.filter((_, i) => i !== index);
    setTickers(updatedTickers);
    setWeights(updatedWeights);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanTickers = tickers.filter((t) => t.trim() !== "");
    const cleanWeights = weights
      .filter((w) => w.trim() !== "")
      .map((w) => parseFloat(w));

    if (cleanTickers.length === 0) return setMessage("Please enter at least one ticker.");
    if (cleanTickers.length !== cleanWeights.length)
      return setMessage("Each ticker must have a weight.");

    const totalWeight = cleanWeights.reduce((a, b) => a + b, 0);
    if (Math.abs(totalWeight - 1) > 0.01)
      return setMessage("Total weights must sum up to 1.");

    const weightsMap = {};
    cleanTickers.forEach((t, i) => (weightsMap[t.toUpperCase()] = cleanWeights[i]));

    try {
      const res = await axios.post("/api/portfolio", {
        name,
        tickers: cleanTickers,
        weights: weightsMap,
      });
      setMessage("✅ Portfolio saved successfully!");
      setPortfolio(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save portfolio.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#afcbff] via-white to-gray-50">
      <NavbarSimple />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-5xl font-bold text-center mb-4 text-[#161032]">My Portfolio</h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Create or update your portfolio of stocks for predictions and risk analysis.
        </p>

        {message && (
          <div
            className={`p-4 mb-6 text-center rounded-xl ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-200"
        >
          <div className="mb-6">
            <label className="block text-[#161032] font-semibold mb-2 text-lg">
              Portfolio Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Tech Investments"
              required
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#06A77D]/50 transition-all"
            />
          </div>

          <h3 className="text-lg font-bold text-[#161032] mb-3">Stocks and Weights</h3>
          {tickers.map((ticker, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="text"
                value={ticker}
                onChange={(e) => {
                  const newTickers = [...tickers];
                  newTickers[index] = e.target.value;
                  setTickers(newTickers);
                }}
                placeholder="Ticker (e.g., AAPL)"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#06A77D]/30"
              />
              <input
                type="number"
                step="0.01"
                value={weights[index]}
                onChange={(e) => {
                  const newWeights = [...weights];
                  newWeights[index] = e.target.value;
                  setWeights(newWeights);
                }}
                placeholder="Weight (e.g., 0.25)"
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#06A77D]/30"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="text-red-500 hover:text-red-600 font-bold px-3"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addRow}
            className="px-6 py-2 bg-gradient-to-r from-[#06A77D] to-[#048a64] text-white rounded-2xl font-semibold hover:from-[#048a64] hover:to-[#06A77D] transition-all shadow-md mt-4"
          >
            + Add Row
          </button>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-10 py-3 bg-gradient-to-r from-[#161032] to-[#2a1f4f] text-white rounded-2xl font-bold hover:from-[#2a1f4f] hover:to-[#161032] transition-transform transform hover:scale-[1.02] shadow-lg"
            >
              Save Portfolio
            </button>
          </div>
        </form>

        {portfolio && (
          <div className="mt-10 bg-[#f9fafb] p-6 rounded-2xl border border-gray-200 shadow-inner">
            <h2 className="text-2xl font-bold text-[#161032] mb-3">📈 Your Current Portfolio</h2>
            <p className="text-gray-600 mb-4">Name: {portfolio.name}</p>
            <ul className="list-disc list-inside text-[#161032]">
              {portfolio.tickers.map((ticker, i) => (
                <li key={i}>
                  <strong>{ticker}</strong> — Weight:{" "}
                  {portfolio.weights[ticker]?.toFixed(2) ?? 0}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioForm;