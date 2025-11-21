import React, { useState, useEffect } from 'react';

function TermsOfService() {
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
              Terms of Service
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
              1. Acceptance of Terms
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Welcome to my portfolio website. By accessing and using this website, 
              you accept and agree to be bound by these Terms of Service. If you do 
              not agree to these terms, please do not use this website.
            </p>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              These terms govern your use of the GreatRoyce portfolio website and 
              all content, services, and products available at or through the website.
            </p>
          </section>

          {/* Use of Website */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              2. Use of Website
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              You may use this website for lawful purposes only and in accordance with 
              these Terms of Service. You agree not to use the website:
            </p>
            <ul className={`list-disc list-inside space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>In any way that violates any applicable law or regulation</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material</li>
              <li>To impersonate or attempt to impersonate me, another user, or any other person</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use of the website</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              3. Intellectual Property Rights
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The website and its entire contents, features, and functionality are owned by 
              Okoh Chukwudi (GreatRoyce) and are protected by international copyright, 
              trademark, and other intellectual property laws.
            </p>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              You are permitted to:
            </p>
            <ul className={`list-disc list-inside space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>View and display the content for personal, non-commercial use</li>
              <li>Share links to the website with proper attribution</li>
              <li>Reference the projects and work for educational purposes</li>
            </ul>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              You must not:
            </p>
            <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Modify copies of any materials from this website</li>
              <li>Use any illustrations, photographs, or graphics separately from accompanying text</li>
              <li>Delete or alter any copyright, trademark, or other proprietary rights notices</li>
              <li>Reproduce, distribute, or create derivative works without explicit written permission</li>
            </ul>
          </section>

          {/* User Contributions */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              4. User Contributions
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The website may contain contact forms and other interactive features that allow 
              you to submit content. Any content you submit through these features must comply 
              with these Terms of Service.
            </p>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              By submitting any content, you grant me a non-exclusive, royalty-free, perpetual, 
              and worldwide license to use, reproduce, modify, and display such content for the 
              purpose of responding to your inquiry and improving my services.
            </p>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              You represent and warrant that:
            </p>
            <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>You own or control all rights in and to the content</li>
              <li>The content is accurate and not misleading</li>
              <li>The content does not violate any third-party rights</li>
              <li>The content is not unlawful, offensive, or inappropriate</li>
            </ul>
          </section>

          {/* Disclaimer of Warranties */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              5. Disclaimer of Warranties
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              This website is provided on an "as is" and "as available" basis, without any 
              warranties of any kind, either express or implied. I disclaim all warranties, 
              including but not limited to:
            </p>
            <ul className={`list-disc list-inside space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>Warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
              <li>That the website will be uninterrupted, secure, or available at any particular time</li>
              <li>That the website will be error-free or that defects will be corrected</li>
              <li>That the website or server that makes it available are free of viruses</li>
            </ul>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The content on this website is for general information and portfolio purposes only. 
              I make no representations or warranties about the accuracy or completeness of this content.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              6. Limitation of Liability
            </h2>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              To the fullest extent permitted by applicable law, in no event will Okoh Chukwudi 
              (GreatRoyce), his affiliates, or their licensors, service providers, employees, 
              agents, officers, or directors be liable for damages of any kind, under any legal 
              theory, arising out of or in connection with your use, or inability to use, the 
              website, including any direct, indirect, special, incidental, consequential, or 
              punitive damages.
            </p>
          </section>

          {/* Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              7. Indemnification
            </h2>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              You agree to defend, indemnify, and hold harmless Okoh Chukwudi (GreatRoyce), 
              his affiliates, licensors, and service providers, and its and their respective 
              officers, directors, employees, contractors, agents, licensors, suppliers, 
              successors, and assigns from and against any claims, liabilities, damages, 
              judgments, awards, losses, costs, expenses, or fees arising out of or relating 
              to your violation of these Terms of Service or your use of the website.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              8. Third-Party Links and Content
            </h2>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              This website may contain links to third-party websites or resources. These links 
              are provided for your convenience only. I have no control over the contents of 
              those websites or resources, and accept no responsibility for them or for any 
              loss or damage that may arise from your use of them. If you decide to access any 
              third-party websites linked to this website, you do so entirely at your own risk 
              and subject to the terms and conditions of use for such websites.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              9. Governing Law and Jurisdiction
            </h2>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              These Terms of Service and any dispute or claim arising out of or in connection 
              with them shall be governed by and construed in accordance with the laws of 
              Nigeria, without giving effect to any choice or conflict of law provision or rule.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              10. Changes to Terms
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I reserve the right to modify or replace these Terms of Service at any time at 
              my sole discretion. If a revision is material, I will make reasonable efforts 
              to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              By continuing to access or use the website after those revisions become effective, 
              you agree to be bound by the revised terms.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              11. Termination
            </h2>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I may terminate or suspend your access to the website immediately, without prior 
              notice or liability, for any reason whatsoever, including without limitation if 
              you breach these Terms of Service.
            </p>
          </section>

          {/* Severability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              12. Severability
            </h2>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              If any provision of these Terms of Service is held to be invalid, illegal, or 
              unenforceable for any reason, such provision shall be eliminated or limited to 
              the minimum extent such that the remaining provisions of the Terms of Service 
              will continue in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              13. Entire Agreement
            </h2>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              These Terms of Service constitute the sole and entire agreement between you and 
              Okoh Chukwudi (GreatRoyce) regarding the website and supersede all prior and 
              contemporaneous understandings, agreements, representations, and warranties, 
              both written and oral, regarding the website.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#57aee8]">
              14. Contact Information
            </h2>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              If you have any questions about these Terms of Service, please contact me:
            </p>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="space-y-3">
                <p className="font-medium">Email: iamgreatroyce@gmail.com</p>
                <p className="font-medium">Phone: +234 706 607 0465</p>
                <p className="font-medium">Portfolio: greatroyce.com</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  I typically respond to inquiries within 24-48 hours.
                </p>
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
          <section className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <button 
                onClick={() => window.location.href = '/privacy-policy'}
                className="hover:text-[#57aee8] transition-colors"
              >
                Privacy Policy
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

export default TermsOfService;