// src/admin/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const linkClass = ({ isActive }) =>
    isActive
      ? `block py-2 px-4 rounded mb-2 font-semibold ${
          isDarkMode ? "bg-gray-700 text-gray-100" : "bg-blue-200 text-gray-900"
        }`
      : `block py-2 px-4 rounded mb-2 hover:scale-105 transform transition-all duration-200 ${
          isDarkMode ? "hover:bg-gray-600 text-gray-200" : "hover:bg-blue-100 text-gray-900"
        }`;

  return (
    <aside
      className={`w-64 p-4 h-screen flex flex-col justify-between transition-colors duration-500 ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div>
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/projects" className={linkClass}>
          Projects
        </NavLink>
        <NavLink to="/admin/contacts" className={linkClass}>
          Contacts
        </NavLink>
        <NavLink to="/admin/cv-upload" className={linkClass}>
          Upload CV
        </NavLink>
      </div>

      {/* Dark/Light Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`mt-4 py-2 px-4 rounded w-full font-semibold transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-600 text-gray-100 hover:bg-gray-500"
            : "bg-blue-100 text-gray-900 hover:bg-blue-200"
        }`}
      >
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </aside>
  );
}

export default Sidebar;
