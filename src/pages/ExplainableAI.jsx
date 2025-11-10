// src/pages/ExplainableAI.jsx
import React, { useState } from "react";
import NavbarSimple from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const ExplainableAI = () => {
  const [stock, setStock] = useState("");
  const [explainerType, setExplainerType] = useState("lime"); // lime or shap
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [error, setError] = useState("");

  const handleExplain = async (e) => {
    e.preventDefault();
    if (!stock) {
      setError("Please enter stock symbol or asset name.");
      return;
    }

    setLoading(true);
    setError("");
    setExplanation(null);

    try {
      // Call backend API
      const response = await axios.post("/api/ml/explain", {
        stock,
        explainer: explainerType,
      });

      setExplanation(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSimple />

      <main className="flex-grow flex flex-col items-center justify-start px-6 py-12 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-900">Explainable AI Insights</h1>
        <p className="text-gray-600 text-center max-w-xl mb-8">
          Get interpretable explanations of AI-driven stock predictions using LIME or SHAP.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg mb-8">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleExplain} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Stock / Asset Symbol</label>
              <input
                type="text"
                placeholder="Enter stock symbol (e.g., AAPL)"
                value={stock}
                onChange={(e) => setStock(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Explainer Type</label>
              <select
                value={explainerType}
                onChange={(e) => setExplainerType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="lime">LIME</option>
                <option value="shap">SHAP</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold text-white ${
                loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
              } transition`}
            >
              {loading ? "Analyzing..." : "Get Explanation"}
            </button>
          </form>
        </div>

        {explanation && (
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Explanation for {stock}</h2>

            {explanation.predicted_value && (
              <p className="text-gray-700 mb-4">
                <strong>Predicted Value:</strong> {explanation.predicted_value.toFixed(2)}
              </p>
            )}

            {explanation.explanation && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Feature Contributions:</h3>
                <ul className="list-disc list-inside">
                  {explanation.explanation.map(([feature, impact], idx) => (
                    <li key={idx}>
                      <span className="font-medium">{feature}:</span> {impact.toFixed(4)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {explanation.weights && (
              <div>
                <h3 className="font-semibold mb-2">Weights:</h3>
                <ul className="list-disc list-inside">
                  {Object.entries(explanation.weights).map(([feature, weight], idx) => (
                    <li key={idx}>
                      <span className="font-medium">{feature}:</span> {weight.toFixed(4)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ExplainableAI;
