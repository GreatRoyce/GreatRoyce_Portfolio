import React, { useState, useEffect } from 'react';

function PrivacyPolicy() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system theme preference
  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else if (systemPrefersDark) {
      setIsDarkMode(true);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#111827';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    }
    localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    // If you're using React Router
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to home page
      window.location.href = '/';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
    }`}>
      {/* Header with Navigation */}
      <header className={`py-4 px-6 border-b ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBackToPortfolio}
            className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Portfolio
          </button>
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-[#57aee8]">
              Privacy Policy
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Last updated: November 2025
            </p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              For GreatRoyce Portfolio Website
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              Introduction
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Welcome to my personal portfolio website. I'm Okoh Chukwudi (GreatRoyce), 
              a full-stack developer, and I'm committed to protecting your privacy. 
              This Privacy Policy explains how I handle your information when you visit 
              my portfolio site.
            </p>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              As a portfolio website, the data collection is minimal and focused on 
              providing you with the best experience while maintaining your privacy.
            </p>
          </section>

          {/* Information Collection */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              Information I Collect
            </h2>

            <h3 className="text-xl font-medium mb-3">Contact Form Information</h3>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              When you choose to contact me through my contact form, I collect:
            </p>
            <ul className={`list-disc list-inside space-y-2 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Your name</li>
              <li>Email address</li>
              <li>Subject of your message</li>
              <li>Your message content</li>
              <li>Any additional information you voluntarily provide</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">Automated Collection</h3>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Like most websites, my hosting provider may automatically collect:
            </p>
            <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>IP address (anonymized)</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Date and time of access</li>
            </ul>
          </section>

          {/* How I Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              How I Use Your Information
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The information collected is used exclusively for:
            </p>
            <ul className={`list-disc list-inside space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>
                <strong>Responding to Inquiries:</strong> To reply to your messages and discuss potential opportunities
              </li>
              <li>
                <strong>Portfolio Improvement:</strong> To understand how visitors use my site and improve its content
              </li>
              <li>
                <strong>Technical Operation:</strong> To ensure the website functions properly and securely
              </li>
              <li>
                <strong>Communication:</strong> To follow up on project discussions and collaborations
              </li>
            </ul>
          </section>

          {/* Data Storage and Protection */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              Data Storage and Protection
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your data is handled with care:
            </p>
            <ul className={`list-disc list-inside space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Contact form submissions are stored securely and accessed only by me</li>
              <li>I use industry-standard security measures to protect your information</li>
              <li>Data is stored only as long as necessary for our communication</li>
              <li>I regularly review and delete old contact form submissions</li>
            </ul>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              As a solo developer, I maintain full control over your data and don't share it 
              with third parties for marketing purposes.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              Third-Party Services
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              This portfolio website uses minimal third-party services:
            </p>
            <ul className={`list-disc list-inside space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>
                <strong>Hosting Provider:</strong> The website is hosted on platforms that may collect basic analytics
              </li>
              <li>
                <strong>External Links:</strong> Links to my GitHub, LinkedIn, and other professional profiles
              </li>
              <li>
                <strong>Contact Form:</strong> May use email services to deliver your messages
              </li>
            </ul>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I encourage you to review the privacy policies of any external sites you visit through links on my portfolio.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              Your Rights
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              You have the right to:
            </p>
            <ul className={`list-disc list-inside space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Access any personal information I hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Ask me to delete your personal data</li>
              <li>Withdraw consent for data processing</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              To exercise any of these rights, simply contact me using the information below.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              Cookies and Tracking
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              This portfolio website uses minimal cookies:
            </p>
            <ul className={`list-disc list-inside space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>
                <strong>Essential Cookies:</strong> Required for basic website functionality
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your theme preference (light/dark mode)
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Basic analytics to understand site usage (if any)
              </li>
            </ul>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              You can control cookies through your browser settings. Disabling cookies may affect 
              some functionality like theme preferences.
            </p>
          </section>

          {/* Data Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              Data Sharing Policy
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I do not and will not:
            </p>
            <ul className={`list-disc list-inside space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Sell, trade, or rent your personal information</li>
              <li>Use your data for marketing campaigns</li>
              <li>Share your information with third-party advertisers</li>
              <li>Use automated decision-making or profiling</li>
            </ul>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The only exception would be if required by law or to protect my legal rights.
            </p>
          </section>

          {/* Policy Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              Changes to This Policy
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I may update this Privacy Policy occasionally to reflect changes in my practices, 
              technology, or legal requirements. The "Last updated" date at the top will indicate 
              when revisions were made.
            </p>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I encourage you to review this policy periodically. Continued use of the site after 
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              Contact Me
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              If you have any questions about this Privacy Policy, your data, or wish to exercise 
              your rights, please contact me:
            </p>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="space-y-3">
                <p className="font-medium">Email: iamgreatroyce@gmail.com</p>
                <p className="font-medium">Phone: +234 706 607 0465</p>
                <p className="font-medium">Portfolio: greatroyce.com</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  I typically respond to privacy-related inquiries within 48 hours.
                </p>
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
          <section className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <button 
                onClick={() => window.location.href = '/terms-of-service'}
                className="hover:text-[#57aee8] transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={handleBackToPortfolio}
                className="hover:text-[#57aee8] transition-colors"
              >
                Back to Portfolio
              </button>
              <button 
                onClick={scrollToTop}
                className="hover:text-[#57aee8] transition-colors"
              >
                Back to Top
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-colors duration-200 z-50 ${
          isDarkMode
            ? 'bg-[#57aee8] text-white hover:bg-[#4a9cd6]'
            : 'bg-[#57aee8] text-white hover:bg-[#4a9cd6]'
        }`}
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}

export default PrivacyPolicy;