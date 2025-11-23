import React, { useRef, useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../pages/ParentPage";

const projects = [
  { id: 1, title: "E-commerce Platform", images: ["https://picsum.photos/800/600?random=12"], link: "#" },
  { id: 2, title: "Portfolio Showcase", images: ["https://picsum.photos/800/600?random=21"], link: "#" },
  { id: 3, title: "Task Management App", images: ["https://picsum.photos/800/600?random=3"], link: "#" },
  { id: 4, title: "Social Media App", images: ["https://picsum.photos/800/600?random=4"], link: "#" },
  { id: 5, title: "Weather Dashboard", images: ["https://picsum.photos/800/600?random=5"], link: "#" },
  { id: 6, title: "Fitness Tracker", images: ["https://picsum.photos/800/600?random=6"], link: "#" },
];

function Projects() {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeImages, setActiveImages] = useState({});
  const scrollRefs = useRef({});
  const intervalRefs = useRef({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        duration: 0.8
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
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
      y: -8,
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3
      }
    }
  };

  const counterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
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

  const startAutoScroll = (id, images) => {
    if (images.length <= 1) return;
    
    // Clear any existing interval first
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
    }
    
    intervalRefs.current[id] = setInterval(() => {
      const container = scrollRefs.current[id];
      if (container) {
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const currentScroll = container.scrollLeft;
        const maxScroll = scrollWidth - clientWidth;
        
        // Check if we've reached the end (with a small buffer)
        if (currentScroll >= maxScroll - 10) {
          // Scroll back to start
          container.scrollTo({ left: 0, behavior: "smooth" });
          setActiveImages(prev => ({ ...prev, [id]: 1 }));
        } else {
          // Scroll to next image
          const nextScroll = currentScroll + clientWidth;
          container.scrollTo({ left: nextScroll, behavior: "smooth" });
          const newActive = Math.floor(nextScroll / clientWidth) + 1;
          setActiveImages(prev => ({ ...prev, [id]: newActive }));
        }
      }
    }, 4000);
  };

  const stopAutoScroll = (id) => {
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      intervalRefs.current[id] = null;
    }
  };

  const handleScroll = (id, images) => {
    const container = scrollRefs.current[id];
    if (container) {
      const scrollLeft = container.scrollLeft;
      const clientWidth = container.clientWidth;
      const current = Math.floor(scrollLeft / clientWidth) + 1;
      setActiveImages(prev => ({ ...prev, [id]: current }));
    }
  };

  // Initialize active images
  useEffect(() => {
    const initialActive = {};
    projects.forEach(project => {
      initialActive[project.id] = 1;
    });
    setActiveImages(initialActive);
  }, []);

  // Start auto-scroll on mount
  useEffect(() => {
    projects.forEach((project) => {
      if (project.images.length > 1) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          startAutoScroll(project.id, project.images);
        }, 100);
      }
    });

    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  return (
    <section id="projects" className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} py-16`}>
      
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
            className={`relative rounded-xl overflow-hidden shadow-lg group cursor-pointer ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            onMouseEnter={() => stopAutoScroll(project.id)}
            onMouseLeave={() => {
              if (project.images.length > 1) {
                startAutoScroll(project.id, project.images);
              }
            }}
          >
            {/* FULL IMAGE AREA - Improved scrolling container */}
            <div className="relative w-full h-80 overflow-hidden">
              <motion.div
                ref={(el) => (scrollRefs.current[project.id] = el)}
                className="flex h-full w-full overflow-x-hidden snap-x snap-mandatory"
                onScroll={() => handleScroll(project.id, project.images)}
                style={{
                  scrollbarWidth: 'none', // Firefox
                  msOverflowStyle: 'none', // IE/Edge
                }}
              >
                {/* Hide scrollbar for Webkit browsers */}
                <style jsx>{`
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                {project.images.map((img, index) => (
                  <div 
                    key={index} 
                    className="w-full h-full flex-shrink-0 snap-start relative hide-scrollbar"
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
                    />
                  </div>
                ))}
              </motion.div>

              {/* BEAUTIFUL TITLE OVERLAY - Bottom Center */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center p-6 pointer-events-none"
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
              >
                <h3 className="text-white font-bold text-xl text-center drop-shadow-lg">
                  {project.title}
                </h3>
              </motion.div>

              {/* Clickable overlay */}
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-20"
                aria-label={`View ${project.title} project`}
              />

              {/* Enhanced Counter (if multiple images) */}
              {project.images.length > 1 && (
                <motion.div
                  className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm z-30 pointer-events-none"
                  variants={counterVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover="hover"
                >
                  {activeImages[project.id] || 1} / {project.images.length}
                </motion.div>
              )}

              {/* Scroll Hint - Only show on hover for multi-image projects */}
              {project.images.length > 1 && (
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Projects;