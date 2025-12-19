import React, { useContext, useState } from "react";
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
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // Brand color variations (same as Projects component)
  const brandColors = {
    primary: "#cc4e00",         // Main brand color
    light: "#ff6f2a",           // Lighter variation
    dark: "#a33c00",            // Darker variation
    muted: "#ff8f4d",           // Muted for backgrounds
    subtle: "#ffb385",          // Very light for subtle accents
    deep: "#8c2d00",            // Deep dark for borders/text
  };

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
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/chukwudi-okoh/",
      label: "LinkedIn",
    },
    {
      icon: FaTwitter,
      href: "https://x.com/iAmGreatRoyce",
      label: "Twitter",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/2347066070465",
      label: "WhatsApp",
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

            {/* Formspree Component - You'll need to update this component to use brand colors too */}
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
              // Pass brand colors to Formspree if it accepts custom styling
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
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: isDarkMode 
                      ? `${brandColors.muted}30`  // 30 = 0.2 opacity in hex
                      : `${brandColors.subtle}`
                  }}
                >
                  <FaMapMarkerAlt
                    className="w-5 h-5 transition-colors duration-300"
                    style={{
                      color: isDarkMode 
                        ? brandColors.light
                        : brandColors.primary
                    }}
                  />
                </div>
                <div>
                  <h6
                    className={`font-semibold mb-1 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    } group-hover:text-[${brandColors.primary}]`}
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
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: isDarkMode 
                      ? `${brandColors.muted}30`
                      : `${brandColors.subtle}`
                  }}
                >
                  <FaPhone
                    className="w-5 h-5 transition-colors duration-300"
                    style={{
                      color: isDarkMode 
                        ? brandColors.light
                        : brandColors.primary
                    }}
                  />
                </div>
                <div>
                  <h6
                    className={`font-semibold mb-1 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    } group-hover:text-[${brandColors.primary}]`}
                  >
                    Phone
                  </h6>
                  <p
                    className={`transition-colors duration-300 font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } group-hover:text-[${brandColors.primary}]`}
                  >
                    +234 706 607 0465
                  </p>
                  <p
                    className={`text-sm mt-1 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    } group-hover:text-[${brandColors.light}]`}
                  >
                    Click to call • Available 9AM - 6PM WAT
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
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: isDarkMode 
                      ? `${brandColors.muted}30`
                      : `${brandColors.subtle}`
                  }}
                >
                  <FaEnvelope
                    className="w-5 h-5 transition-colors duration-300"
                    style={{
                      color: isDarkMode 
                        ? brandColors.light
                        : brandColors.primary
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <h6
                    className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    } group-hover:text-[${brandColors.primary}]`}
                  >
                    Email
                  </h6>
                  <div className="space-y-1">
                    <a
                      href="mailto:royceokoh@gmail.com"
                      className={`transition-colors duration-200 block font-medium hover:text-[${brandColors.primary}] ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                      style={{
                        color: isDarkMode ? "#d1d5db" : "#4b5563"
                      }}
                    >
                      royceokoh@gmail.com
                    </a>
                  </div>
                  <p
                    className={`text-sm mt-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    I'll get back to you within 24 hours — usually sooner!
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
                  className="py-3 px-4 text-center rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 text-white"
                  style={{ 
                    backgroundColor: brandColors.primary,
                    boxShadow: `0 4px 14px 0 ${brandColors.primary}40`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = brandColors.light;
                    e.currentTarget.style.boxShadow = `0 6px 20px 0 ${brandColors.primary}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = brandColors.primary;
                    e.currentTarget.style.boxShadow = `0 4px 14px 0 ${brandColors.primary}40`;
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhone className="w-4 h-4" />
                  <span>Call Now</span>
                </motion.a>

                <motion.button
                  onClick={handleWhatsAppClick}
                  className="py-3 px-4 text-center rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 text-white"
                  style={{ 
                    backgroundColor: brandColors.primary,
                    boxShadow: `0 4px 14px 0 ${brandColors.primary}40`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = brandColors.light;
                    e.currentTarget.style.boxShadow = `0 6px 20px 0 ${brandColors.primary}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = brandColors.primary;
                    e.currentTarget.style.boxShadow = `0 4px 14px 0 ${brandColors.primary}40`;
                  }}
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
                  const isHovered = hoveredSocial === social.label;
                  
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
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110`}
                      style={{
                        backgroundColor: isHovered
                          ? brandColors.primary
                          : (isDarkMode ? "#374151" : "#f3f4f6"),
                        color: isHovered
                          ? "white"
                          : (isDarkMode ? brandColors.subtle : brandColors.primary)
                      }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                      title={social.label}
                      onMouseEnter={() => setHoveredSocial(social.label)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Brand Color Decorative Element */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{
                      backgroundColor: brandColors.primary,
                      animationDelay: `${i * 200}ms`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section Footer */}
        <motion.div
          className="mt-16 mb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Ready to bring your ideas to life? Let's create something amazing together.
          </p>
          <div className="mt-4 inline-flex items-center justify-center gap-3">
            <div 
              className="w-3 h-3 rounded-full animate-brand-pulse"
              style={{ backgroundColor: brandColors.primary }}
            ></div>
            <div 
              className="w-2 h-2 rounded-full animate-brand-pulse"
              style={{ 
                backgroundColor: brandColors.light,
                animationDelay: '300ms'
              }}
            ></div>
            <div 
              className="w-2 h-2 rounded-full animate-brand-pulse"
              style={{ 
                backgroundColor: brandColors.muted,
                animationDelay: '600ms'
              }}
            ></div>
          </div>
        </motion.div>
      </div>

      {/* Add custom CSS for brand animations */}
      <style jsx>{`
        @keyframes brand-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
        
        .animate-brand-pulse {
          animation: brand-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Custom hover styles for email links */
        a:hover {
          color: ${brandColors.primary} !important;
        }
      `}</style>
    </section>
  );
}

export default Contact;