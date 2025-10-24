// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarSimple from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import ImageSlider from "../components/ImageSlider";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

const Landing = () => {
  const navigate = useNavigate();

  // Features highlighting ML capabilities
  const features = [
    {
      title: "Event-Driven Insights",
      description:
        "Our NLP models classify global news events and map them to sectors or companies affected.",
      emoji: "📰",
    },
    {
      title: "Predictive Portfolio Analysis",
      description:
        "Ensemble ML models forecast stock impacts and perform stress testing for your portfolio.",
      emoji: "📊",
    },
    {
      title: "Explainable AI",
      description:
        "LIME & SHAP explainers provide clear reasoning behind AI predictions for smarter decisions.",
      emoji: "🧠",
    },
  ];

  return (
    <div className="landing-page">
      <NavbarSimple />

      <HeroBanner />

      <section className="my-12">
        <ImageSlider />
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={`${feature.emoji} ${feature.title}`}
            description={feature.description}
          />
        ))}
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center my-16 px-6">
        <h2 className="text-3xl font-bold mb-4">
          Unlock AI-Powered Financial Intelligence
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Explore predictive analytics, stress-test your portfolio, and get actionable insights backed by explainable AI.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-100 transition"
          >
            Login
          </button>
        </div>
      </section>

      {/* ML Highlights Section (Optional for future dynamic updates) */}
      <section className="bg-gray-50 py-12">
        <h3 className="text-2xl font-bold text-center mb-8">
          How Vantage AI Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-2">NLP Event Analysis</h4>
            <p className="text-gray-600">
              Real-time classification of global news and mapping events to sectors.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-2">Predictive Modeling</h4>
            <p className="text-gray-600">
              Ensemble ML models forecast stock-level impact and portfolio stress scenarios.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-2">Explainable AI</h4>
            <p className="text-gray-600">
              LIME & SHAP provide interpretable insights, making AI predictions transparent.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
