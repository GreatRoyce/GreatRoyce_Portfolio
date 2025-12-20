// src/config/api.js

// Automatically select API base URL depending on environment
const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3000/api/v1"
    : import.meta.env.VITE_API_URL || "https://greatroyce-portfolio.onrender.com/api/v1";

export const API_ENDPOINTS = {
  projects: `${BASE_URL}/projects`,
  contacts: `${BASE_URL}/contacts`,
  admin: `${BASE_URL}/admin`,
  adminData: `${BASE_URL}/admin/data`,
  mail: `${BASE_URL}/mail`,
};

// For development / mock data
export const MOCK_PROJECTS = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured online store with payment integration",
    images: ["https://picsum.photos/800/600?random=12"],
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/username/project",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Personal portfolio to showcase projects and skills",
    images: ["https://picsum.photos/800/600?random=34"],
    technologies: ["React", "Tailwind CSS", "Vite"],
    demoUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/username/portfolio",
    createdAt: "2024-02-20",
  },
  // Add more mock projects as needed...
];
