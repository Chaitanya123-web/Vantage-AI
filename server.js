const express = require("express");
const axios = require('axios');
const { PythonShell } = require('python-shell');
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./database/index");
const Usermodel = require("./database/models/User");
const Portfoliomodel = require("./database/models/Portfolio");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

// --- AUTHENTICATION MIDDLEWARE ---
const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    console.log("🔍 Authenticate middleware - Token:", token ? "EXISTS" : "MISSING");
    if (!token) {
        return res.status(401).send({ message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, "chaibiscuit");
        console.log("✅ Token verified for user:", decoded._id);
        req.user = decoded;
        next();
    } catch (ex) {
        console.error(" Token verification failed:", ex.message);
        res.status(401).send({ message: "Invalid token." });
    }
};



app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    const userExists = await Usermodel.findOne({ email });
    if (userExists) return res.status(400).send("User already exists");

    if (password !== confirmpassword)
      return res.status(400).send("Passwords do not match");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await Usermodel.create({ name, email, password: hash });

    const token = jwt.sign({ _id: newUser._id, email }, "chaibiscuit");

    res.cookie("token", token, { 
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });
    
    console.log("✅ Signup successful - Cookie set for:", email);
    res.status(201).send("Signup successful");
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).send("Server error during signup");
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });
    if (!user) return res.status(400).send("User does not exist");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ _id: user._id, email: user.email }, "chaibiscuit");
    
    res.cookie("token", token, { 
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });
    
    console.log("✅ Login successful - Cookie set for:", email);
    res.status(200).send("Login successful");
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).send("Server error during login");
  }
});

// --- DASHBOARD CHECK ENDPOINT ---
app.get("/api/dashboard", authenticate, (req, res) => {
    console.log("✅ Dashboard check successful");
    res.status(200).send({ message: "Authenticated" });
});

// --- PROFILE ROUTES ---

app.get("/api/profile", authenticate, async (req, res) => {
  try {
    console.log("🔍 Fetching profile for user ID:", req.user._id);
    const user = await Usermodel.findById(req.user._id).select("-password -__v -createdAt");
    
    if (!user) {
      console.error("❌ User not found in database:", req.user._id);
      res.clearCookie("token");
      return res.status(404).send({ message: "User not found" });
    }
    
    console.log("✅ Profile found:", user.name, user.email);
    res.json(user);
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    res.status(500).send({ message: "Error fetching profile" });
  }
});

app.put("/api/profile", authenticate, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user._id;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await Usermodel.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password -__v -createdAt");

    if (!updatedUser) return res.status(404).send({ message: "User not found" });

    console.log("✅ Profile updated:", updatedUser.name, updatedUser.email);
    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Profile update error:", err);
    res.status(500).send({ message: err.message || "Update failed." });
  }
});

// --- PORTFOLIO ROUTES ---

app.post("/api/portfolio", authenticate, async (req, res) => {
  try {
    const { name, tickers, weights } = req.body;
    const userId = req.user._id;
    const portfolio = await Portfoliomodel.create({ userId, name, tickers, weights });
    console.log("✅ Portfolio created for user:", userId);
    res.status(201).json(portfolio);
  } catch (err) {
    console.error("❌ Portfolio creation error:", err);
    res.status(500).send("Error creating portfolio");
  }
});

app.get("/api/portfolio", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const portfolio = await Portfoliomodel.findOne({ userId });
    if (!portfolio) {
      console.log("⚠️ No portfolio found for user:", userId);
      return res.status(404).send("Portfolio not found");
    }
    console.log("✅ Portfolio found for user:", userId);
    res.json(portfolio);
  } catch (err) {
    console.error("❌ Portfolio fetch error:", err);
    res.status(500).send("Error fetching portfolio");
  }
});

// --- PREDICTIONS ROUTES (NEW - Mock Data) ---

// --- ML API PROXY ROUTES (ADD THESE) ---

// --- ML ROUTES (Direct Python execution) ---

// --- ML ROUTES (Direct Python execution using real data) ---

app.post("/api/predictions-ml", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const portfolio = await Portfoliomodel.findOne({ userId });

    // Pull tickers from the user’s portfolio if available
    const tickers = portfolio ? portfolio.tickers : ['AAPL', 'GOOGL', 'MSFT'];

    // Run Python script for real stock predictions
    let options = {
      mode: 'text',
      pythonPath: 'python',
      scriptPath: './', // run from root, where real_predictions.py is present
      args: [JSON.stringify({ tickers: tickers })]
    };

    console.log("📊 Fetching live stock data for:", tickers);

    PythonShell.run('real_predictions.py', options, function (err, results) {
      if (err) {
        console.error("Python error:", err);
        return res.json({
          success: true,
          fallback: true,
          message: "⚠️ Fallback to mock predictions.",
          predictions: [
            { ticker: 'AAPL', currentPrice: 178.50, predictedPrice: 185.20, confidence: 0.87 },
            { ticker: 'GOOGL', currentPrice: 142.30, predictedPrice: 138.90, confidence: 0.72 },
            { ticker: 'MSFT', currentPrice: 378.90, predictedPrice: 385.40, confidence: 0.81 }
          ]
        });
      }

      console.log("✅ Real ML predictions from Python:", results);

      if (!results || !results.length) {
        return res.status(500).json({
          success: false,
          error: "No output received from ML script."
        });
      }

      const parsed = typeof results[0] === "string"
        ? JSON.parse(results[0])
        : results[0];

      res.json({ success: true, predictions: parsed });
    });
  } catch (err) {
    console.error("❌ ML API execution error:", err);
    res.status(500).json({ error: "Prediction failed - internal server error." });
  }
});


