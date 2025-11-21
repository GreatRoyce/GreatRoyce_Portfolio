import React, { useContext } from "react";
import css from "../assets/css.png";
import html from "../assets/html.png";
import js from "../assets/js.png";
import mongoDb from "../assets/mongoDb.png";
import react from "../assets/react.svg";
import tw from "../assets/tw.png";
import { motion } from "framer-motion";
import { ThemeContext } from "../pages/ParentPage";

const servicesCards = [
  {
    id: 1,
    title: "Custom Web Application Development",
    desc: "Creating custom web applications that deliver tailored solutions with high performance, seamless UX, and scalable design",
  },
  {
    id: 2,
    title: "Responsive Design Integration",
    desc: "Designing websites and applications that adapt seamlessly to any device, ensuring optimal user experience everywhere.",
  },
  {
    id: 3,
    title: "API Development and Intergration",
    desc: "Building and integrating APIs to enable seamless communication between systems, ensuring reliable and efficient data flow.",
  },
];

function Services() {
  const { isDarkMode } = useContext(ThemeContext);
  const technologies = [css, html, js, mongoDb, tw, react];

  // Create a long enough array for smooth looping
  const marqueeTechnologies = [
    ...technologies,
    ...technologies,
    ...technologies,
    ...technologies,
  ];

  return (
    <section id="services" className={` shade shadow-2xl my-16 py-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 text-center">
        <motion.h4 
          className={`mb-8 text-3xl pt-8 font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Services
        </motion.h4>
        
        <motion.p 
          className={`text-md pb-8 max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Comprehensive web development services to bring your ideas to life
        </motion.p>

        {/* Services Cards with Motion */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 mb-20"
        >
          {servicesCards.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                },
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={`shade p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 hover:border-[#57aee8]' 
                  : 'bg-white border-gray-200 hover:border-[#57aee8]'
              }`}
            >
              <div className={`hidden w-16 h-16 rounded-xl items-center justify-center mx-auto mb-6 transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 group-hover:bg-[#57aee8]' 
                  : 'bg-blue-100 group-hover:bg-[#57aee8]'
              }`}>
                <div className={`w-8 h-8 rounded-lg transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-[#57aee8] group-hover:bg-white' 
                    : 'bg-[#57aee8] group-hover:bg-white'
                }`}></div>
              </div>
              
              <h5 className={`font-bold text-md w-4/5 mx-auto mb-4 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white group-hover:text-[#57aee8]' 
                  : 'text-gray-800 group-hover:text-[#57aee8]'
              }`}>
                {item.title}
              </h5>
              <p className={`text-sm font-thin leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Technologies Marquee */}
        <div className="mt-8">
          <motion.h5 
            className={`text-2xl font-semibold pb-8 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technologies I Work With
          </motion.h5>
          
          <div className={`relative w-2/3 mx-auto overflow-hidden rounded-2xl shadow-md py-8 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Gradient overlays for smooth edges */}
            <div className={`absolute left-0 top-0 w-20 h-full bg-gradient-to-r z-10 pointer-events-none transition-colors duration-300 ${
              isDarkMode ? 'from-gray-900 to-transparent' : 'from-white to-transparent'
            }`}></div>
            <div className={`absolute right-0 top-0 w-20 h-full bg-gradient-to-l z-10 pointer-events-none transition-colors duration-300 ${
              isDarkMode ? 'from-gray-900 to-transparent' : 'from-white to-transparent'
            }`}></div>

            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center space-x-12 md:space-x-16 animate-smooth-marquee">
                {marqueeTechnologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0"
                    whileHover={{ 
                      scale: 1.2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <img
                      src={tech}
                      alt="Technology"
                      className={`h-14 w-14 md:h-16 md:w-16 object-contain filter transition-all duration-300 ${
                        isDarkMode 
                          ? 'grayscale hover:grayscale-0 brightness-75 hover:brightness-100' 
                          : 'grayscale hover:grayscale-0'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add custom styles for the marquee */}
      <style jsx>{`
        @keyframes smooth-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 4));
          }
        }

        .animate-smooth-marquee {
          animation: smooth-marquee 45s linear infinite;
          display: flex;
        }

        .animate-smooth-marquee:hover {
          animation-play-state: paused;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .animate-smooth-marquee {
            animation-duration: 35s;
          }
        }

        @media (max-width: 480px) {
          .animate-smooth-marquee {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
}

export default Services;