import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarSimple from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [nlpData, setNlpData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user profile");
    }
  };

  // Fetch NLP analysis example
  const fetchNlpData = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/nlp/analyze", {
        text: "Sample text for NLP analysis"
      });
      setNlpData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch NLP data");
    }
  };

  // Fetch predictions example
  const fetchPredictions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/predictions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setPredictions(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch predictions");
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchNlpData(), fetchPredictions()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading Dashboard...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSimple />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {user && (
          <section className="mb-6 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-2">User Info</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </section>
        )}

        {nlpData && (
          <section className="mb-6 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-2">NLP Analysis</h2>
            <p><strong>Event:</strong> {nlpData.event}</p>
            <p><strong>Sentiment:</strong> {nlpData.sentiment}</p>
            <p><strong>Sector:</strong> {nlpData.sector}</p>
          </section>
        )}

        {predictions && predictions.length > 0 && (
          <section className="mb-6 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Predictions</h2>
            <ul>
              {predictions.map((pred, idx) => (
                <li key={idx} className="mb-1">
                  {pred.date}: {pred.value}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
