import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import HeroSection from "./HeroSection";
import About from "./About";
import Services from "./Services";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 100 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -100 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8,
};

const sectionVariants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export const ThemeContext = React.createContext();

function ParentPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved or system theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (saved) setIsDarkMode(saved === "dark");
    else if (systemDark) setIsDarkMode(true);
  }, []);

  // Update theme globally
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode ? "dark bg-gray-900 text-gray-200" : "bg-white text-gray-900"
        }`}
      >
        <Navigation />

        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {/* HERO SECTION */}
          <motion.div
            className="w-full px-4 sm:px-6 lg:px-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <HeroSection />
          </motion.div>

          <div className="sticky-container mt-10 sm:mt-16">

            {/* ABOUT */}
            <div className="section-spacer">
              <motion.section
                className="card z-20 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12"
                variants={sectionVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
              >
                <About />
              </motion.section>
            </div>

            {/* SERVICES */}
            <div className="section-spacer">
              <motion.section
                className="card z-30 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Services />
              </motion.section>
            </div>

            {/* PROJECTS */}
            <div className="section-spacer">
              <motion.section
                className="cardtwo z-40 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12"
                variants={sectionVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Projects />
              </motion.section>
            </div>

            {/* CONTACT */}
            <div className="section-spacer">
              <motion.section
                className="cardtwo z-50 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Contact />
              </motion.section>
            </div>
          </div>

          {/* FOOTER */}
          <motion.section
            className="footer mt-10 px-4 sm:px-6 lg:px-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <Footer />
          </motion.section>
        </motion.div>
      </div>
    </ThemeContext.Provider>
  );
}

export default ParentPage;
