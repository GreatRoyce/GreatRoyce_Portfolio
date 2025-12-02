import React, { useContext } from "react";
import { motion } from "framer-motion"
import { ThemeContext } from "../pages/ParentPage";
import royce from "../assets/royce1.jpg";
import card from "../assets/dots.png";
import net from "../assets/tri.png";

function About() {
  const { isDarkMode } = useContext(ThemeContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.6,
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id="about"
      className={`shadow-2xl bg-cover bg-center bg-no-repeat py-16 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="w-full min-h-[60vh]">
        <motion.h4
          className={`pt-16 text-center text-3xl font-bold transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          About Me
        </motion.h4>

        <motion.div
          className="flex flex-col lg:flex-row justify-between gap-12 pt-8 px-6 lg:px-12 items-center max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Profile Image */}
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <motion.div
              variants={imageVariants}
              whileHover="hover"
              className={`rounded-full p-4 ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-700 shadow-2xl"
                  : "bg-gradient-to-br from-blue-50 to-gray-100 shadow-xl"
              }`}
            >
              <motion.img
                className="rounded-full w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-cover border-4 border-[#57aee8] shadow-lg"
                src={royce}
                alt="Okoh Chukwudi (GreatRoyce) - MERN Stack Developer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* About Text */}
          <motion.div
            variants={itemVariants}
            className="text-pretty px-4 lg:px-8 text-base sm:text-md lg:text-mg leading-relaxed flex-1"
          >
            <div
              className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <motion.p
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hi, I'm{" "}
                <span className="font-bold text-[#57aee8]">Okoh Chukwudi</span>{" "}
                — most people know me as{" "}
                <span className="font-semibold">Royce</span>. I'm a
                multidisciplinary creator who moves confidently across
                engineering, technology, and the arts. My work is driven by a
                blend of precision and imagination, allowing me to create
                solutions that are functional, meaningful, and visually or
                emotionally compelling.
              </motion.p>

              <motion.p
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I write clean, intentional code, but I also write stories,
                music, and ideas that resonate. And so, I bring narrative strength,
                versatility, and expressive detail into everything I create.
              </motion.p>

              <motion.div
                style={{ backgroundImage: `url(${card})` }}
                className={`shaped bg-cover bg-center bg-no-repeat mt-8 p-6 rounded-2xl transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-blue-50"
                }`}
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.h5
                  className={`font-bold text-lg mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-[#cc4e00]"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Quick Facts:
                </motion.h5>
                <ul className="space-y-3 text-sm transition-colors duration-300">
                  {[
                    "Full-Stack Developer (Actively Building & Expanding Expertise)",
                    "MERN Stack & TypeScript Enthusiast",
                    "Driven by Clean UI, Smooth UX & Thoughtful Development",
                    "Mechanical & Audio Engineering Background",
                    "Multidisciplinary Creator: Writing, Music & Visual Art",
                    "Available for Remote Opportunities",
                  ].map((fact, index) => (
                    <motion.li
                      key={index}
                      className={`flex items-center transition-colors duration-300 ${
                        isDarkMode
                          ? "text-[#cc4e00]"
                          : "text-gray-300 font-medium"
                      }`}
                      custom={index}
                      variants={listItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.span
                        className="w-2 h-2 bg-[#57aee8] rounded-full mr-3 flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span>{fact}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
