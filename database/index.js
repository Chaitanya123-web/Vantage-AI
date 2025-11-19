const mongoose = require("mongoose");

const connectDB = async () => {
  const connect = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/vantage", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
      });
      console.log("MongoDB connected successfully");
    } catch (err) {
      console.error("MongoDB connection failed:", err.message);
      console.log("Retrying in 5 seconds...");
      setTimeout(connect, 5000);
    }
  };

  connect();
};

module.exports = connectDB;