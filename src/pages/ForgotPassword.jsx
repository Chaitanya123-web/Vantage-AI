// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarSimple from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered email.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      setSuccess(res.data.message || "Password reset link sent to your email!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSimple />

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-900">Forgot Password</h2>
          <p className="text-gray-600 text-center">
            Enter your registered email, and we'll send you a link to reset your password.
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold text-white ${
                loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
              } transition`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Remember your password?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
