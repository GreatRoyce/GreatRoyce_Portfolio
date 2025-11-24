// src/admin/CVUpload.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function CVUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const response = await fetch("/api/cv/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      setMessage("CV uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload CV. Try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Upload CV</h2>
          <form onSubmit={handleUpload} className="flex flex-col gap-4 max-w-md">
            <input type="file" onChange={handleFileChange} />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Upload
            </button>
          </form>
          {message && <p className="mt-4 text-gray-700">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default CVUpload;
