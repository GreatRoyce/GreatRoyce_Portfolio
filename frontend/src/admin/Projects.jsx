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

  // Reusable form handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/projects");
      setProjects(data);
      setError("");
    } catch (err) {
      console.error("Error fetching projects:", err);
      const message = err.response?.data?.message || "Failed to load projects.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Create project
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) formData.append("image", image);
      if (video) formData.append("video", video);

      await api.post("/admin/data/projects", formData);

      // Reset form
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
      setError("");
    } catch (err) {
      console.error("Error creating project:", err);
      const message =
        err.response?.data?.message || "Failed to create project.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      setLoading(true);
      await api.delete(`/admin/data/projects/${id}`);
      fetchProjects();
      setError("");
    } catch (err) {
      console.error("Error deleting project:", err);
      const message =
        err.response?.data?.message || "Failed to delete project.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4">Projects Management</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {loading && <p className="text-blue-500 mb-3">Processing...</p>}

        <section className="mb-6 border p-4 rounded bg-white shadow">
          <h3 className="text-xl font-semibold mb-3">Create New Project</h3>

          <form onSubmit={handleCreate}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
              required
            />

            <input
              type="text"
              name="technologies"
              placeholder="Technologies (comma-separated)"
              value={form.technologies}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
            />

            <input
              type="text"
              name="githubLink"
              placeholder="GitHub Link"
              value={form.githubLink}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
            />

            <input
              type="text"
              name="liveDemo"
              placeholder="Live Demo Link"
              value={form.liveDemo}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
            />

            <input
              type="date"
              name="dateCompleted"
              value={form.dateCompleted}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
            />

            {/* File Inputs */}
            <label className="font-semibold">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-2"
            />
            {image && <p className="text-sm mb-2">Selected: {image.name}</p>}

            <label className="font-semibold">Video:</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="mb-2"
            />
            {video && <p className="text-sm mb-2">Selected: {video.name}</p>}

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Create Project
            </button>
          </form>
        </section>

        {/* Projects List */}
        <section>
          <h3 className="text-xl font-semibold mb-2">
            All Projects ({projects.length})
          </h3>

          <ul className="bg-white shadow rounded p-4">
            {projects.map((p) => (
              <li
                key={p.id}
                className="border-b py-3 flex justify-between items-center"
              >
                <div>
                  <strong>{p.title}</strong> — {p.category}
                </div>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Projects;
