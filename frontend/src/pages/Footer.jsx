import React, { useContext } from "react";
import Button from "../components/Button";
import net from "../assets/cardbg.png";
import { ThemeContext } from "../pages/ParentPage";

function Footer() {
  const { isDarkMode } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  const handleHireClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className={`text-white transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-800"
      }`}
    >
      {/* CTA Section with Blurred Background */}
      <div
        style={{ backgroundImage: `url(${net})` }}
        className="relative bg-cover bg-no-repeat bg-center py-16"
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start your project?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life. I'm available for
            freelance work and exciting new opportunities.
          </p>
          <Button
            onClick={handleHireClick}
            variant="secondary"
            size="medium"
            className=" relative z-10"
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h4 className="text-2xl font-bold mb-4">GreatRoyce</h4>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Full-stack developer specializing in creating digital experiences
              that matter.
            </p>
            <div className="flex flex-col space-y-3 items-start">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
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
                <span>Twitter</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Navigation</h5>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Services
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Services</h5>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Web Development
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Backend Development
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                API Development
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                Consulting
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Contact</h5>
            <div className="space-y-3 text-gray-400">
              <a
                href="mailto:iamgreatroyce@gmail.com"
                className="hover:text-white transition-colors duration-200 block"
              >
                iamgreatroyce@gmail.com
              </a>
              <a
                href="tel:+2347066070465"
                className="hover:text-white transition-colors duration-200 block"
              >
                +234 706 607 0465
              </a>
              <p className="hover:text-white transition-colors duration-200">
                Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} GreatRoyce. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
