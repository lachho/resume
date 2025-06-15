import React, { useState } from 'react';

const SectionsReport = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState({
    hardSkills: false,
    softSkills: false,
    keyPhrases: false,
    education: false,
    recommendations: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!data) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Extracted Sections</h3>
        <p className="text-gray-600">No sections data available.</p>
      </div>
    );
  }

  const { contactInfo, skills, keyPhrases, education, sections, recommendations } = data;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      
      {/* Contact Information Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
        <div className="space-y-3">
          {contactInfo.email ? (
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span className="font-medium text-sm">Email:</span>
              <span className="ml-2 text-gray-700 text-sm truncate">{contactInfo.email}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-red-500 mr-2">✗</span>
              <span className="text-gray-600 text-sm">No email found</span>
            </div>
          )}
          
          {contactInfo.phone ? (
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span className="font-medium text-sm">Phone:</span>
              <span className="ml-2 text-gray-700 text-sm">{contactInfo.phone}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-red-500 mr-2">✗</span>
              <span className="text-gray-600 text-sm">No phone number found</span>
            </div>
          )}
          
          {contactInfo.urls && contactInfo.urls.length > 0 ? (
            <div className="flex items-start">
              <span className="text-green-600 mr-2 mt-0.5">✓</span>
              <div className="flex-1">
                <span className="font-medium text-sm">Professional URLs:</span>
                <ul className="mt-1 space-y-1">
                  {contactInfo.urls.map((url, index) => (
                    <li key={index} className="text-blue-600 underline text-xs break-all">
                      {url}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-red-500 mr-2">✗</span>
              <span className="text-gray-600 text-sm">No LinkedIn/professional URLs found</span>
            </div>
          )}
        </div>
      </div>

      {/* Skills Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Skills Identified</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2 text-sm">Technical Skills ({skills.hard.length})</h4>
            {skills.hard.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-1">
                  {(expandedSections.hardSkills ? skills.hard : skills.hard.slice(0, 8)).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                {skills.hard.length > 8 && (
                  <button
                    onClick={() => toggleSection('hardSkills')}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    {expandedSections.hardSkills 
                      ? 'Show Less' 
                      : `Show ${skills.hard.length - 8} More`}
                  </button>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No technical skills detected</p>
            )}
          </div>
          
          <div>
            <h4 className="font-semibold text-green-800 mb-2 text-sm">Soft Skills ({skills.soft.length})</h4>
            {skills.soft.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-1">
                  {(expandedSections.softSkills ? skills.soft : skills.soft.slice(0, 8)).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                {skills.soft.length > 8 && (
                  <button
                    onClick={() => toggleSection('softSkills')}
                    className="mt-2 text-xs text-green-600 hover:text-green-800 underline"
                  >
                    {expandedSections.softSkills 
                      ? 'Show Less' 
                      : `Show ${skills.soft.length - 8} More`}
                  </button>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No soft skills detected</p>
            )}
          </div>
        </div>
      </div>

      {/* Section Detection Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Section Detection</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(sections).map(([section, found]) => (
            <div key={section} className="flex items-center text-sm">
              <span className={`mr-2 ${found ? 'text-green-600' : 'text-red-500'}`}>
                {found ? '✓' : '✗'}
              </span>
              <span className="capitalize">
                {section.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Phrases Card */}
      {keyPhrases && keyPhrases.length > 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Key Phrases ({keyPhrases.length})</h3>
          <div>
            <div className="flex flex-wrap gap-1">
              {(expandedSections.keyPhrases ? keyPhrases : keyPhrases.slice(0, 12)).map((phrase, index) => (
                <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                  {phrase}
                </span>
              ))}
            </div>
            {keyPhrases.length > 12 && (
              <button
                onClick={() => toggleSection('keyPhrases')}
                className="mt-2 text-xs text-yellow-600 hover:text-yellow-800 underline"
              >
                {expandedSections.keyPhrases 
                  ? 'Show Less' 
                  : `Show ${keyPhrases.length - 12} More`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Education Card */}
      {education && education.length > 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Education ({education.length})</h3>
          <div>
            <ul className="space-y-2">
              {(expandedSections.education ? education : education.slice(0, 4)).map((edu, index) => (
                <li key={index} className="text-purple-800 text-sm flex items-start">
                  <span className="text-purple-600 mr-2 mt-0.5">•</span>
                  <span className="flex-1">{edu}</span>
                </li>
              ))}
            </ul>
            {education.length > 4 && (
              <button
                onClick={() => toggleSection('education')}
                className="mt-2 text-xs text-purple-600 hover:text-purple-800 underline"
              >
                {expandedSections.education 
                  ? 'Show Less' 
                  : `Show ${education.length - 4} More`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Recommendations Card */}
      {recommendations && recommendations.length > 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recommendations</h3>
          <div>
            <ul className="space-y-2">
              {(expandedSections.recommendations ? recommendations : recommendations.slice(0, 4)).map((rec, index) => (
                <li key={index} className="text-orange-800 text-sm flex items-start">
                  <span className="text-orange-600 mr-2 mt-0.5">💡</span>
                  <span className="flex-1">{rec}</span>
                </li>
              ))}
            </ul>
            {recommendations.length > 4 && (
              <button
                onClick={() => toggleSection('recommendations')}
                className="mt-2 text-xs text-orange-600 hover:text-orange-800 underline"
              >
                {expandedSections.recommendations 
                  ? 'Show Less' 
                  : `Show ${recommendations.length - 4} More`}
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default SectionsReport; 