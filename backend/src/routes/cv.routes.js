// src/routes/cv.routes.js
const express = require("express");
const router = express.Router();
const upload = require("../multer/multer");
const protect = require("../middleware/authMiddleware");
const { uploadCV, deleteCV, getCV } = require("../controllers/cv.controller");

// Admin protected routes
router.post("/upload", protect, upload.single("cv"), uploadCV);
router.delete("/delete", protect, deleteCV);

// Public download route
router.get("/download", getCV);

module.exports = router;
