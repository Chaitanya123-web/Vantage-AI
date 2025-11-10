import React from "react";
import { Routes, Route } from "react-router-dom";
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
import PortfolioForm from "./pages/PortfolioForm";
import MLPlayground from "./pages/MLPlayground"; // ✔️ import new ML page
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <PortfolioForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ml-playground"
        element={
          <ProtectedRoute>
            <MLPlayground />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explainable-ai"
        element={
          <ProtectedRoute>
            <ExplainableAI />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nlp-analysis"
        element={
          <ProtectedRoute>
            <NLPAnalysis />
          </ProtectedRoute>
        }
      />
      <Route
        path="/predictions"
        element={
          <ProtectedRoute>
            <Predictions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/stress-testing"
        element={
          <ProtectedRoute>
            <StressTesting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route
        path="*"
        element={
          <div className="text-center mt-20 text-xl text-[#161032] font-semibold">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

export default App;