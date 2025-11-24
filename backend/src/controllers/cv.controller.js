// src/controllers/cv.controller.js
const path = require("path");
const fs = require("fs");

// Upload CV (protected)
const uploadCV = (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Optionally, rename CV to fixed name "resume.pdf"
    const oldPath = req.file.path;
    const ext = path.extname(req.file.originalname);
    const newPath = path.join(req.file.destination, `resume${ext}`);

    // Replace old CV if exists
    if (fs.existsSync(newPath)) fs.unlinkSync(newPath);

    fs.renameSync(oldPath, newPath);

    res.status(201).json({ message: "✅ CV uploaded successfully", cv: `/uploads/resume${ext}` });
  } catch (err) {
    console.error("❌ Error uploading CV:", err);
    res.status(500).json({ error: "Server Error while uploading CV" });
  }
};

// Delete CV (protected)
const deleteCV = (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, "../../uploads");
    const files = fs.readdirSync(uploadsDir);
    const cvFile = files.find((f) => f.toLowerCase().includes("resume") || f.toLowerCase().includes("cv"));
    if (!cvFile) return res.status(404).json({ error: "CV not found" });

    fs.unlinkSync(path.join(uploadsDir, cvFile));
    res.status(200).json({ message: "🗑️ CV deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting CV:", err);
    res.status(500).json({ error: "Server Error while deleting CV" });
  }
};

// Get CV (public)
const getCV = (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, "../../uploads");
    const files = fs.readdirSync(uploadsDir);
    const cvFile = files.find((f) => f.toLowerCase().includes("resume") || f.toLowerCase().includes("cv"));
    if (!cvFile) return res.status(404).json({ error: "CV not found" });

    res.download(path.join(uploadsDir, cvFile), cvFile);
  } catch (err) {
    console.error("❌ Error fetching CV:", err);
    res.status(500).json({ error: "Server Error while fetching CV" });
  }
};

module.exports = {
  uploadCV,
  deleteCV,
  getCV,
};
