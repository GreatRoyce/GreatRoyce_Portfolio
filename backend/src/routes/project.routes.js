const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const upload = require("../middleware/upload");

// Create a project (image/video)
router.post("/projects", upload.single("media"), projectController.createProject);

// Get all projects
router.get("/projects", projectController.getProjects);

// Get single project
router.get("/projects/:id", projectController.getProjectById);

// Update project
router.put("/projects/:id", upload.single("media"), projectController.updateProject);

// Delete project
router.delete("/projects/:id", projectController.deleteProject);

module.exports = router;
