import React from "react";

function Resume() {
  return (
    <main className="bg-gray-100 text-gray-900 antialiased min-h-screen py-10">
      <section className="max-w-4xl mx-auto bg-white shadow-lg p-8 md:p-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Chukwudi Okoh</h1>
          <p className="text-gray-600 mt-1">
            Junior Full-Stack Developer (MERN)
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-700">
            <span>Nigeria</span>
            <span>•</span>
            <span>Open to Remote & Internship Roles</span>
            <span>•</span>
            <a href="mailto:royceokoh@gmail.com" className="hover:underline">
              royceokoh@gmail.com
            </a>
          </div>
        </header>

        {/* Profile */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b pb-1 mb-3">Profile</h2>
          <p className="text-sm text-gray-800 leading-relaxed">
            Certified junior full-stack developer with hands-on experience
            building MERN-stack applications. Strong focus on clean UI, RESTful
            APIs, and NoSQL databases. Seeking junior or internship roles to
            contribute to production-level projects.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <span>HTML5</span>
            <span>CSS3</span>
            <span>Tailwind CSS</span>
            <span>JavaScript (ES6+)</span>
            <span>React (Vite)</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>MongoDB / Mongoose</span>
            <span>RESTful APIs</span>
            <span>Git & GitHub</span>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b pb-1 mb-3">Projects</h2>

          <ul className="list-disc ml-5 text-sm text-gray-800 space-y-3">
            <li>
              <strong>ElitePlan</strong> — MERN event planning platform.
              <br />
              <em>React, Tailwind, Node.js, Express, MongoDB</em>
              <br />
              Built REST APIs, CRUD features, and responsive UI components.
            </li>

            <li>
              <strong>EARNalyzer</strong> — Personal finance tracker.
              <br />
              <em>React, JavaScript, Tailwind</em>
              <br />
              Implemented dynamic calculations and user input handling.
            </li>

            <li>
              <strong>ChowChowDeck Backend</strong> — Backend API service.
              <br />
              <em>Node.js, Express, MongoDB</em>
              <br />
              Designed RESTful endpoints and database models.
            </li>

            <li>
              <strong>News-Teller</strong> — News aggregation app.
              <br />
              <em>JavaScript, APIs</em>
              <br />
              Fetched and rendered live data asynchronously.
            </li>

            <li>
              <strong>GreatRoyce Portfolio</strong> — Developer portfolio.
              <br />
              <em>React, Tailwind</em>
              <br />
              Showcases projects and résumé.
            </li>
          </ul>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b pb-1 mb-3">
            Professional Experience
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <h3 className="font-semibold">
                Media Producer & Broadcaster — Studio, News & Freelance
              </h3>
              <span className="text-gray-600">2022–2024</span>
            </div>

            <div className="flex justify-between">
              <h3 className="font-semibold">
                Creative Director & Studio Manager — Freiheit Communications
              </h3>
              <span className="text-gray-600">2019–2022</span>
            </div>

            <div className="flex justify-between">
              <h3 className="font-semibold">
                Music Producer — Studio & Freelance
              </h3>
              <span className="text-gray-600">2017–2019</span>
            </div>

            <div className="flex justify-between">
              <h3 className="font-semibold">
                Production Operator — May & Baker
              </h3>
              <span className="text-gray-600">2015–2017</span>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b pb-1 mb-3">
            Education & Certification
          </h2>

          <ul className="text-sm text-gray-800 space-y-2">
            <li>
              <strong>Certified Full-Stack Developer</strong> — ITSkills Center
              (2024)
            </li>
            <li>Android App Development (Java)</li>
            <li>
              Diploma in Mechanical Engineering — Yaba College of Technology
            </li>
          </ul>
        </section>

        {/* Soft Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b pb-1 mb-3">
            Soft Skills
          </h2>
          <p className="text-sm text-gray-800">
            Problem Solving • Communication • Adaptability • Analytical Thinking
          </p>
        </section>

        {/* Footer */}
        <section className="no-print flex justify-between items-center mt-10">
          <p className="text-sm text-gray-500">Last updated: 2025</p>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800"
          >
            Download PDF
          </button>
        </section>
      </section>
    </main>
  );
}

export default Resume;
