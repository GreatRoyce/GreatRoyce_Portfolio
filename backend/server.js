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
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(morgan("dev"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// Database Connection
// =======================
connectDB();

// =======================
// Swagger Setup
// =======================
const swaggerDocument = YAML.load(path.join(__dirname, "/apidoc/apidoc.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// =======================
// Routes
// =======================

// Health check
app.get("/api/v1", (req, res) => {
  res.send("✅ API is live and ready!");
});

// Public routes
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/contacts", contactRoutes);

// Admin login
app.use("/api/v1/admin", adminRoutes);

// Protected admin routes
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
  console.log(`📖 Swagger docs available at: http://localhost:${PORT}/api-docs`);
});
