import React, { useState, useEffect, useContext } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../pages/ParentPage';
import { MdDarkMode,  MdLightbulbOutline } from "react-icons/md";



function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Navigation */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 font-semibold transition-all duration-300 ${
          isScrolled 
            ? isDarkMode
              ? 'bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-700'
              : 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200'
            : isDarkMode
              ? 'bg-gray-900 '
              : 'bg-white '
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={`brandLogo rounded-full p-2 border ${
          isDarkMode ? 'border-white' : 'border-black'
        } bg-[#57aee8b9] text-white font-bold`}>
          gR
        </div>
        <div className={`brandName text-[10px] sm:text-sm ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          greatRoyce
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Toggle in Navigation */}
          <button 
            onClick={toggleTheme}
            className={`hidden p-2 rounded-full transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <MdDarkMode /> : <MdLightbulbOutline />}
          </button>
          
          <div 
            className='flex items-center gap-2 cursor-pointer hover:text-[#57aee8] transition-colors duration-200'
            onClick={toggleMenu}
          >
            <GiHamburgerMenu className='text-2xl font-semibold' />
            <p className='hidden sm:block'>MENU</p>
          </div>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className='h-[10vh]'></div>

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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full w-64 z-50 p-6 backdrop-blur-xl shadow-2xl border-l ${
              isDarkMode 
                ? 'bg-gray-800/95 border-gray-700' 
                : 'bg-white/95 border-gray-200'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className={`absolute top-4 right-4 text-2xl transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300 hover:text-[#57aee8]' : 'text-gray-600 hover:text-[#57aee8]'
              }`}
            >
              ×
            </button>

            {/* Menu Items */}
            <div className="mt-16 space-y-6">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 10 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left text-lg font-semibold transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300 hover:text-[#57aee8]' : 'text-gray-800 hover:text-[#57aee8]'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Theme Toggle in Mobile Menu */}
            <div className="mt-8 pt-6 border-t border-gray-300/50">
              <button
                onClick={toggleTheme}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isDarkMode ? (
                  <>
                    <span><MdDarkMode/></span>
                    
                  </>
                ) : (
                  <>
                    <span><MdLightbulbOutline/></span>
                  
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation