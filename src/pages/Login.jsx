import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaEye,FaEyeSlash} from "react-icons/fa";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password}),
          credentials: "include",
        });

        const text = await response.text();

        if (response.ok) {
          alert("Login successful!");
          navigate("/");
        }
        else {
          setError(text);
        }
      }
      catch (err) {
        console.error(err);
        setError("Server error. Please try again later.");
      };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-900">Vantage AI</h2>
        <p className="text-gray-500 mb-2">Financial Intelligence Platform</p>
        <h1 className="text-3xl font-bold mt-4 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-600 text-center max-w-xl mb-4">
          Sign in to access your personalized financial intelligence dashboard and AI-powered market insights.
        </p>
        {/* Features */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-blue-500 text-2xl">📈</span>
            <span className="font-medium text-sm mt-1">Real-time<br />Analysis</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-green-500 text-2xl">🧠</span>
            <span className="font-medium text-sm mt-1">AI-Powered<br />Predictions</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-orange-500 text-2xl">🛡️</span>
            <span className="font-medium text-sm mt-1">Risk<br />Management</span>
          </div>
        </div>
        <button
          className="text-gray-700 text-sm mb-2 hover:text-blue-700 "
          onClick={() => navigate("/")}
        >
          &larr; Back to Home
        </button>
      </div>

      {/* Login Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
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
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="mr-2"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-800 transition"
          >
            <span className="text-lg">→</span> Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;