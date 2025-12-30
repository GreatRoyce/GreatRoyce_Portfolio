const Project = require("../models/project.model");

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
      // Multer + CloudinaryStorage already uploaded the file
      if (req.file.mimetype.startsWith("video")) video = req.file.path;
      else image = req.file.path;
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

    res
      .status(201)
      .json({
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
    res.status(200).json(projects);
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
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json(project);
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
      if (req.file.mimetype.startsWith("video")) updates.video = req.file.path;
      else updates.image = req.file.path;
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

/* ===========================
   🗑️ DELETE PROJECT
=========================== */
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
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
