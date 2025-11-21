import React, { useState, useEffect } from "react";
import Buttons from "../components/Button";
import { motion, AnimatePresence } from "framer-motion";
import heroBackground from "../assets/me.jpg";
import secondHeroBg from "../assets/royce.jpg";

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [heroBackground, secondHeroBg];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 3.5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Button click handlers
  const handleHireClick = () => {
    setCurrentImageIndex(0); // Show first image (me.jpg) for Hire button
  };

  const handleDownloadCvClick = () => {
    setCurrentImageIndex(1); // Show second image (royce.jpg) for Download CV button
  };

  return (
    <>
      <section id="home" 
      className="shade sm:mb-16 sm:pt-20 relative overflow-hidden">
        {/* Animated Background Images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${images[currentImageIndex]})`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        {/* Blue Overlay */}
        <motion.div
          className="absolute inset-0 bg-[#57aee8] z-0 mix-blend-multiply"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* White overlay that fades out on scroll */}
        <motion.div
          className="absolute inset-0 bg-white z-0"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <div className="relative w-full min-h-[80vh] mb-[10vh] flex items-center">
          <div className="w-full max-w-6xl mx-auto">
            <div className="h-full w-full lg:w-2/5 flex flex-col justify-center py-8 lg:py-0">
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                  },
                }}
                initial="hidden"
                animate="show"
                className="text-center capitalize sm:text-left px-6 lg:pl-12 pt-6 lg:pt-10 w-full lg:w-2/3 text-2xl sm:text-3xl lg:text-4xl font-bold relative z-10 text-white"
              >
                {"Expert MERN Developer for Modern Innovations"
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      className=" "
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 1.2 },
                        },
                      }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))
                  .reduce((acc, word, index) => {
                    if (index === 2)
                      return [...acc, word, <br key={`br-${index}`} />];
                    if (index === 3)
                      return [...acc, word, <br key={`br-${index}`} />];
                    return [...acc, word];
                  }, [])}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-6 px-6 lg:pl-12 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Buttons
                  variant="primary"
                  className={`
                    bg-white text-[#57aee8] hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg
                    ${currentImageIndex !== 0 ? "opacity-50" : "opacity-100"}
                  `}
                  size="small"
                  onClick={handleHireClick}
                >
                  Hire
                </Buttons>
                <Buttons
                  variant="outline"
                  className={`
                    border-2 border-white text-white hover:bg-white hover:text-[#57aee8] hover:scale-105 transform transition-all duration-300
                    ${currentImageIndex !== 1 ? "opacity-50" : "opacity-100"}
                  `}
                  size="small"
                  onClick={handleDownloadCvClick}
                >
                  Download CV
                </Buttons>
              </motion.div>

              {/* Image Indicator Dots */}
              <div className="flex gap-2 mt-8 px-6 lg:pl-12 relative z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-white bg-opacity-50 hover:bg-opacity-75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
