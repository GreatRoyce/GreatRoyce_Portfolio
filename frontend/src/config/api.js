// config/api.js
export const API_ENDPOINTS = {
  projects: "http://localhost:3000/api/v1/projects", // Replace with your actual API endpoint
  // Or use relative path if same domain:
  // projects: "/api/projects"
};

// For development with mock data
export const MOCK_PROJECTS = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured online store with payment integration",
    images: ["https://picsum.photos/800/600?random=12"],
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/username/project",
    createdAt: "2024-01-15"
  },
  // Add more projects...
];