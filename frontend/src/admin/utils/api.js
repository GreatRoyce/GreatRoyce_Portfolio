// src/admin/utils/api.js
import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true, // allow sending credentials (cookies/auth headers)
});

// Automatically attach JWT from localStorage for protected routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
