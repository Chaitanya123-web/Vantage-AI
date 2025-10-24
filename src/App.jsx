// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ExplainableAI from "./pages/ExplainableAI";
import NLPAnalysis from "./pages/NLPAnalysis";
import Predictions from "./pages/Predictions";
import StressTesting from "./pages/StressTesting";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected / Dashboard Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/explainable-ai" element={<ExplainableAI />} />
      <Route path="/nlp-analysis" element={<NLPAnalysis />} />
      <Route path="/predictions" element={<Predictions />} />
      <Route path="/stress-testing" element={<StressTesting />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />

      {/* Fallback for unknown routes */}
      <Route path="*" element={<div className="text-center mt-20 text-xl">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
