import React, { useState, useEffect, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../pages/ParentPage";
import { MdDarkMode, MdLightbulbOutline } from "react-icons/md";

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navLinks = ["Home", "About", "Services", "Projects", "Contact"];

  return (
    <>
      {/* Fixed Navigation */}
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 font-semibold transition-all duration-300 ${
          isScrolled
            ? isDarkMode
              ? "bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-700"
              : "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200"
            : isDarkMode
            ? "bg-gray-900"
            : "bg-white"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <div
            className={`brandLogo rounded-full p-2 border ${
              isDarkMode ? "border-white" : "border-black"
            } bg-[#57aee8] text-white font-bold w-8 h-8 flex items-center justify-center text-sm`}
          >
            gR
          </div>
          <div
            className={`brandName hidden sm:block text-base ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            greatRoyce
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`font-semibold transition-colors duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-[#57aee8]"
                  : "text-gray-800 hover:text-[#57aee8]"
              }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-200 ml-4 ${
              isDarkMode
                ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
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
        <div className="md:hidden flex items-center gap-4">
          {/* Theme Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isDarkMode
                ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
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
          <button onClick={toggleMenu} aria-label="Open menu">
            <GiHamburgerMenu
              className={`text-2xl font-semibold cursor-pointer transition-colors duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-[#57aee8]"
                  : "text-gray-800 hover:text-[#57aee8]"
              }`}
            />
          </button>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide-out Menu - Visible on all screens when opened */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full w-64 sm:w-80 z-50 p-6 backdrop-blur-xl shadow-2xl border-l ${
              isDarkMode
                ? "bg-gray-800/95 border-gray-700"
                : "bg-white/95 border-gray-200"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className={`absolute top-4 right-4 text-2xl p-1 transition-colors duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-[#57aee8]"
                  : "text-gray-600 hover:text-[#57aee8]"
              }`}
            >
              ×
            </button>

            {/* Menu Header */}
            <div className="mt-16 mb-8">
              <div className="flex items-center gap-3">
                <div
                  className={`brandLogo rounded-full p-2 border ${
                    isDarkMode ? "border-white" : "border-black"
                  } bg-[#57aee8] text-white font-bold w-10 h-10 flex items-center justify-center`}
                >
                  gR
                </div>
                <div
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  greatRoyce
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              {navLinks.map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 8 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left py-3 px-4 rounded-lg text-base font-semibold transition-all duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-[#57aee8] hover:bg-gray-700/50"
                      : "text-gray-800 hover:text-[#57aee8] hover:bg-gray-100"
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Theme Toggle inside Menu */}
            <div className="mt-8 pt-6 border-t border-gray-300/50">
              <button
                onClick={toggleTheme}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-3 ${
                  isDarkMode
                    ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {isDarkMode ? (
                  <>
                    <MdDarkMode size={20} />
                    <span>Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <MdLightbulbOutline size={20} />
                    <span>Switch to Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
