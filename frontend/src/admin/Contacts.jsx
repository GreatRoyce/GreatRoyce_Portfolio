// src/admin/Contacts.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import api from "./utils/api"; // import Axios instance

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data } = await api.get("/contacts");
      setContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  return (
    <div className="flex">
      <div className="w-64"><Sidebar /></div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Contacts</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Message</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id}>
                <td className="border px-2 py-1">{c.name}</td>
                <td className="border px-2 py-1">{c.email}</td>
                <td className="border px-2 py-1">{c.message}</td>
                <td className="border px-2 py-1">{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Contacts;
