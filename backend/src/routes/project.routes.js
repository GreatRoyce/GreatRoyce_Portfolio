const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

// Public
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin only
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
