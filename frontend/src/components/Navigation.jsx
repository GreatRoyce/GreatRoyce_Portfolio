import React, { useState, useEffect, useContext, useCallback } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../pages/ParentPage";
import { MdDarkMode, MdLightbulbOutline } from "react-icons/md";
import logo from "../assets/grlogo.png";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const navItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <>
      {/* Fixed Navigation */}
      <motion.nav
        className={`px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between font-semibold transition-all duration-300 ${
          isScrolled
            ? isDarkMode
              ? "bg-gray-800/95 backdrop-blur-lg shadow-lg border-b border-gray-700"
              : "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200"
            : isDarkMode
            ? "bg-gray-900 border-b border-gray-800"
            : "bg-gray-50 border-b border-gray-300"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="GreatRoyce Logo"
            className="w-16 h-12 sm:w-20 sm:h-14 object-contain"
          />
          <div
            className={`hidden sm:block text-base font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
      
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`font-semibold transition-all duration-200 px-3 py-2 rounded-lg text-sm lg:text-base ${
                isDarkMode
                  ? "text-gray-300 hover:text-[#57aee8] hover:bg-gray-700/50"
                  : "text-gray-700 hover:text-[#57aee8] hover:bg-gray-200/50"
              }`}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-200 ml-2 hover:scale-110 ${
              isDarkMode
                ? "bg-gray-700 text-[#cc4e00] hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <MdDarkMode size={18} />
            ) : (
              <MdLightbulbOutline size={18} />
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {/* Theme Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isDarkMode
                ? "bg-gray-700 text-[#cc4e00] hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <MdDarkMode size={18} />
            ) : (
              <MdLightbulbOutline size={18} />
            )}
          </button>

          {/* Hamburger Icon */}
          <button 
            onClick={toggleMenu}
            aria-label="Open menu"
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode
                ? "text-gray-300 hover:text-[#57aee8] hover:bg-gray-700/50"
                : "text-gray-700 hover:text-[#57aee8] hover:bg-gray-200/50"
            }`}
          >
            <GiHamburgerMenu className="text-xl sm:text-2xl" />
          </button>
        </div>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`fixed top-0 right-0 h-full w-80 max-w-full z-50 p-6 backdrop-blur-xl shadow-2xl border-l ${
              isDarkMode
                ? "bg-gray-800/95 border-gray-700"
                : "bg-white/95 border-gray-200"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-[#57aee8] hover:bg-gray-700/50"
                  : "text-gray-600 hover:text-[#57aee8] hover:bg-gray-200/50"
              }`}
              aria-label="Close menu"
            >
              <span className="text-2xl">×</span>
            </button>

            {/* Menu Header */}
            <div className=" mb-26">
              <div className="flex items-center gap-3">
                {/* <img
                  src={logo}
                  alt="GreatRoyce Logo"
                  className="w-10 h-10 object-contain"
                /> */}
                <div
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
              
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              {navLinks.map((item, index) => (
                <motion.button
                  key={item.id}
                  custom={index}
                  variants={navItemVariants}
                  initial="closed"
                  animate="open"
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-4 px-4 rounded-xl text-base font-semibold transition-all duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-[#57aee8] hover:bg-gray-700/50"
                      : "text-gray-800 hover:text-[#57aee8] hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            {/* Theme Toggle inside Menu */}
            <motion.div 
              className="mt-8 pt-6 border-t border-gray-300/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={toggleTheme}
                className={`w-full py-2 px-4  font-semibold transition-all duration-200 flex items-center justify-center gap-3 hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-700 text-[#cc4e00] hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {isDarkMode ? (
                  <>
                    <MdDarkMode size={20} />
                    <span className="font-light">Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <MdLightbulbOutline size={20} />
                    <span className="font-light">Switch to Dark Mode</span>
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;