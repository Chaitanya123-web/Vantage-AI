import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaEye,FaEyeSlash} from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-center">
    
        <h2 className="text-2xl font-bold text-blue-900">Vantage AI</h2>
        <p className="text-gray-500 mb-2">Financial Intelligence Platform</p>
        <h1 className="text-3xl font-bold mt-4 mb-2 text-center">Join Vantage AI</h1>
        <p className="text-gray-600 text-center max-w-xl mb-4">
          Create your free account and start accessing AI-powered financial insights and market intelligence today.
        </p>
        {/* Features */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-green-500 text-2xl">⚡</span>
            <span className="font-medium text-sm mt-1">Free<br />To Start</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-blue-500 text-2xl">⏰</span>
            <span className="font-medium text-sm mt-1">2-Minute<br />Setup</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-cyan-500 text-2xl">🔄</span>
            <span className="font-medium text-sm mt-1">Instant<br />Access</span>
          </div>
        </div>
        <button
          className="text-gray-700 text-sm mb-2 hover:text-blue-700"
          onClick={() => navigate("/")}
        >
          &larr; Back to Home
        </button>
      </div>

      {/* Signup Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ?  <FaEyeSlash  color="#6366f1"/> : <FaEye color="#374151" />}
            </span>
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <FaEyeSlash color="#6366f1" /> : <FaEye color="#374151" />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-800 transition"
          >
            <span className="text-lg">👤</span> Sign Up for Free
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign in here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;