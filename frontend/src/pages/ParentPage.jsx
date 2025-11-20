import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "./HeroSection";
import About from "./About";
import Services from "./Services";
import Projects from "./Projects";
import Contact from "./Contact";
import { motion } from "framer-motion";
import Footer from "./Footer";

// More sophisticated animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 100
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -100
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8
};

const sectionVariants = {
  offscreen: {
    y: 100,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Create a context for theme
export const ThemeContext = React.createContext();

function ParentPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else if (systemPrefersDark) {
      setIsDarkMode(true);
    }
  }, []);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`parent  min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'dark bg-gray-900 text-white' 
          : 'bg-white text-gray-900'
      }`}>
        <Navigation />
        
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {/* Hero Section - Immediate entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <HeroSection />
          </motion.div>

          {/* About Section - Spring effect */}
          <motion.section
            variants={sectionVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <About />
          </motion.section>

          {/* Services Section - Staggered reveal */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Services />
          </motion.section>

          {/* Projects Section - Slide up with bounce */}
          <motion.section
            variants={sectionVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0 }}
          >
            <Projects />
          </motion.section>

          {/* Contact Section - Fade in with slight delay */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Contact />
          </motion.section>

          {/* Footer - Simple fade in */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <Footer />
          </motion.section>
        </motion.div>

        {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#57aee8] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </motion.button>
      </div>
    </ThemeContext.Provider>
  );
}

export default ParentPage;