// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./database/dbConnection");

// =======================
// 📁 Routes
// =======================
const projectRoutes = require("./src/routes/project.routes");
const contactRoutes = require("./src/routes/contact.routes");
const adminRoutes = require("./src/routes/admin.routes"); // login only
const adminDataRoutes = require("./src/routes/adminData.routes"); // protected admin routes (uploads, projects)
const mailRoutes = require("./src/routes/mail.routes");
// const sendMail = require("./src/utils/mailer");

// =======================
// Env Variables
// =======================
dotenv.config();

// =======================
// Initialize Express
// =======================
const app = express();

// =======================
// Middlewares
// =======================
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ your React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // allow sending cookies/auth headers
  })
);
app.use(morgan("dev"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded files

// =======================
// Database Connection
// =======================
connectDB();

// =======================
// Test Mail Route (Optional)
// =======================
// app.get("/test-mail", async (req, res) => {
//   try {
//     const result = await sendMail(
//       "Royce",
//       "royce@example.com",
//       "Test Email",
//       "This is a test message from my Node.js app."
//     );
//     res.send("✅ Email sent successfully!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("❌ Failed to send email.");
//   }
// });

// =======================
// Routes
// =======================

// Health check
app.get("/api/v1", (req, res) => {
  res.send("✅ API is live and ready!");
});

// Public routes
app.use("/api/v1/projects", projectRoutes); // GET /api/v1/projects and /api/v1/projects/:id
app.use("/api/v1/contacts", contactRoutes); // POST /api/v1/contacts is public

// Admin login
app.use("/api/v1/admin", adminRoutes);

// Protected admin routes (projects, uploads, contacts)
app.use("/api/v1/admin/data", adminDataRoutes);

app.use("/api/v1/mail", mailRoutes);

// =======================
// Error Handling Middleware
// =======================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
