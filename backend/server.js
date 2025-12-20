const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./database/dbConnection");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// =======================
// Routes
// =======================
const projectRoutes = require("./src/routes/project.routes");
const contactRoutes = require("./src/routes/contact.routes");
const adminRoutes = require("./src/routes/admin.routes");
const adminDataRoutes = require("./src/routes/adminData.routes");
const mailRoutes = require("./src/routes/mail.routes");

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
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL ||
      "https://greatroyce-portfolio.vercel.app/" // ✅ Vercel URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(morgan("dev"));

// =======================
// Static Files
// =======================
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// Database Connection
// =======================
connectDB();

// =======================
// Root Route (FIXES Cannot GET /)
// =======================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "🚀 Backend API is running",
    docs: "/api-docs",
  });
});

// =======================
// Health Check
// =======================
app.get("/api/v1", (req, res) => {
  res.status(200).send("✅ API is live and ready!");
});

// =======================
// Swagger Setup (SAFE FOR RENDER)
// =======================
try {
  const swaggerDocument = YAML.load(
    path.join(__dirname, "apidoc/apidoc.yaml")
  );
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.warn("⚠️ Swagger not loaded:", error.message);
}

// =======================
// Routes
// =======================
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin/data", adminDataRoutes);
app.use("/api/v1/mail", mailRoutes);

// =======================
// Error Handling Middleware
// =======================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

// =======================
// Start Server (Render SAFE)
// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
