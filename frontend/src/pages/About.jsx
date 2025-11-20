import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../pages/ParentPage";
import royce from "../assets/royce1.jpg";
import card from "../assets/dots.png"
import net from "../assets/tri.png"


function About() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section 
      id="about"
      className={`shade shadow-2xl pt-8 mb-16 pb-16 bg-cover bg-center bg-no-repeat transition-colors duration-300 ${
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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h4>

        <div className="flex flex-col lg:flex-row justify-between gap-12 pt-8 px-6 lg:px-12 items-center max-w-6xl mx-auto  ">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div
              className={`rounded-full p-4 ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-700 shadow-2xl"
                  : "bg-gradient-to-br from-blue-50 to-gray-100 shadow-xl"
              }`}
            >
              <img
                className="rounded-full w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-cover border-4 border-[#57aee8] shadow-lg"
                src={royce}
                alt="Okoh Chukwudi (GreatRoyce) - MERN Stack Developer"
              />
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            className="text-pretty px-4 lg:px-8 text-base sm:text-md lg:text-mg leading-relaxed flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <p className="mb-6">
                Hi, I'm{" "}
                <span className="font-bold text-[#57aee8]">Okoh Chukwudi</span>{" "}
                — most people know me as{" "}
                <span className="font-semibold">Royce</span>. I'm a
                multidisciplinary creator who moves confidently across
                engineering, technology, and the arts. My work is driven by a
                blend of precision and imagination, allowing me to create
                solutions that are functional, meaningful, and visually or
                emotionally compelling.
              </p>

              <p className="mb-6">
                I write clean, intentional code, but I also write stories,
                music, and ideas that resonate. With a background in{" "}
                <span className="font-medium">mechanical engineering</span> and{" "}
                <span className="font-medium">audio engineering</span>, I
                approach problems with structure, depth, and bold creativity.
                I bring
                narrative strength, versatility, and expressive detail into
                everything I create.
              </p>

              <div style={{backgroundImage: `url(${card})`}}
                className={`shaped  bg-cover bg-center bg-no-repeat mt-8 p-6 rounded-2xl transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-blue-50"
                }`}
              >
                <h5
                  className={`font-bold text-lg mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Quick Facts:
                </h5>
                <ul 
                  className={` space-y-3 text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#57aee8] rounded-full mr-3 flex-shrink-0"></span>
                    <span>
                      Full-Stack Developer (Actively Building & Expanding
                      Expertise)
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#57aee8] rounded-full mr-3 flex-shrink-0"></span>
                    <span>MERN Stack & TypeScript Enthusiast</span>
                  </li>

                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#57aee8] rounded-full mr-3 flex-shrink-0"></span>
                    <span>
                      Driven by Clean UI, Smooth UX & Thoughtful Development
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#57aee8] rounded-full mr-3 flex-shrink-0"></span>
                    <span>Mechanical & Audio Engineering Background</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#57aee8] rounded-full mr-3 flex-shrink-0"></span>
                    <span>Multidisciplinary Creator: Writing, Music & Visual Art</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#57aee8] rounded-full mr-3 flex-shrink-0"></span>
                    <span>Available for Remote Opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
