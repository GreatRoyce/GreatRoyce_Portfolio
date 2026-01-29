const Project = require("../models/project.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

/* ===========================
   📥 CREATE PROJECT
=========================== */
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

    let image = null;
    let video = null;

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "auto",
        });
        if (req.file.mimetype.startsWith("video")) {
          video = result.secure_url;
        } else {
          image = result.secure_url;
        }
      } finally {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }
    }

    const newProject = await Project.create({
      title,
      description,
      category,
      image,
      video,
      technologies: technologies
        ? technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      githubLink,
      liveDemo,
      dateCompleted,
    });

    res.status(201).json({
      message: "✅ Project created successfully",
      project: newProject,
    });
  } catch (err) {
    console.error("❌ Error creating project:", err);
    res.status(500).json({ error: "Server Error while creating project" });
  }
};

/* ===========================
   📤 GET ALL PROJECTS
=========================== */
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    const formattedProjects = projects.map((p) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      category: p.category,
      images: p.image ? [p.image] : [],
      video: p.video,
      technologies: p.technologies,
      githubUrl: p.githubLink,
      demoUrl: p.liveDemo,
      dateCompleted: p.dateCompleted,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    res.status(200).json(formattedProjects);
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).json({ error: "Server Error while fetching projects" });
  }
};

/* ===========================
   📤 GET SINGLE PROJECT
=========================== */
const getProjectById = async (req, res) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Project not found" });

    res.status(200).json({
      id: p._id,
      title: p.title,
      description: p.description,
      category: p.category,
      images: p.image ? [p.image] : [],
      video: p.video,
      technologies: p.technologies,
      githubUrl: p.githubLink,
      demoUrl: p.liveDemo,
      dateCompleted: p.dateCompleted,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    });
  } catch (err) {
    console.error("❌ Error fetching project:", err);
    res.status(500).json({ error: "Server Error while fetching project" });
  }
};

/* ===========================
   ✏️ UPDATE PROJECT
=========================== */
const updateProject = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "auto",
        });
        if (req.file.mimetype.startsWith("video")) {
          updates.video = result.secure_url;
        } else {
          updates.image = result.secure_url;
        }
      } finally {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }
    }

    if (updates.technologies) {
      updates.technologies = updates.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "✅ Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    console.error("❌ Error updating project:", err);
    res.status(500).json({ error: "Server Error while updating project" });
  }
};

/* ===========================
   🗑️ DELETE PROJECT
=========================== */
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "🗑️ Project deleted successfully",
    });
  } catch (err) {
    console.error("❌ Error deleting project:", err);
    res.status(500).json({ error: "Server Error while deleting project" });
  }
};

/* ===========================
   EXPORTS
=========================== */
module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
