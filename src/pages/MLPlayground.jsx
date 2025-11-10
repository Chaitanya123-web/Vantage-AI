import React, { useState } from "react";
import NavbarSimple from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

const MLPlayground = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const addLog = (text) => {
    setLogs((prev) => [...prev, `> ${text}`]);
  };

  const runMLPipeline = async () => {
    setLogs([]);
    setLoading(true);
    setResult(null);

    addLog("🚀 Real Stock Predictions Test");
    addLog("==================================================");
    addLog("🎯 Making predictions using Vantage AI models ...");

    try {
      addLog("📊 Fetching live data from Yahoo Finance...");
      const res = await axios.post("/api/predictions-ml");
      if (res.data.success && res.data.predictions) {
        addLog("✅ Python ML script executed successfully.");
        addLog("📈 Predictions generated:");
        setResult(res.data.predictions);
        res.data.predictions.forEach((pred) => {
          addLog(`\n🎯 ${pred.ticker}`);
          addLog(`Current Price: $${pred.current_price}`);
          addLog(`Ensemble: $${pred.predictions.ensemble}`);
          addLog(`XGBoost: $${pred.predictions.xgboost}`);
          addLog(`LSTM: $${pred.predictions.lstm}`);
          addLog(`Prophet: $${pred.predictions.prophet}`);
        });
      } else {
        addLog("⚠️ Fallback or mock predictions used instead.");
        setResult(res.data.predictions);
      }
    } catch (error) {
      console.error(error);
      addLog("❌ Error executing ML pipeline: " + (error.response?.data?.error || error.message));
    } finally {
      addLog("==================================================");
      addLog("✅ Execution Complete!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#afcbff] via-white to-gray-100">
      <NavbarSimple />

      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 w-full">
        <h1 className="text-5xl font-bold text-center mb-6 text-[#161032]">
          Vantage AI ML Playground
        </h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
          This is where you can view live backend execution for AI predictions,
          powered by our real machine learning engine.
        </p>

        <div className="text-center mb-8">
          <button
            onClick={runMLPipeline}
            disabled={loading}
            className={`px-10 py-4 rounded-2xl text-white font-bold text-lg transition-all transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#06A77D] to-[#048a64] hover:scale-105 hover:shadow-lg"
            }`}
          >
            {loading ? "Running..." : "Run ML Pipeline"}
          </button>
        </div>

        {/* Log Console */}
        <div className="bg-black text-green-400 font-mono text-sm rounded-2xl shadow-inner p-6 h-[400px] overflow-y-scroll border border-gray-700">
          {logs.length === 0 ? (
            <p className="text-gray-500 text-center mt-20">
              🧠 Logs will appear here when you start the pipeline...
            </p>
          ) : (
            logs.map((line, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {line}
              </p>
            ))
          )}
        </div>

        {/* Result Summary */}
        {result && (
          <div className="mt-10 bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-[#161032] mb-5">
              🧾 Prediction Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-[#afcbff]/20 to-[#ffffff]/80 border border-gray-200 rounded-2xl p-6 shadow-md hover:scale-105 transition-transform"
                >
                  <h3 className="text-2xl font-bold text-[#161032] mb-3">
                    {item.ticker}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Current:</strong> ${item.current_price?.toFixed(2)}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Ensemble:</strong> $
                    {item.predictions.ensemble?.toFixed(2)}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Prophet:</strong> $
                    {item.predictions.prophet?.toFixed(2)}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>XGBoost:</strong> $
                    {item.predictions.xgboost?.toFixed(2)}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>LSTM:</strong> $
                    {item.predictions.lstm?.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MLPlayground;