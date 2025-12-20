import axios from "axios";

// Determine backend base URL depending on environment
const BASE_URL = (() => {
  if (import.meta.env.MODE === "development") {
    return import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3000/api/v1";
  }
  // Production (Vercel frontend + Render backend)
  return import.meta.env.VITE_API_URL || "https://greatroyce-portfolio.onrender.com/api/v1";
})();

// Log the base URL for debugging
console.log("⚡ Axios Base URL:", BASE_URL);

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
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

// Optional: log responses for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("⚠️ Axios error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
