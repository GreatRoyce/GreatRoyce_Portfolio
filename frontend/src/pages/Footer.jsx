import React, { useContext, useCallback } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import net from "../assets/cardbg.png";
import { ThemeContext } from "../pages/ParentPage";

function Footer() {
  const { isDarkMode } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  // Memoize scroll functions for better performance
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  const handleHireClick = useCallback(() => {
    scrollToSection("contact");
  }, [scrollToSection]);

  const handleServiceClick = useCallback(
    (serviceName) => {
      scrollToSection("services");

      setTimeout(() => {
        const serviceElements = document.querySelectorAll(".service-card");
        serviceElements.forEach((element) => {
          if (
            element.textContent
              .toLowerCase()
              .includes(serviceName.toLowerCase())
          ) {
            element.classList.add("highlight-pulse");

            setTimeout(() => {
              element.classList.remove("highlight-pulse");
            }, 2000);
          }
        });
      }, 800); // Wait for scroll to complete
    },
    [scrollToSection]
  );

  const services = [
    { name: "Web Development", id: "web-development" },
    { name: "Backend Development", id: "backend-development" },
    { name: "API Development", id: "api-development" },
    { name: "Consulting", id: "consulting" },
  ];

  // Social links data for better maintainability
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/GreatRoyce",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/chukwudi-okoh/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://x.com/iAmGreatRoyce",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
          />
        </svg>
      ),
    },
  ];

  const navigationLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Services", id: "services" },
  ];

  return (
    <footer
      className={`foot px-4 sm:px-6 lg:px-8 text-white transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-800"
      }`}
    >
      {/* CTA Section with Blurred Background */}
      <div
        style={{ backgroundImage: `url(${net})` }}
        className="relative bg-cover bg-no-repeat bg-center py-12 lg:py-16"
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            Ready to start your project?
          </h3>
          <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's work together to bring your ideas to life. I'm available for
            freelance work and exciting new opportunities.
          </p>
          <Button
            onClick={handleHireClick}
            variant="secondary"
            size="medium"
            className="relative z-10 w-full sm:w-auto"
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              GreatRoyce
            </h4>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Full-stack developer specializing in creating digital experiences
              that matter.
            </p>
            <div className="flex flex-col space-y-2 sm:space-y-3 items-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                  aria-label={`Visit ${social.name} profile`}
                >
                  <span className="mr-3 group-hover:scale-110 transition-transform duration-200">
                    {social.icon}
                  </span>
                  <span className="text-sm sm:text-base">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h5 className="font-semibold text-lg mb-3 sm:mb-4">Navigation</h5>
            <ul className="space-y-2 sm:space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base w-full text-left hover:translate-x-1 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-semibold text-lg mb-3 sm:mb-4">Services</h5>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => handleServiceClick(service.name)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer text-left w-full hover:translate-x-1 transform text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-semibold text-lg mb-3 sm:mb-4">Contact</h5>
            <div className="space-y-2 sm:space-y-3 text-gray-400">
              <a
                href="mailto:iamgreatroyce@gmail.com"
                className="hover:text-white transition-colors duration-200 block text-sm sm:text-base break-words"
              >
                iamgreatroyce@gmail.com
              </a>
              <a
                href="tel:+2347066070465"
                className="hover:text-white transition-colors duration-200 block text-sm sm:text-base"
              >
                +234 706 607 0465
              </a>
              <p className="hover:text-white transition-colors duration-200 text-sm sm:text-base">
                Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} GreatRoyce. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Add CSS for highlight animation */}
      <style jsx>{`
        .highlight-pulse {
          animation: pulse-highlight 2s ease-in-out;
          border: 2px solid #57aee8 !important;
          box-shadow: 0 0 20px rgba(87, 174, 232, 0.4);
        }

        @keyframes pulse-highlight {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(87, 174, 232, 0.7);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(87, 174, 232, 0);
            transform: scale(1.02);
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
