import React, { useState, useContext } from "react";
import Buttons from "../components/Button";
import { motion } from "framer-motion";
import { ThemeContext } from "../pages/ParentPage";
import { FaGithub, FaLinkedin, FaTwitter, FaPhone } from "react-icons/fa";

function Contact() {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your form submission logic (email service, API call, etc.)
  };

  const handlePhoneClick = () => {
    // This will trigger the native phone dialer on mobile devices
    window.location.href = "tel:+2347066070465";
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/GreatRoyce",
      label: "GitHub",
      color: "hover:text-gray-700 dark:hover:text-white",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/chukwudi-okoh/",
      label: "LinkedIn",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      icon: FaTwitter,
      href: "https://x.com/iAmGreatRoyce",
      label: "Twitter",
      color: "hover:text-blue-400 dark:hover:text-blue-300",
    },
  ];

  return (
    <section
      id="contact"
      className={`shade shadow-2xl my-16 pt-16 pb-8 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="pt-8 px-2 sm:px-12">
        <motion.h5
          className={` mx-auto text-center text-3xl font-bold transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h5>

        <div className="max-w-6xl py-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className={` shadow-lg p-8 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h6
              className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Send me a message
            </h6>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-2 py-1 border focus:ring-2 focus:ring-[#57aee8] focus:border-transparent transition-all duration-200 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-2 py-1 border focus:ring-2 focus:ring-[#57aee8] focus:border-transparent transition-all duration-200 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-2 py-1 border focus:ring-2 focus:ring-[#57aee8] focus:border-transparent transition-all duration-200 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className={`w-full px-2 py-1 border focus:ring-2 focus:ring-[#57aee8] focus:border-transparent transition-all duration-200 resize-vertical ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <Buttons
                type="submit"
                variant="outline"
                className="w-full bg-[#57aee8] hover:bg-white hover:text-[#57aee8] scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"
                size="medium"
              >
                Send Message
              </Buttons>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className={`rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h6
              className={`text-2xl font-bold mb-8 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Contact Information
            </h6>

            <div className="space-y-8">
              {/* Address */}
              <motion.div
                className="flex items-start space-x-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
                  }`}
                >
                  <svg
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h6
                    className={`font-semibold mb-1 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Address
                  </h6>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Lagos, Nigeria
                  </p>
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Available for remote work worldwide
                  </p>
                </div>
              </motion.div>

              {/* Phone - Now Clickable */}
              <motion.a
                href="tel:+2347066070465"
                onClick={handlePhoneClick}
                className="flex items-start space-x-4 cursor-pointer no-underline group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode 
                      ? "bg-green-900/30 group-hover:bg-green-800" 
                      : "bg-green-100 group-hover:bg-green-200"
                  }`}
                >
                  <FaPhone
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isDarkMode 
                        ? "text-green-400 group-hover:text-green-300" 
                        : "text-green-600 group-hover:text-green-700"
                    }`}
                  />
                </div>
                <div>
                  <h6
                    className={`font-semibold mb-1 transition-colors duration-300 group-hover:text-[#57aee8] ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Phone
                  </h6>
                  <p
                    className={`transition-colors duration-300 group-hover:text-[#57aee8] font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    +234 706 607 0465
                  </p>
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <span className="group-hover:text-[#57aee8] transition-colors duration-300">
                      Click to call • Mon - Fri, 9:00 AM - 6:00 PM
                    </span>
                  </p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.div
                className="flex items-start space-x-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? "bg-purple-900/30" : "bg-purple-100"
                  }`}
                >
                  <svg
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isDarkMode ? "text-purple-400" : "text-purple-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h6
                    className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Email
                  </h6>
                  <a
                    href="mailto:iamgreatroyce@gmail.com"
                    className={`transition-colors duration-200 font-medium block hover:text-[#57aee8] ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    iamgreatroyce@gmail.com
                  </a>
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    I'll respond within 24 hours
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
              <p className={`text-sm mb-3 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Quick actions:
              </p>
              <div className="flex gap-3">
                <motion.a
                  href="tel:+2347066070465"
                  onClick={handlePhoneClick}
                  className={`flex-1 py-2 px-3 text-center rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    isDarkMode
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Now
                </motion.a>
                <motion.a
                  href="https://wa.me/2347066070465"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-2 px-3 text-center rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    isDarkMode
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  WhatsApp
                </motion.a>
              </div>
            </div>

            {/* Social Links with Icons */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h6
                className={`font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Follow me on
              </h6>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-[#57aee8] hover:text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-[#57aee8] hover:text-white"
                      } ${social.color}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;