import React, { useRef, useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../pages/ParentPage";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    desc: "A full-featured online store with a modern UI and secure payment gateway.",
    link: "#",
    images: ["https://picsum.photos/600/400?random=12"],
  },
  {
    id: 2,
    title: "Portfolio Showcase",
    desc: "A personal portfolio to showcase skills and completed projects.",
    link: "#",
    images: ["https://picsum.photos/600/400?random=21"],
  },
  {
    id: 3,
    title: "Task Management App",
    desc: "A tool to help users organize tasks and improve productivity.",
    link: "#",
    images: ["https://picsum.photos/600/400?random=3"],
  },
  {
    id: 4,
    title: "Social Media App",
    desc: "A platform for connecting people and sharing content.",
    link: "#",
    images: ["https://picsum.photos/600/400?random=4"],
  },
  {
    id: 5,
    title: "Weather Dashboard",
    desc: "Real-time weather information with beautiful visuals.",
    link: "#",
    images: ["https://picsum.photos/600/400?random=5"],
  },
  {
    id: 6,
    title: "Fitness Tracker",
    desc: "Track your workouts and monitor fitness progress.",
    link: "#",
    images: ["https://picsum.photos/600/400?random=6"],
  },
];

function Projects() {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeImages, setActiveImages] = useState({});
  const scrollRefs = useRef({});
  const intervalRefs = useRef({});

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const counterVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    }
  };

  const startAutoScroll = (projectId, images) => {
    if (images.length <= 1) return;

    intervalRefs.current[projectId] = setInterval(() => {
      const container = scrollRefs.current[projectId];
      if (container) {
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const currentScroll = container.scrollLeft;

        if (currentScroll + clientWidth >= scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: clientWidth, behavior: "smooth" });
        }
      }
    }, 4000);
  };

  const stopAutoScroll = (projectId) => {
    if (intervalRefs.current[projectId]) {
      clearInterval(intervalRefs.current[projectId]);
    }
  };

  const handleScroll = (projectId, images) => {
    const container = scrollRefs.current[projectId];
    if (container) {
      const scrollLeft = container.scrollLeft;
      const imageWidth = container.scrollWidth / images.length;
      const currentImage = Math.round(scrollLeft / imageWidth) + 1;
      setActiveImages((prev) => ({ ...prev, [projectId]: currentImage }));
    }
  };

  useEffect(() => {
    // Start auto-scroll for all projects with multiple images
    projects.forEach((project) => {
      if (project.images.length > 1) {
        startAutoScroll(project.id, project.images);
      }
    });

    return () => {
      // Cleanup intervals on unmount
      Object.values(intervalRefs.current).forEach((interval) =>
        clearInterval(interval)
      );
    };
  }, []);

  return (
    <section 
      id="projects"
      className={`shade my-16 py-8 shadow-2xl transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="py-16 sm:py-16 sm:px-4">
        <motion.h4
          className={`text-center mx-auto mb-12 text-3xl font-bold transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Projects
        </motion.h4>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-11/12 mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover="hover"
              className={`shaded project rounded-xl shadow-lg overflow-hidden group border transition-all duration-300 hover:shadow-xl ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 hover:border-[#57aee8]"
                  : "bg-white border-gray-200 hover:border-[#57aee8]"
              }`}
              onMouseEnter={() => stopAutoScroll(project.id)}
              onMouseLeave={() => startAutoScroll(project.id, project.images)}
            >
              {/* Scrollable Image Gallery */}
              <div className="relative overflow-hidden">
                <motion.div
                  ref={(el) => (scrollRefs.current[project.id] = el)}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-64 cursor-grab active:cursor-grabbing"
                  onScroll={() => handleScroll(project.id, project.images)}
                  whileHover="hover"
                >
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full snap-start"
                    >
                      <motion.img
                        src={image}
                        alt={`${project.title} - Screenshot ${index + 1}`}
                        className="w-full h-64 object-cover"
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Enhanced Image Counter */}
                {project.images.length > 1 && (
                  <motion.div
                    className={`absolute bottom-3 right-3 text-sm px-3 py-1 rounded-full transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-900/80 text-white"
                        : "bg-black/70 text-white"
                    }`}
                    variants={counterVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover="hover"
                  >
                    {activeImages[project.id] || 1} / {project.images.length}
                  </motion.div>
                )}

                {/* Scroll Hint */}
                {project.images.length > 1 && (
                  <motion.div
                    className={`absolute top-3 right-3 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                      isDarkMode
                        ? "bg-[#57aee8] text-white"
                        : "bg-[#57aee8] text-white"
                    }`}
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Scroll →
                  </motion.div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <motion.h6
                  className={`text-md font-bold mb-3 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                  variants={titleVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {project.title}
                </motion.h6>
                <motion.p
                  className={`mb-4 text-sm h-5/6 leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {project.desc}
                </motion.p>
                <div className="flex gap-3">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`shaded px-4 mx-auto py-2 font-medium rounded-full transition-all duration-300 border ${
                      isDarkMode
                        ? "bg-[#57aee8] text-white border-[#57aee8] hover:bg-[#4a9cd6] hover:border-[#4a9cd6]"
                        : "bg-[#57aee8] text-white border-[#57aee8] hover:bg-[#4a9cd6] hover:border-[#4a9cd6]"
                    }`}
                    variants={buttonVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    View Project
                  </motion.a>
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