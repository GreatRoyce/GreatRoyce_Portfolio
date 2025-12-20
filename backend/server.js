const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./database/dbConnection");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// =======================
// Load Env Variables
// =======================
dotenv.config();

// =======================
// Initialize Express
// =======================
const app = express();
app.set("etag", false);

// =======================
// Allowed Origins (CORS)
// =======================
const allowedOrigins = [
  "http://localhost:5173",
  "https://greatroyce-portfolio.vercel.app",
];

// =======================
// Middlewares
// =======================
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, Postman, curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("❌ Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔑 REQUIRED for preflight requests
app.options("*", cors());

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
// Root Route
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
// Swagger Setup (Render-safe)
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
app.use("/api/v1/projects", require("./src/routes/project.routes"));
app.use("/api/v1/contacts", require("./src/routes/contact.routes"));
app.use("/api/v1/admin", require("./src/routes/admin.routes"));
app.use("/api/v1/admin/data", require("./src/routes/adminData.routes"));
app.use("/api/v1/mail", require("./src/routes/mail.routes"));

// =======================
// Error Handling Middleware
// =======================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =======================
// Start Server (Render-safe)
// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
