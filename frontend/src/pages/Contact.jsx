import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../pages/ParentPage";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Formspree from "../components/Formspree";

function Contact() {
  const { isDarkMode } = useContext(ThemeContext);

  const handlePhoneClick = () => {
    window.location.href = "tel:+2347066070465";
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello Royce, I'd like to discuss a project with you."
    );
    window.open(
      `https://wa.me/2347066070465?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
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
    {
      icon: FaWhatsapp,
      href: "https://wa.me/2347066070465",
      label: "WhatsApp",
      color: "hover:text-green-600 dark:hover:text-green-400",
      onClick: handleWhatsAppClick,
    },
  ];

  return (
    <section
      id="contact"
      className={`shade shadow-2xl px-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="pt-16 px-2 sm:px-12">
        <motion.h4
          className={`mx-auto text-center text-3xl font-bold transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h4>

        <motion.p
          className={`text-center mt-4 mb-12 max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Have a project in mind? Let's collaborate! Send me a message and I'll
          get back to you within 24 hours.
        </motion.p>

        <div className="max-w-6xl py-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Formspree Form */}
          <motion.div
            className={`shadow-xl rounded-2xl p-6 md:p-8 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h6
              className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Send a Message
            </h6>
            <p
              className={`mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Fill out the form below and I'll respond promptly.
            </p>

            {/* Formspree Component */}
            <Formspree
              formId="mjknrebn"
              compact={false}
              title={null}
              subtitle={null}
              darkMode={isDarkMode}
              showSubject={true}
              autoFocus={false}
              showSuccessMessage={true}
              successMessage="Message sent successfully! I'll get back to you within 24 hours at both email addresses."
              buttonText="Send Message"
              buttonSubmittingText="Sending..."
              buttonSuccessText="Message Sent!"
              className="mt-2"
            />
          </motion.div>

          {/* Right Column: Contact Information */}
          <motion.div
            className={`shadow-xl rounded-2xl p-6 md:p-8 transition-colors duration-300 ${
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
              {/* Location */}
              <motion.div
                className="flex items-start space-x-4 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode
                      ? "bg-blue-900/30 group-hover:bg-blue-800/50"
                      : "bg-blue-100 group-hover:bg-blue-200"
                  }`}
                >
                  <FaMapMarkerAlt
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isDarkMode
                        ? "text-blue-400 group-hover:text-blue-300"
                        : "text-blue-600 group-hover:text-blue-700"
                    }`}
                  />
                </div>
                <div>
                  <h6
                    className={`font-semibold mb-1 transition-colors duration-300 group-hover:text-[#57aee8] ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Location
                  </h6>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Lagos, Nigeria
                  </p>
                  <p
                    className={`text-sm mt-1 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Available for remote work worldwide
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.a
                href="tel:+2347066070465"
                onClick={handlePhoneClick}
                className="flex items-start space-x-4 cursor-pointer no-underline group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode
                      ? "bg-green-900/30 group-hover:bg-green-800/50"
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
                    className={`text-sm mt-1 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <span className="group-hover:text-[#57aee8] transition-colors duration-300">
                      Click to call • Available 9AM - 6PM WAT
                    </span>
                  </p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.div
                className="flex items-start space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode
                      ? "bg-purple-900/30 group-hover:bg-purple-800/50"
                      : "bg-purple-100 group-hover:bg-purple-200"
                  }`}
                >
                  <FaEnvelope
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isDarkMode
                        ? "text-purple-400 group-hover:text-purple-300"
                        : "text-purple-600 group-hover:text-purple-700"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <h6
                    className={`font-semibold transition-colors duration-300 group-hover:text-[#57aee8] ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Email
                  </h6>
                  <div className="space-y-1">
                    <a
                      href="mailto:royceokoh@gmail.com"
                      className={`transition-colors duration-200 block hover:text-[#57aee8] font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      royceokoh@gmail.com
                    </a>
                  </div>
                  <p
                    className={`text-sm mt-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    I’ll get back to you within 24 hours — usually sooner!
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p
                className={`text-sm mb-4 text-center ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Prefer instant communication?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <motion.a
                  href="tel:+2347066070465"
                  onClick={handlePhoneClick}
                  className={`py-3 px-4 text-center rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 ${
                    isDarkMode
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhone className="w-4 h-4" />
                  <span>Call Now</span>
                </motion.a>

                <motion.button
                  onClick={handleWhatsAppClick}
                  className={`py-3 px-4 text-center rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 ${
                    isDarkMode
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp</span>
                </motion.button>
              </div>
              <p
                className={`text-xs text-center mt-3 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                WhatsApp: +234 706 607 0465 • Quick responses
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h6
                className={`font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Connect with me
              </h6>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.button
                      key={social.label}
                      onClick={
                        social.onClick
                          ? social.onClick
                          : () =>
                              window.open(
                                social.href,
                                "_blank",
                                "noopener,noreferrer"
                              )
                      }
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-[#57aee8] hover:text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-[#57aee8] hover:text-white"
                      } ${social.color}`}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                      title={social.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Privacy Note */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
             
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
