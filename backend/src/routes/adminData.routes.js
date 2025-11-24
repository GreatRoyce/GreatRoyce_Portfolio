// src/routes/adminData.routes.js
const express = require("express");
const router = express.Router();
const upload = require("../multer/multer");
const protect = require("../middleware/authMiddleware");

const {
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const { getContacts } = require("../controllers/contact.controller");

// -------------------
// Upload fields for projects
// -------------------
const projectUploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

// -------------------
// Project Routes (Protected)
// -------------------
router.post("/projects", protect, projectUploadFields, createProject);
router.put("/projects/:id", protect, projectUploadFields, updateProject);
router.delete("/projects/:id", protect, deleteProject);

// -------------------
// Contact Routes (Protected)
// -------------------
router.get("/contacts", protect, getContacts);

module.exports = router;
