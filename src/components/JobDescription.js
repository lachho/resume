import React from 'react';
import { Link } from 'react-router-dom';

const JobDescription = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Navigation Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link 
          to="/"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Resume Analyser
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Header */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Graduate & Intern Engineer Program 2026 - COSVEC
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-800">Company:</span> COSVEC
              </div>
              <div>
                <span className="font-medium text-gray-800">Location:</span> Sydney, NSW, Australia
              </div>
              <div>
                <span className="font-medium text-gray-800">Work Type:</span> Full-Time (Graduate), Fixed-Term Contract (Intern)
              </div>
              <div>
                <span className="font-medium text-gray-800">Classification:</span> Civil Engineering
              </div>
            </div>
          </div>

          {/* About COSVEC */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About COSVEC</h2>
            <p className="text-gray-700 leading-relaxed">
              At COSVEC, we're dedicated to shaping a better future for communities across Australia and beyond. 
              As a leading, multi-disciplinary engineering consultancy, we specialise in delivering innovative and 
              sustainable solutions for complex infrastructure challenges. Our projects, from iconic high-rise buildings 
              and transport networks to critical water and energy systems, form the backbone of modern society. 
              Our Sydney office is a vibrant, collaborative hub at the centre of our most exciting projects, and 
              we're looking for the next generation of engineers to join our team.
            </p>
          </section>

          {/* Your Future Starts Here */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Future Starts Here</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are excited to announce openings in our 2026 Graduate Program and our 2025/2026 Summer Internship Program. 
              This is your chance to launch your career and work alongside industry leaders on city-shaping projects. 
              We are seeking passionate and driven students and graduates across a range of engineering disciplines 
              to join our dynamic teams:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Buildings:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Civil</li>
                  <li>Geotechnical</li>
                  <li>Structural</li>
                  <li>Facade</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Transport:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Transport Planning</li>
                  <li>Roads and Bridges</li>
                  <li>Tunneling</li>
                  <li>Rail</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Environment:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Water</li>
                  <li>Wastewater</li>
                  <li>Sustainability</li>
                  <li>Environmental</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Project Advisory Team:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Project Management</li>
                  <li>Digital Transformation</li>
                  <li>Construction</li>
                  <li>Surveying</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As an early career engineer, you will be an integral part of our project teams. Under the guidance 
              of senior engineers, you will contribute to real projects from day one. Your responsibilities will include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Assisting in the preparation of detailed designs, technical calculations, and engineering analysis.</li>
              <li>Utilising key industry software such as AutoCAD, Civil 3D, Revit and 12d Model</li>
              <li>Preparing technical reports, specifications, and drawings for development applications and construction.</li>
              <li>Collaborating with multidisciplinary teams, including architects, planners, and environmental scientists.</li>
              <li>Assisting with project planning, cost estimation, and stakeholder communication.</li>
            </ul>
          </section>

          {/* About You */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About You</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              To be successful in this role, you will be a motivated and curious individual with a strong desire to learn. 
              We are looking for emerging leaders who are driven, adaptable, and ready to build their legacy with us. 
              We are looking for candidates who demonstrate:
            </p>

            {/* Essential Skills */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Essential Skills:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Currently completing or have recently completed (within the last two years) a Bachelor's or Master's degree in Civil Engineering, Environmental Engineering or Surveying</li>
                <li>Excellent analytical and problem-solving skills with high attention to detail.</li>
                <li>Strong written, verbal, and presentation skills</li>
                <li>Proactive approach to take initiative and manage your time effectively on independent tasks, while thriving in a collaborative team environment.</li>
                <li>A passion for engineering and an eagerness to embrace new challenges, actively seek feedback, and learn from industry leaders.</li>
              </ul>
            </div>

            {/* Desirable Attributes */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Desirable Attributes:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Previous internship or work experience is highly valued but not essential.</li>
                <li>Proficiency in 3D modelling software and the Microsoft Office Suite.</li>
                <li>A strong academic record is preferred.</li>
              </ul>
            </div>
          </section>

          {/* Why Join COSVEC */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Join COSVEC?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We invest in our people. When you join our program, you'll receive:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">A Structured Development Program:</h3>
                <p className="text-gray-700 ml-4">A clear pathway for career progression, supported by mentorship from senior leaders.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">A Great Culture:</h3>
                <p className="text-gray-700 ml-4">A diverse, inclusive, and social workplace. We have active social clubs, sports teams, and regular company events that celebrate our successes.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Health & Wellbeing:</h3>
                <p className="text-gray-700 ml-4">A focus on your wellbeing with flexible work arrangements, an annual wellbeing allowance, and an employee assistance program.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Competitive Package:</h3>
                <p className="text-gray-700 ml-4">A competitive graduate salary, annual reviews, and access to a range of employee benefits.</p>
              </div>
            </div>
          </section>

          {/* How to Apply */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Apply</h2>
            <p className="text-gray-700 font-semibold mb-4">Ready to build your legacy?</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              To be considered, please click "Apply Now" and submit your application, including your:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-6">
              <li>Resume</li>
              <li>Cover Letter</li>
              <li>Academic Transcript</li>
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold">
                Applications close: Friday, 4th July 2025 at 5:00 PM AEST.
              </p>
            </div>
          </section>

          {/* Footer Information */}
          <section className="border-t border-gray-200 pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-blue-800 text-sm leading-relaxed">
                COSVEC is an equal opportunity employer and is committed to creating a diverse and inclusive workforce. 
                We encourage applications from all backgrounds. International Students are encouraged to apply.
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Questions?</h3>
              <p className="text-gray-700">
                Please email our Talent Acquisition Team at{' '}
                <a 
                  href="mailto:earlycareers@cosvec.com" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  earlycareers@cosvec.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default JobDescription; 