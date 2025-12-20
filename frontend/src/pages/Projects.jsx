import React, { useRef, useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../pages/ParentPage";
import axios from "axios";

function Projects() {
  const { isDarkMode } = useContext(ThemeContext);
  const [projects, setProjects] = useState([]);
  const [activeImages, setActiveImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const scrollRefs = useRef({});
  const intervalRefs = useRef({});
  const descriptionRefs = useRef({});
  const navigate = useNavigate();

  // Determine backend URL based on environment
  const API_BASE = import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_API_URL;

  /* -----------------------------
       Brand Colors
  -------------------------------*/
  const brandColors = {
    primary: "#cc4e00",
    light: "#ff6f2a",
    dark: "#a33c00",
    muted: "#ff8f4d",
    subtle: "#ffb385",
    deep: "#8c2d00",
  };

  /* -----------------------------
       Animations
  -------------------------------*/
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { staggerChildren: 0.1, delayChildren: 0.2, opacity: 1 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    hover: { y: -8, transition: { duration: 0.2 } },
  };

  /* -----------------------------
       Fetch Projects
  -------------------------------*/
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/projects`);
        const data = res.data; // Expect array of projects

        const normalized = data.map((p) => ({
          id: p.id || p._id,
          title: p.title,
          description: p.description || "",
          category: p.category,
          technologies: Array.isArray(p.technologies)
            ? p.technologies
            : p.technologies?.split(",") || [],
          images: p.images?.map((img) =>
            img.startsWith("http") ? img : `${API_BASE.replace("/api/v1", "")}${img}`
          ),
          video: p.video ? `${API_BASE.replace("/api/v1", "")}${p.video}` : null,
          demoUrl: p.demoUrl || p.liveDemo,
          githubUrl: p.githubUrl || p.githubLink,
        }));

        setProjects(normalized);

        const counters = {};
        const expansions = {};
        normalized.forEach((p) => {
          counters[p.id] = 1;
          expansions[p.id] = false;
        });
        setActiveImages(counters);
        setExpandedDescriptions(expansions);

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
  }, [API_BASE]);

  /* -----------------------------
       Auto Scroll
  -------------------------------*/
  const startAutoScroll = (id, images) => {
    if (!images || images.length <= 1) return;

    clearInterval(intervalRefs.current[id]);
    intervalRefs.current[id] = setInterval(() => {
      const container = scrollRefs.current[id];
      if (!container) return;
      const width = container.clientWidth;
      const maxScroll = container.scrollWidth - width;
      const next = container.scrollLeft + width;

      container.scrollTo({ left: next > maxScroll ? 0 : next, behavior: "smooth" });
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

    const newScroll = direction === "next" ? Math.min(currentScroll + width, maxScroll) : Math.max(currentScroll - width, 0);
    container.scrollTo({ left: newScroll, behavior: "smooth" });

    setActiveImages((prev) => ({ ...prev, [id]: Math.floor(newScroll / width) + 1 }));
  };

  /* -----------------------------
       Text Helpers
  -------------------------------*/
  const toggleDescription = (projectId) =>
    setExpandedDescriptions((prev) => ({ ...prev, [projectId]: !prev[projectId] }));

  const checkIfTextOverflows = (desc) => desc && desc.length > 100;

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > maxLength * 0.7 ? truncated.substr(0, lastSpace) + "..." : truncated + "...";
  };

  /* -----------------------------
       Start Auto Scroll for all projects
  -------------------------------*/
  useEffect(() => {
    projects.forEach((p) => {
      if (p.images && p.images.length > 1) startAutoScroll(p.id, p.images);
    });
  }, [projects]);

  /* -----------------------------
       Loading / Empty States
  -------------------------------*/
  if (loading)
    return (
      <section className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 border-4 border-transparent border-t-[#cc4e00] border-r-[#cc4e00] rounded-full animate-spin mx-auto"></div>
            <div className="h-10 w-10 border-4 border-transparent border-b-[#ff8f4d] border-l-[#ff8f4d] rounded-full animate-spin mx-auto absolute top-3 left-3"></div>
          </div>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mt-6`}>Loading projects...</p>
        </div>
      </section>
    );

  if (!loading && projects.length === 0)
    return (
      <section className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} min-h-screen flex items-center justify-center`}>
        <div className="text-center px-6">
          <div className="text-6xl mb-6" style={{ color: brandColors.primary }}>
            📂
          </div>
          <h2 className={`text-2xl font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}>No projects yet</h2>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Projects will appear here once uploaded</p>
        </div>
      </section>
    );

  /* -----------------------------
       MAIN UI
  -------------------------------*/
  return (
    <section id="projects" className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} py-24`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Featured Projects</h2>
          <p className={`max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>A collection of my recent work and creative solutions</p>
        </motion.div>

        {error && (
          <div className="max-w-2xl mx-auto mb-12 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Project Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          {projects.map((project) => {
            const needsExpansion = checkIfTextOverflows(project.description);
            const isExpanded = expandedDescriptions[project.id];

            return (
              <motion.div key={project.id} variants={itemVariants} whileHover="hover"
                className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${isDarkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"}`}
                onMouseEnter={() => stopAutoScroll(project.id)}
                onMouseLeave={() => project.images?.length > 1 && startAutoScroll(project.id, project.images)}
              >
                {/* IMAGE AREA */}
                <div className="relative h-64 overflow-hidden bg-gray-100 cursor-pointer group" onClick={() => project.demoUrl && navigate(project.demoUrl)}>
                  {project.video ? (
                    <video src={project.video} controls className="w-full h-full object-cover" />
                  ) : (
                    <div ref={(el) => (scrollRefs.current[project.id] = el)} className="flex h-full overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar">
                      {project.images?.map((img, i) => (
                        <img key={i} src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full flex-shrink-0 snap-start object-cover" />
                      ))}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-sm mb-2">{isExpanded ? project.description : truncateText(project.description)}</p>
                  {needsExpansion && (
                    <button className="text-xs text-[#cc4e00]" onClick={() => toggleDescription(project.id)}>
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
