import axios from "axios";

// Determine backend base URL
const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3001/api/v1"
    : import.meta.env.VITE_API_URL || "https://greatroyce-portfolio.onrender.com/api/v1";

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

export default api;
