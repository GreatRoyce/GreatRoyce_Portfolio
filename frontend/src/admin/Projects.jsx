// src/admin/Projects.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import api from "./utils/api"; // Axios instance with JWT

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    technologies: "",
    githubLink: "",
    liveDemo: "",
    dateCompleted: "",
  });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch projects (public route)
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/projects");
      setProjects(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
      setLoading(false);
    }
  };

  // Create new project
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("technologies", form.technologies); // comma-separated string
      formData.append("githubLink", form.githubLink);
      formData.append("liveDemo", form.liveDemo);
      formData.append("dateCompleted", form.dateCompleted);

      if (image) formData.append("image", image);
      if (video) formData.append("video", video);

      await api.post("/admin/data/projects", formData);
      setForm({
        title: "",
        description: "",
        category: "",
        technologies: "",
        githubLink: "",
        liveDemo: "",
        dateCompleted: "",
      });
      setImage(null);
      setVideo(null);
      fetchProjects();
      setLoading(false);
    } catch (err) {
      console.error("Error creating project:", err);
      setError("Failed to create project");
      setLoading(false);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      setLoading(true);
      await api.delete(`/admin/data/projects/${id}`);
      fetchProjects();
      setLoading(false);
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project");
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="w-64"><Sidebar /></div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {loading && <p className="text-blue-500 mb-2">Loading...</p>}

        {/* Create Project Form */}
        <form onSubmit={handleCreate} className="mb-6 border p-4 rounded">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Technologies (comma-separated)"
            value={form.technologies}
            onChange={(e) => setForm({ ...form, technologies: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={form.githubLink}
            onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="text"
            placeholder="Live Demo Link"
            value={form.liveDemo}
            onChange={(e) => setForm({ ...form, liveDemo: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="date"
            placeholder="Date Completed"
            value={form.dateCompleted}
            onChange={(e) => setForm({ ...form, dateCompleted: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-2" />
          {image && <p className="text-sm mb-2">Selected image: {image.name}</p>}

          <input type="file" onChange={(e) => setVideo(e.target.files[0])} className="mb-2" />
          {video && <p className="text-sm mb-2">Selected video: {video.name}</p>}

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Project
          </button>
        </form>

        {/* Projects List */}
        <ul>
          {projects.map((p) => (
            <li key={p._id} className="border-b py-2 flex justify-between items-center">
              <div>
                <strong>{p.title}</strong> | {p.category}
              </div>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Projects;
