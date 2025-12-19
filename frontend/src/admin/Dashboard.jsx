// src/admin/Dashboard.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">Welcome, GreatRoyce!</h2>
          <p className="text-gray-700">
           
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
