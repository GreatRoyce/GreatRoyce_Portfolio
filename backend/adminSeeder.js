// backend/src/seeder/adminSeeder.js
const mongoose = require("mongoose");
const Admin = require("./src/models/Admin.model");
const dotenv = require("dotenv");
const connectDB = require("../backend/database/dbConnection");

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to DB
    await connectDB();
    console.log("🌍 Database connected");

    // Read admin credentials from .env
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("❌ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
      process.exit(1);
    }

    // Check if admiN exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    // Create new admin
    const admin = new Admin({
      email: adminEmail,
      password: adminPassword, // hashed automatically
    });

    await admin.save();

    console.log("✅ Admin seeded successfully!");
    console.log("📧 Email:", admin.email);
    console.log("🔑 Password:", adminPassword); // show plain password
    process.exit();
  } catch (err) {
    console.error("❌ Admin seeding error:", err);
    process.exit(1);
  }
};

seedAdmin();
