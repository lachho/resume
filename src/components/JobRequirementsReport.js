import React, { useState } from 'react';

const JobRequirementsReport = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState({
    academics: false,
    hardSkills: false,
    softSkills: false,
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
        <h3 className="text-xl font-bold text-gray-800 mb-4">Job Requirements Match</h3>
        <p className="text-gray-600">No job requirements data available.</p>
      </div>
    );
  }

  const { matches, recommendations, summary } = data;

  // Helper function to get score colour
  const getScoreColour = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 65) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Helper function to get score emoji
  const getScoreEmoji = (score) => {
    if (score >= 80) return '✅';
    if (score >= 65) return '🟡';
    if (score >= 50) return '⚠️';
    return '❌';
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      
      {/* Academic Requirements Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h4 className="font-semibold text-purple-800 mb-3 text-sm flex items-center">
          🎓 Academic Requirements 
          <span className={`ml-2 ${getScoreColour(matches.academics.score)}`}>
            {getScoreEmoji(matches.academics.score)} {Math.round(matches.academics.score)}%
          </span>
        </h4>
        
        {matches.academics.found.length > 0 && (
          <div className="mb-3">
            <h5 className="text-xs font-medium text-green-700 mb-1">Found ({matches.academics.found.length})</h5>
            <div className="flex flex-wrap gap-1">
              {matches.academics.found.map((item, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {matches.academics.missing.length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-gray-600 mb-1">Not Found ({matches.academics.missing.length})</h5>
            <div className="flex flex-wrap gap-1">
              {(expandedSections.academics ? matches.academics.missing : matches.academics.missing.slice(0, 4)).map((item, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {item}
                </span>
              ))}
            </div>
            {matches.academics.missing.length > 4 && (
              <button
                onClick={() => toggleSection('academics')}
                className="mt-2 text-xs text-purple-600 hover:text-purple-800 underline"
              >
                {expandedSections.academics 
                  ? 'Show Less' 
                  : `Show ${matches.academics.missing.length - 4} More`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hard Skills Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h4 className="font-semibold text-blue-800 mb-3 text-sm flex items-center">
          ⚙️ Technical Skills 
          <span className={`ml-2 ${getScoreColour(matches.hardSkills.score)}`}>
            {getScoreEmoji(matches.hardSkills.score)} {Math.round(matches.hardSkills.score)}%
          </span>
        </h4>
        
        {matches.hardSkills.found.length > 0 && (
          <div className="mb-3">
            <h5 className="text-xs font-medium text-green-700 mb-1">Found ({matches.hardSkills.found.length})</h5>
            <div className="flex flex-wrap gap-1">
              {(expandedSections.hardSkills ? matches.hardSkills.found : matches.hardSkills.found.slice(0, 8)).map((item, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {item}
                </span>
              ))}
            </div>
            {matches.hardSkills.found.length > 8 && (
              <button
                onClick={() => toggleSection('hardSkills')}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
              >
                {expandedSections.hardSkills 
                  ? 'Show Less Found' 
                  : `Show ${matches.hardSkills.found.length - 8} More Found`}
              </button>
            )}
          </div>
        )}
        
        {matches.hardSkills.missing.length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-gray-600 mb-1">High Priority Missing</h5>
            <div className="flex flex-wrap gap-1">
              {matches.hardSkills.missing.slice(0, 6).map((item, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Soft Skills Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h4 className="font-semibold text-green-800 mb-3 text-sm flex items-center">
          💡 Professional Skills 
          <span className={`ml-2 ${getScoreColour(matches.softSkills.score)}`}>
            {getScoreEmoji(matches.softSkills.score)} {Math.round(matches.softSkills.score)}%
          </span>
        </h4>
        
        {matches.softSkills.found.length > 0 && (
          <div className="mb-3">
            <h5 className="text-xs font-medium text-green-700 mb-1">Found ({matches.softSkills.found.length})</h5>
            <div className="flex flex-wrap gap-1">
              {matches.softSkills.found.map((item, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {matches.softSkills.missing.length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-gray-600 mb-1">Missing ({matches.softSkills.missing.length})</h5>
            <div className="flex flex-wrap gap-1">
              {(expandedSections.softSkills ? matches.softSkills.missing : matches.softSkills.missing.slice(0, 6)).map((item, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {item}
                </span>
              ))}
            </div>
            {matches.softSkills.missing.length > 6 && (
              <button
                onClick={() => toggleSection('softSkills')}
                className="mt-2 text-xs text-green-600 hover:text-green-800 underline"
              >
                {expandedSections.softSkills 
                  ? 'Show Less' 
                  : `Show ${matches.softSkills.missing.length - 6} More`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3 text-sm">📊 Match Summary</h4>
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-3xl font-light text-blue-600 mb-1">
              {summary.matchPercentage}<span className="text-lg">%</span>
            </div>
            <p className="text-xs text-gray-600">Overall Match Rate</p>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Requirements:</span>
              <span className="font-medium">{summary.totalRequirements}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Matches:</span>
              <span className="font-medium text-green-600">{summary.totalMatches}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Gaps:</span>
              <span className="font-medium text-red-600">{summary.totalRequirements - summary.totalMatches}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Card */}
      {recommendations && recommendations.length > 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm md:col-span-2">
          <h4 className="font-semibold text-orange-800 mb-3 text-sm">💼 Career Recommendations</h4>
          <div>
            <ul className="space-y-2">
              {(expandedSections.recommendations ? recommendations : recommendations.slice(0, 4)).map((rec, index) => (
                <li key={index} className="text-orange-800 text-sm flex items-start">
                  <span className="text-orange-600 mr-2 mt-0.5">•</span>
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

export default JobRequirementsReport; 