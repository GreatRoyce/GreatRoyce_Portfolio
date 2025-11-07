const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProjectById,
} = require("../controllers/project.controller");

// Public routes to get projects
router.get("/", getProjects);
router.get("/:id", getProjectById);

module.exports = router;
