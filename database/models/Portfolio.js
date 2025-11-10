const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  tickers: [{ 
    type: String, 
    required: true 
  }],
  weights: { 
    type: Map, 
    of: Number 
  }, 
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);