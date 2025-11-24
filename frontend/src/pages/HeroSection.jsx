import React, { useState, useEffect, useContext, useCallback } from "react";
import Buttons from "../components/Button";
import { motion, AnimatePresence } from "framer-motion";
import heroBackground from "../assets/me.jpg";
import secondHeroBg from "../assets/royce.jpg";
import { ThemeContext } from "../pages/ParentPage";

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);
  const images = [heroBackground, secondHeroBg];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Scroll to contact section
  const handleHireClick = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offsetTop = contactSection.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  }, []);

  // Download CV dynamically from backend
  const handleDownloadCvClick = useCallback(async () => {
    try {
      const response = await fetch("/api/cv/download-cv");
      if (!response.ok) throw new Error("Failed to download CV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "GreatRoyce_CV.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download CV. Please try again.");
    }
  }, []);

  // Manual image navigation
  const goToImage = useCallback(index => setCurrentImageIndex(index), []);

  // Animation variants
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
  const wordVariants = { hidden: { opacity: 0, y: 45, rotate: -7 }, show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } } };
  const buttonVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  // Hero text split into lines
  const heroText = "Expert MERN Developer for Modern Innovations";
  const words = heroText.split(" ");
  const line1 = words.slice(0, 2);
  const line2 = words.slice(2, 4);
  const line3 = words.slice(4);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center justify-center pt-16">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeInOut" } }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: "easeInOut" } }}
          />
        </AnimatePresence>
      </div>

      {/* Theme overlay */}
      <motion.div
        className={`absolute inset-0 z-0 mix-blend-multiply ${isDarkMode ? "bg-gray-900/70" : "bg-[#57aee8]/60"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Gradient overlay */}
      <motion.div
        className={`absolute inset-0 z-0 bg-gradient-to-br ${isDarkMode ? "from-gray-900/80 via-gray-900/40 to-transparent" : "from-black/40 via-black/20 to-transparent"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center min-h-[80vh] lg:min-h-[90vh] py-8 lg:py-16">
          <div className="w-full lg:w-3/5 xl:w-1/2">
            {/* Hero Text */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="text-center lg:text-left mb-8 lg:mb-12">
              <div className="mb-2 lg:mb-3">
                {line1.map((word, i) => (
                  <motion.span key={i} className={`inline-block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mr-2 sm:mr-3 ${isDarkMode ? "text-gray-100 drop-shadow-2xl" : "text-white drop-shadow-2xl"}`} variants={wordVariants} style={{ transform: 'rotate(-2deg)', transformOrigin: 'left center' }}>{word}</motion.span>
                ))}
              </div>
              <div className="mb-2 lg:mb-3">
                {line2.map((word, i) => (
                  <motion.span key={i} className={`inline-block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mr-2 sm:mr-3 ${isDarkMode ? "text-gray-100 drop-shadow-2xl" : "text-white drop-shadow-2xl"}`} variants={wordVariants} style={{ transform: 'rotate(-1deg)', transformOrigin: 'left center' }}>{word}</motion.span>
                ))}
              </div>
              <div>
                {line3.map((word, i) => (
                  <motion.span key={i} className={`inline-block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mr-2 sm:mr-3 ${isDarkMode ? "text-gray-100 drop-shadow-2xl" : "text-white drop-shadow-2xl"}`} variants={wordVariants} style={{ transform: 'rotate(-0.5deg)', transformOrigin: 'left center' }}>{word}</motion.span>
                ))}
              </div>
            </motion.div>

            {/* Supporting Text */}
            <motion.p className={`text-center lg:text-left text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 max-w-2xl mx-auto lg:mx-0 ${isDarkMode ? "text-gray-300" : "text-gray-100"} leading-relaxed drop-shadow-lg`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
              Crafting scalable digital solutions with modern technologies. Let's build something amazing together.
            </motion.p>

            {/* Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 lg:mb-16" variants={containerVariants} initial="hidden" animate="show">
              <motion.div variants={buttonVariants}>
                <Buttons variant="primary" className={`w-full sm:w-auto min-w-[140px] text-center ${isDarkMode ? "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 hover:border-gray-500" : "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:border-white/50"} hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl font-semibold`} size="large" onClick={handleHireClick}>
                  Hire Me
                </Buttons>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <Buttons variant="outline" className={`w-full sm:w-auto min-w-[140px] text-center ${isDarkMode ? "border-2 border-gray-400 text-gray-200 hover:bg-gray-400 hover:text-gray-800 backdrop-blur-sm" : "border-2 border-white text-white hover:bg-white hover:text-[#57aee8] backdrop-blur-sm"} hover:scale-105 transform transition-all duration-300 font-semibold`} size="large" onClick={handleDownloadCvClick}>
                  Download CV
                </Buttons>
              </motion.div>
            </motion.div>

            {/* Image dots */}
            <motion.div className="flex justify-center lg:justify-start gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              {images.map((_, index) => (
                <button key={index} onClick={() => goToImage(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? (isDarkMode ? "bg-gray-300 scale-125 shadow-lg" : "bg-white scale-125 shadow-lg") : (isDarkMode ? "bg-gray-500/60 hover:bg-gray-400" : "bg-white/60 hover:bg-white/80")}`} aria-label={`Go to slide ${index + 1}`}/>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.6 }}>
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${isDarkMode ? "border-gray-400" : "border-white"}`}>
          <motion.div className={`w-1 h-3 rounded-full mt-2 ${isDarkMode ? "bg-gray-400" : "bg-white"}`} animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }}/>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
