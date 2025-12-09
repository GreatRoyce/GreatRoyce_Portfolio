import React, { useRef, useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../pages/ParentPage";

// Mock project as fallback
const mockProject = {
  id: 1,
  title: "E-commerce Platform",
  description: "A full-featured online store with payment integration",
  images: ["https://picsum.photos/800/600?random=12"],
  technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  demoUrl: "https://example.com/demo",
  githubUrl: "https://github.com/username/project",
  createdAt: "2024-01-15",
};

function Projects() {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeImages, setActiveImages] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRefs = useRef({});
  const intervalRefs = useRef({});
  const navigate = useNavigate();

  /* --------------------------------
     ⚡ Animations
  ---------------------------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -5,
      transition: { duration: 0.3 },
    },
  };

  const counterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  /* --------------------------------
      ⚡ Auto Scroll Slideshow
  ---------------------------------- */
  const startAutoScroll = (id, images) => {
    if (!images || images.length <= 1) return;

    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
    }

    intervalRefs.current[id] = setInterval(() => {
      const container = scrollRefs.current[id];
      if (!container) return;

      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const currentScroll = container.scrollLeft;
      const maxScroll = scrollWidth - clientWidth;

      if (currentScroll >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        setActiveImages((prev) => ({ ...prev, [id]: 1 }));
      } else {
        const nextScroll = currentScroll + clientWidth;
        container.scrollTo({ left: nextScroll, behavior: "smooth" });
        const newActive = Math.floor(nextScroll / clientWidth) + 1;
        setActiveImages((prev) => ({ ...prev, [id]: newActive }));
      }
    }, 4000);
  };

  const stopAutoScroll = (id) => {
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      intervalRefs.current[id] = null;
    }
  };

  const handleScroll = (id) => {
    const container = scrollRefs.current[id];
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const current = Math.floor(scrollLeft / clientWidth) + 1;

    setActiveImages((prev) => ({ ...prev, [id]: current }));
  };

  /* --------------------------------
      ⚡ Fetch Projects from API
  ---------------------------------- */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:3000/api/v1/projects");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          const initialActive = {};
          data.forEach((p) => (initialActive[p.id] = 1));
          setActiveImages(initialActive);
        } else {
          setProjects([mockProject]);
          setActiveImages({ [mockProject.id]: 1 });
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Using sample data.");
        setProjects([mockProject]);
        setActiveImages({ [mockProject.id]: 1 });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* --------------------------------
      ⚡ Start Auto Scroll After Load
  ---------------------------------- */
  useEffect(() => {
    if (projects.length > 0) {
      projects.forEach((project) => {
        if (project.images && project.images.length > 1) {
          setTimeout(() => startAutoScroll(project.id, project.images), 150);
        }
      });

      return () => {
        Object.values(intervalRefs.current).forEach((interval) => {
          if (interval) clearInterval(interval);
        });
      };
    }
  }, [projects]);

  /* --------------------------------
      ⚡ Handle Project Card Click
  ---------------------------------- */
  const handleProjectClick = (e, projectId, externalUrl) => {
    // If external link is clicked, let it open in new tab
    if (externalUrl) {
      e.stopPropagation();
      window.open(externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
    
    // Otherwise navigate to project detail page
    navigate(`/projects/${projectId}`);
  };

  /* --------------------------------
      ⚡ Handle Demo Link Click
  ---------------------------------- */
  const handleDemoClick = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* --------------------------------
      ⚡ Loading Screen
  ---------------------------------- */
  if (loading) {
    return (
      <section
        id="projects"
        className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} py-16`}
      >
        <motion.h4
          className={`text-center text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h4>

        <div className="text-center mt-12">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto ${
              isDarkMode ? "border-white" : "border-gray-800"
            }`}
          ></div>
          <p className={`mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Loading projects...
          </p>
        </div>
      </section>
    );
  }

  /* --------------------------------
      ⚡ MAIN UI
  ---------------------------------- */
  return (
    <section
      id="projects"
      className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} py-16`}
    >
      <motion.h4
        className={`text-center text-3xl font-bold ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h4>

      {error && (
        <motion.div
          className="max-w-7xl w-11/12 mx-auto mt-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center">{error}</p>
        </motion.div>
      )}

      <motion.div
        className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-11/12 mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover="hover"
            className={`relative rounded-xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-750"
                : "bg-white hover:bg-gray-50"
            }`}
            onMouseEnter={() => stopAutoScroll(project.id)}
            onMouseLeave={() =>
              project.images?.length > 1 &&
              startAutoScroll(project.id, project.images)
            }
            onClick={(e) => handleProjectClick(e, project.id)}
          >
            {/* IMAGE AREA */}
            <div className="relative w-full h-80 overflow-hidden">
              <div
                ref={(el) => (scrollRefs.current[project.id] = el)}
                className="flex h-full w-full overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
                onScroll={() => handleScroll(project.id)}
              >
                {(project.images || []).map((img, index) => (
                  <div
                    key={index}
                    className="min-w-full h-full flex-shrink-0 snap-start"
                  >
                    <motion.img
                      src={img}
                      alt={project.title}
                      className="w-full h-full object-cover select-none"
                      variants={imageVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover="hover"
                      draggable="false"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/800/600?random=${project.id}`;
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* TITLE OVERLAY */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center p-6 pointer-events-none"
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-white font-bold text-xl text-center drop-shadow-lg">
                  {project.title}
                </h3>
              </motion.div>

              {/* DEMO LINK BUTTON - Only shows on hover */}
              {project.demoUrl && (
                <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => handleDemoClick(e, project.demoUrl)}
                    className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg text-sm font-medium hover:bg-white transition-colors shadow-lg"
                  >
                    Live Demo →
                  </button>
                </div>
              )}

              {/* Image Counter */}
              {project.images?.length > 1 && (
                <motion.div
                  className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm z-30 pointer-events-none"
                  variants={counterVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {activeImages[project.id] || 1}/{project.images.length}
                </motion.div>
              )}

              {/* Scroll Hint */}
              {project.images?.length > 1 && (
                <motion.div
                  className="absolute top-3 left-3 bg-black/80 text-white px-2 py-1 rounded text-xs backdrop-blur-sm z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ← Scroll →
                </motion.div>
              )}
            </div>

            {/* PROJECT DETAILS */}
            <div className="p-6">
              <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {project.description || "No description available."}
              </p>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index} 
                      className={`px-3 py-1 text-xs rounded-full ${
                        isDarkMode 
                          ? "bg-gray-700 text-gray-300" 
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      isDarkMode 
                        ? "bg-gray-700 text-gray-300" 
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Project Links */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/projects/${project.id}`);
                  }}
                  className={`text-sm font-medium ${
                    isDarkMode 
                      ? "text-blue-400 hover:text-blue-300" 
                      : "text-blue-600 hover:text-blue-800"
                  } transition-colors`}
                >
                  View Details →
                </button>
                
                {project.githubUrl && (
                  <button
                    onClick={(e) => handleProjectClick(e, project.id, project.githubUrl)}
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Projects;