app.get("/api/explainable-ai-ml", authenticate, (req, res) => {
  // For now, return the mock data since SHAP is complex
  res.json({
    modelExplanation: {
      features: [
        { name: "Price Trend", importance: 0.35, value: "positive" },
        { name: "Volume", importance: 0.25, value: "high" },
        { name: "Market Sentiment", importance: 0.20, value: "bullish" },
        { name: "Technical Indicators", importance: 0.15, value: "positive" },
        { name: "News Sentiment", importance: 0.05, value: "neutral" }
      ],
      prediction: "BUY",
      confidence: 0.82
    },
    lastUpdated: new Date().toISOString()
  });
});

app.get("/api/nlp-analysis-ml", authenticate, (req, res) => {
  // For now, return the mock data
  res.json({
    sentiment: {
      overall: "positive",
      score: 0.68,
      positive: 45,
      neutral: 30,
      negative: 25
    },
    keywords: ["growth", "revenue", "innovation", "market", "technology"],
    summary: "Overall market sentiment is positive with strong indicators for technology sector growth.",
    lastUpdated: new Date().toISOString()
  });
});

app.get("/api/stress-testing-ml", authenticate, (req, res) => {
  // For now, return the mock data
  res.json({
    scenarios: [
      {
        name: "Market Crash (-30%)",
        portfolioLoss: -25000,
        percentageLoss: -28.5,
        probability: "Low"
      },
      {
        name: "Moderate Decline (-15%)",
        portfolioLoss: -12500,
        percentageLoss: -14.2,
        probability: "Medium"
      },
      {
        name: "Bull Market (+20%)",
        portfolioGain: 17500,
        percentageGain: 19.8,
        probability: "Medium"
      }
    ],
    riskMetrics: {
      valueAtRisk: 15000,
      maxDrawdown: 18.5,
      sharpeRatio: 1.45
    },
    lastUpdated: new Date().toISOString()
  });
});


// --- SETTINGS ROUTES (NEW - Mock Data) ---

app.get("/api/settings", authenticate, async (req, res) => {
  console.log("✅ Settings endpoint called");
  try {
    const user = await Usermodel.findById(req.user._id).select("-password");
    res.json({
      user: {
        name: user.name,
        email: user.email
      },
      preferences: {
        notifications: true,
        darkMode: false,
        language: "en"
      }
    });
  } catch (err) {
    console.error("❌ Settings fetch error:", err);
    res.status(500).send({ message: "Error fetching settings" });
  }
});

app.put("/api/settings", authenticate, async (req, res) => {
  console.log("✅ Settings update endpoint called");
  const { preferences } = req.body;
  // For now, just return success since we don't have a preferences model
  res.json({
    message: "Settings updated successfully",
    preferences: preferences
  });
});

// --- ML PLAYGROUND ROUTE ---

app.post("/api/run-ml", authenticate, async (req, res) => {
  try {
    console.log("🎯 ML Playground initiated...");

    // Use the user's portfolio tickers
    const userId = req.user._id;
    const portfolio = await Portfoliomodel.findOne({ userId });
    const tickers = portfolio ? portfolio.tickers : ["AAPL"];
    console.log("📊 Running ML for tickers:", tickers);

    let options = {
      mode: "text",
      pythonPath: "python",
      scriptPath: "./",
      args: [JSON.stringify({ tickers: tickers })],
    };

    PythonShell.run("real_predictions.py", options, function (err, results) {
      if (err) {
        console.error("❌ ML Execution Error:", err);
        return res.status(500).json({
          success: false,
          error: "Python script failed",
        });
      }

      console.log("✅ Python Output Received");
      res.json({
        success: true,
        logs: results,
      });
    });
  } catch (err) {
    console.error("❌ ML Playground error:", err);
    res.status(500).json({ error: "Internal Server Error running ML" });
  }
});


// ========================================
// STATIC FILES & FALLBACK (MUST BE LAST)
// ========================================

const frontendPath = path.join(__dirname, "dist");

app.use(express.static(frontendPath));

app.get(/.*/, (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
app.listen(3000, () => {
  console.log("=".repeat(50));
  console.log("🚀 Server running on http://localhost:3000");
  console.log("=".repeat(50));
  console.log("Available API endpoints:");
  console.log("  POST /api/signup");
  console.log("  POST /api/login");
  console.log("  GET  /api/dashboard (protected)");
  console.log("  GET  /api/profile (protected)");
  console.log("  PUT  /api/profile (protected)");
  console.log("  POST /api/portfolio (protected)");
  console.log("  GET  /api/portfolio (protected)");
  console.log("  GET  /api/predictions (protected) - NEW");
  console.log("  GET  /api/nlp-analysis (protected) - NEW");
  console.log("  GET  /api/explainable-ai (protected) - NEW");
  console.log("  GET  /api/stress-testing (protected) - NEW");
  console.log("  GET  /api/settings (protected) - NEW");
  console.log("  PUT  /api/settings (protected) - NEW");
  console.log("=".repeat(50));
});


app.get("/api/users",(_req,res)=>{
  return res.json({status:"pending"});
})

app.post("/api/users",(_req,res)=>{
  return res.json({status:"pending"});
})

app.patch("/api/users",(_req,res)=>{
  return res.json({status:"pending"});
})