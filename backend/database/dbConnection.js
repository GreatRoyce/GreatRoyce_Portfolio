require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.DBSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to DB!");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
