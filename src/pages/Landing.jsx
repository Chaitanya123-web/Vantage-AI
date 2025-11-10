import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarSimple from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

const Landing = () => {
  const navigate = useNavigate();

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
    <div className="landing-page bg-gradient-to-b from-[#afcbff] via-white to-gray-50">
      <NavbarSimple />

      {/* Hero Section - Replaces HeroBanner */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-[#161032] via-[#2a1f4f] to-[#161032] overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#06A77D] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f1a208] rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Welcome to <span className="bg-gradient-to-r from-[#06A77D] to-[#D5C67A] bg-clip-text text-transparent">Vantage AI</span>
          </h1>
          <p className="text-2xl text-[#afcbff] mb-12 max-w-3xl mx-auto leading-relaxed">
            AI-powered financial intelligence for smarter investment decisions. Transform complex market data into actionable insights.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-[#06A77D] to-[#048a64] text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-[#048a64] hover:to-[#06A77D] transition-all transform hover:scale-105 shadow-2xl hover:shadow-[#06A77D]/50"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="my-16 px-4">
        <ImageSlider />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white to-[#afcbff]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#161032] mb-6">
              Powerful Features at Your Fingertips
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Leverage cutting-edge AI and machine learning to make informed investment decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={`${feature.emoji} ${feature.title}`}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-[#161032] to-[#2a1f4f] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-5xl font-bold text-center mb-6 text-white">
            How Vantage AI Works
          </h3>
          <p className="text-center text-[#afcbff] mb-16 text-xl max-w-2xl mx-auto leading-relaxed">
            Our three-step process transforms complex financial data into actionable insights
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-[#06A77D]/20 hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-[#06A77D] to-[#048a64] text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xl">
                1
              </div>
              <h4 className="text-2xl font-bold mb-4 mt-6 text-white">NLP Event Analysis</h4>
              <p className="text-[#afcbff] leading-relaxed">
                Real-time classification of global news and mapping events to sectors using advanced natural language processing.
              </p>
            </div>

            <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-[#D5C67A]/20 hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-[#D5C67A] to-[#c4b369] text-[#161032] rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xl">
                2
              </div>
              <h4 className="text-2xl font-bold mb-4 mt-6 text-white">Predictive Modeling</h4>
              <p className="text-[#afcbff] leading-relaxed">
                Ensemble ML models forecast stock-level impact and portfolio stress scenarios with high accuracy.
              </p>
            </div>

            <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-[#f1a208]/20 hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-[#f1a208] to-[#d89107] text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xl">
                3
              </div>
              <h4 className="text-2xl font-bold mb-4 mt-6 text-white">Explainable AI</h4>
              <p className="text-[#afcbff] leading-relaxed">
                LIME & SHAP provide interpretable insights, making AI predictions transparent and trustworthy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#06A77D]/10 to-[#06A77D]/5 hover:shadow-lg transition-all duration-300">
              <div className="text-6xl font-bold bg-gradient-to-r from-[#06A77D] to-[#048a64] bg-clip-text text-transparent mb-3">98%</div>
              <div className="text-[#161032] text-lg font-semibold">Prediction Accuracy</div>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#D5C67A]/10 to-[#D5C67A]/5 hover:shadow-lg transition-all duration-300">
              <div className="text-6xl font-bold bg-gradient-to-r from-[#D5C67A] to-[#c4b369] bg-clip-text text-transparent mb-3">10K+</div>
              <div className="text-[#161032] text-lg font-semibold">News Sources</div>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#f1a208]/10 to-[#f1a208]/5 hover:shadow-lg transition-all duration-300">
              <div className="text-6xl font-bold bg-gradient-to-r from-[#f1a208] to-[#d89107] bg-clip-text text-transparent mb-3">24/7</div>
              <div className="text-[#161032] text-lg font-semibold">Real-Time Analysis</div>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#afcbff]/10 to-[#afcbff]/5 hover:shadow-lg transition-all duration-300">
              <div className="text-6xl font-bold bg-gradient-to-r from-[#afcbff] to-[#8fb3ff] bg-clip-text text-transparent mb-3">100%</div>
              <div className="text-[#161032] text-lg font-semibold">Transparent AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#161032] via-[#2a1f4f] to-[#161032] text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#06A77D] rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f1a208] rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Unlock AI-Powered Financial Intelligence
          </h2>
          <p className="text-xl mb-10 text-[#afcbff] leading-relaxed max-w-3xl mx-auto">
            Explore predictive analytics, stress-test your portfolio, and get actionable insights backed by explainable AI. Start making smarter investment decisions today.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-[#06A77D] to-[#048a64] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-[#048a64] hover:to-[#06A77D] transition-all transform hover:scale-105 shadow-2xl hover:shadow-[#06A77D]/50"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="border-2 border-[#D5C67A] text-[#D5C67A] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#D5C67A] hover:text-[#161032] transition-all transform hover:scale-105 shadow-xl"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-[#161032]">
            Why Choose Vantage AI?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#06A77D]">
              <div className="text-6xl mb-6">🔒</div>
              <h4 className="font-bold text-xl mb-3 text-[#161032]">Bank-Level Security</h4>
              <p className="text-gray-600 leading-relaxed">Your data is encrypted and protected with industry-leading security</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#f1a208]">
              <div className="text-6xl mb-6">⚡</div>
              <h4 className="font-bold text-xl mb-3 text-[#161032]">Real-Time Updates</h4>
              <p className="text-gray-600 leading-relaxed">Get instant alerts on market events as they happen</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#D5C67A]">
              <div className="text-6xl mb-6">🎯</div>
              <h4 className="font-bold text-xl mb-3 text-[#161032]">Accurate Predictions</h4>
              <p className="text-gray-600 leading-relaxed">ML models trained on years of historical data</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#afcbff]">
              <div className="text-6xl mb-6">💡</div>
              <h4 className="font-bold text-xl mb-3 text-[#161032]">Easy to Understand</h4>
              <p className="text-gray-600 leading-relaxed">Complex AI made simple and transparent</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;