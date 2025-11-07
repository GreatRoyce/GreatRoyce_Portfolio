const express = require("express");
const router = express.Router();
const upload = require("../multer/multer");
const protect = require("../middleware/authMiddleware");

const {
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

// All routes in this file are protected and prefixed with /api/v1/admin/data

// Project management routes
router.post(
  "/projects",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createProject
);

router.put(
  "/projects/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateProject
);
router.delete("/projects/:id", protect, deleteProject);

module.exports = router;
