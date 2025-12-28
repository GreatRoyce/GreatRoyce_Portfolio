const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../multer/upload");

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
router.post("/", protect, upload.single("image"), createProject);
router.put("/:id", protect, upload.single("image"), updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
