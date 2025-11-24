// src/controllers/project.controller.js
const Project = require("../models/project.model");

// 📥 Create Project
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      technologies,
      githubLink,
      liveDemo,
      dateCompleted,
    } = req.body;

    const image = req.files?.image
      ? `/uploads/${req.files.image[0].filename}`
      : null;
    const video = req.files?.video
      ? `/uploads/${req.files.video[0].filename}`
      : null;

    const newProject = new Project({
      title,
      description,
      category,
      image,
      video,
      technologies: technologies
        ? technologies.split(",").map((t) => t.trim())
        : [],
      githubLink,
      liveDemo,
      dateCompleted,
    });

    const savedProject = await newProject.save();
    res
      .status(201)
      .json({
        message: "✅ Project created successfully",
        project: savedProject,
      });
  } catch (err) {
    console.error("❌ Error creating project:", err);
    res.status(500).json({ error: "Server Error while creating project" });
  }
};

// ✏️ Update Project
const updateProject = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.files?.image)
      updates.image = `/uploads/${req.files.image[0].filename}`;
    if (req.files?.video)
      updates.video = `/uploads/${req.files.video[0].filename}`;
    if (updates.technologies)
      updates.technologies = updates.technologies
        .split(",")
        .map((t) => t.trim());

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedProject)
      return res.status(404).json({ error: "Project not found" });

    res
      .status(200)
      .json({
        message: "✅ Project updated successfully",
        project: updatedProject,
      });
  } catch (err) {
    console.error("❌ Error updating project:", err);
    res.status(500).json({ error: "Server Error while updating project" });
  }
};

// 🗑️ Delete Project
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ message: "🗑️ Project deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting project:", err);
    res.status(500).json({ error: "Server Error while deleting project" });
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
};
