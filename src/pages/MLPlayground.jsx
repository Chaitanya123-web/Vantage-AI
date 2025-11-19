import React, { useState } from "react";

const MLPlayground = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRunML = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setSuccess(false);

    try {
      console.log("🎯 Running ML Playground...");
      const res = await fetch("http://localhost:3000/api/run-ml", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errText}`);
      }

      const data = await res.json();
      console.log("✅ Response received:", data);

      if (!data.success) {
        throw new Error(data.error || "Unknown ML execution error");
      }

      setResults(data.logs || []);
      setSuccess(true);
    } catch (err) {
      console.error("❌ ML Playground failed:", err);
      setError(err.message || "Something went wrong during ML execution");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-start py-12 px-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          🧠 ML Playground
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Run AI-powered portfolio analysis and see live predictions from your integrated Python ML models.
        </p>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleRunML}
            disabled={loading}
            className={`px-6 py-3 text-white font-semibold rounded-xl shadow-md transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "⏳ Running..." : "🚀 Run ML Predictions"}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        {success && !loading && (
          <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-6">
            ✅ ML Predictions fetched successfully!
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-500">Running ML models... Please wait</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              🧾 Model Logs:
            </h2>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {results.join("\n")}
              </pre>
            </div>
          </div>
        )}

        {!loading && !results.length && !error && (
          <div className="text-gray-500 text-center mt-8">
            💡 Click the button above to start the ML prediction process.
          </div>
        )}
      </div>
    </div>
  );
};

export default MLPlayground;