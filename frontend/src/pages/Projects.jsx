import React, { useRef, useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../pages/ParentPage";

function Projects() {
  const { isDarkMode } = useContext(ThemeContext);
  const [projects, setProjects] = useState([]);
  const [activeImages, setActiveImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  const scrollRefs = useRef({});
  const intervalRefs = useRef({});
  const navigate = useNavigate();

  /* --------------------------------
      Animations
  ---------------------------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      y: -8,
      transition: { duration: 0.2 }
    },
  };

  /* --------------------------------
      Auto Scroll Logic
  ---------------------------------- */
  const startAutoScroll = (id, images) => {
    if (!images || images.length <= 1) return;

    clearInterval(intervalRefs.current[id]);

    intervalRefs.current[id] = setInterval(() => {
      const container = scrollRefs.current[id];
      if (!container) return;

      const width = container.clientWidth;
      const maxScroll = container.scrollWidth - width;
      const next = container.scrollLeft + width;

      container.scrollTo({
        left: next > maxScroll ? 0 : next,
        behavior: "smooth",
      });

      setActiveImages((prev) => ({
        ...prev,
        [id]: next > maxScroll ? 1 : Math.floor(next / width) + 1,
      }));
    }, 5000);
  };

  const stopAutoScroll = (id) => {
    clearInterval(intervalRefs.current[id]);
    intervalRefs.current[id] = null;
  };

  const scrollToImage = (id, direction) => {
    const container = scrollRefs.current[id];
    if (!container) return;

    const width = container.clientWidth;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - width;
    
    const newScroll = direction === 'next' 
      ? Math.min(currentScroll + width, maxScroll)
      : Math.max(currentScroll - width, 0);

    container.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });

    setActiveImages((prev) => ({
      ...prev,
      [id]: Math.floor(newScroll / width) + 1,
    }));
  };

  /* --------------------------------
      Fetch Projects
  ---------------------------------- */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/v1/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();

        const normalized = data.map((p) => ({
          id: p.id || p._id,
          title: p.title,
          description: p.description,
          category: p.category,
          technologies: Array.isArray(p.technologies)
            ? p.technologies
            : p.technologies?.split(",") || [],
          images: p.images?.map((img) =>
            img.startsWith("http") ? img : `http://localhost:3000${img}`
          ),
          video: p.video ? `http://localhost:3000${p.video}` : null,
          demoUrl: p.demoUrl || p.liveDemo,
          githubUrl: p.githubUrl || p.githubLink,
        }));

        setProjects(normalized);

        const counters = {};
        normalized.forEach((p) => (counters[p.id] = 1));
        setActiveImages(counters);

        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load projects.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    return () => Object.values(intervalRefs.current).forEach(clearInterval);
  }, []);

  /* --------------------------------
      Start Auto Scroll
  ---------------------------------- */
  useEffect(() => {
    projects.forEach((p) => {
      if (p.images.length > 1) startAutoScroll(p.id, p.images);
    });
  }, [projects]);

  /* --------------------------------
      Loading / Empty States
  ---------------------------------- */
  if (loading) {
    return (
      <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="h-10 w-10 border-4 border-transparent border-b-blue-300 border-l-blue-300 rounded-full animate-spin mx-auto absolute top-3 left-3"></div>
          </div>
          <p className={`mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (!loading && projects.length === 0) {
    return (
      <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen flex items-center justify-center`}>
        <div className="text-center px-6">
          <div className="text-6xl mb-6">📂</div>
          <h2 className={`text-2xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>No projects yet</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects will appear here once uploaded</p>
        </div>
      </section>
    );
  }

  /* --------------------------------
      MAIN UI
  ---------------------------------- */
  return (
    <section
      id="projects"
      className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} py-24`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Featured Projects
          </h2>
          <p className={`max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            A collection of my recent work and creative solutions
          </p>
        </motion.div>

        {error && (
          <div className="max-w-2xl mx-auto mb-12 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover="hover"
              className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gray-800 hover:bg-gray-750" 
                  : "bg-white hover:bg-gray-50"
              } ${hoveredCard === project.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
              onMouseEnter={() => {
                setHoveredCard(project.id);
                stopAutoScroll(project.id);
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
                startAutoScroll(project.id, project.images);
              }}
            >
              {/* IMAGE / VIDEO AREA */}
              <div 
                className="relative h-64 overflow-hidden bg-gray-100 cursor-pointer"
                onClick={() => project.demoUrl && navigate(project.demoUrl)}
              >
                {project.video ? (
                  <div className="relative h-full">
                    <video
                      src={project.video}
                      controls
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                ) : (
                  <div className="relative h-full">
                    <div
                      ref={(el) => (scrollRefs.current[project.id] = el)}
                      className="flex h-full overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar"
                    >
                      {project.images.map((img, i) => (
                        <div key={i} className="relative w-full h-full flex-shrink-0 snap-start">
                          <img
                            src={img}
                            alt={`${project.title} - ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                      ))}
                    </div>

                    {/* Image Navigation */}
                    {project.images?.length > 1 && (
                      <>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {project.images.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                scrollToImage(project.id, i + 1 < activeImages[project.id] ? 'prev' : 'next');
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                activeImages[project.id] === i + 1
                                  ? 'bg-white w-6'
                                  : 'bg-white/50 hover:bg-white/80'
                              }`}
                            />
                          ))}
                        </div>
                        
                        <div className="absolute top-4 right-4">
                          <span className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                            {activeImages[project.id]}/{project.images.length}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 
                    className="font-bold text-xl mb-1 cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => project.demoUrl && navigate(project.demoUrl)}
                  >
                    {project.title}
                  </h3>
                  {project.category && (
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {project.category}
                    </span>
                  )}
                </div>

                <p className={`text-sm mb-4 line-clamp-2 min-h-[3rem] ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className={`text-xs px-3 py-1.5 rounded-lg ${
                        isDarkMode
                          ? 'bg-blue-900/30 text-blue-300'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className={`text-xs px-3 py-1.5 rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, "_blank");
                        }}
                        className={`flex items-center gap-2 text-sm transition-colors ${
                          isDarkMode
                            ? 'text-gray-400 hover:text-white'
                            : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        <span>GitHub</span>
                        <span>→</span>
                      </button>
                    )}
                  </div>
                  
                  {project.demoUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.demoUrl, "_blank");
                      }}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Visit Live
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;