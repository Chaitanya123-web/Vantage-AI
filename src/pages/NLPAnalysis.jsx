// src/pages/NLPAnalysis.jsx
import React, { useState } from "react";
import NavbarSimple from "../components/Navbar";
import Footer from "../components/Footer";

const NLPAnalysis = () => {
  const [headline, setHeadline] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!headline.trim()) {
      setError("Please enter a news headline.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/nlp/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ headline }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.message || "Error analyzing headline.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSimple />

      <main className="flex-grow px-6 py-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">NLP Event Analysis</h1>
        <p className="text-center text-gray-600 mb-8">
          Enter a news headline and let Vantage AI classify the event, sentiment, and impacted sectors.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Paste your news headline here..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAnalyze}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {result && (
          <div className="bg-gray-50 p-6 rounded-lg shadow mt-6">
            <h2 className="text-2xl font-semibold mb-4">Analysis Result</h2>
            <div className="space-y-3">
              <p>
                <span className="font-bold">Event Type:</span> {result.event}
              </p>
              <p>
                <span className="font-bold">Sentiment:</span> {result.sentiment}
              </p>
              <p>
                <span className="font-bold">Impacted Sectors:</span>{" "}
                {result.sectors && result.sectors.length > 0
                  ? result.sectors.join(", ")
                  : "None"}
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NLPAnalysis;
