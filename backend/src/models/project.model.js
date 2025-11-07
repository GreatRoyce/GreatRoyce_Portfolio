// src/models/project.model.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
      type: String, 
      default: "Full-stack" // e.g. "Frontend", "Full-stack", "UI/UX"
    },
    image: { type: String }, // URL or file path
    video: { type: String }, // optional video file path
    technologies: [{ type: String }], // e.g. ["React", "Node.js"]
    githubLink: { type: String },
    liveDemo: { type: String },
    dateCompleted: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
