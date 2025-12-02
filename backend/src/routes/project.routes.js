const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

// ===============================
// 📌 PUBLIC ROUTES
// ===============================

// ===============================
// 🔐 ADMIN ROUTES (Create, Update, Delete)
// ===============================

// Create new project
router.post("/", createProject);

// Update a project
router.put("/:id", updateProject);

// Delete a project
router.delete("/:id", deleteProject);


module.exports = router;
