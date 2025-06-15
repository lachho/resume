import React, { useState } from 'react';

const ContentQualityReport = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState({
    achievements: false,
    weakLines: false,
    personalPronouns: false,
    strongWithoutMetrics: false,
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
        <h3 className="mb-2 text-xl font-bold text-gray-800">Content Quality</h3>
        <p className="text-gray-500 text-sm">Could not read the resume for this section. This may indicate it is not well-optimised for ATS.</p>
      </div>
    );
  }

  // Return multiple individual cards in a React Fragment
  return (
    <>
      {/* Card 1: Strong Achievement Lines */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h4 className="font-semibold text-green-800 mb-3 text-sm flex items-center">
          ✅ Strong Achievement Lines ({data.totalAchievements})
        </h4>
        {data.totalAchievements > 0 ? (
          <div>
            <div className="space-y-2">
              {(expandedSections.achievements ? data.achievementLines : data.achievementLines.slice(0, 3)).map((item, index) => (
                <div key={index} className="p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-green-800 text-sm font-medium mb-1">"{item.line}"</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-green-600">Strong verbs:</span>
                    {item.strongVerbs.map((verb, i) => (
                      <span key={i} className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded">
                        {verb}
                      </span>
                    ))}
                    <span className="text-xs text-green-600 ml-2">Metrics:</span>
                    {item.metrics.map((metric, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {data.totalAchievements > 3 && (
              <button
                onClick={() => toggleSection('achievements')}
                className="mt-2 text-xs text-green-600 hover:text-green-800 underline"
              >
                {expandedSections.achievements 
                  ? 'Show Less' 
                  : `Show ${data.totalAchievements - 3} More`}
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-600 text-sm italic">No strong achievement lines detected. Consider adding quantifiable results to your accomplishments.</p>
        )}
      </div>

      {/* Card 2: Strong Verbs Without Metrics */}
      {data.totalStrongWithoutMetrics > 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="font-semibold text-yellow-800 mb-3 text-sm flex items-center">
            💡 Good Action Verbs - Consider Adding Metrics ({data.totalStrongWithoutMetrics})
          </h4>
          <div>
            <div className="space-y-2">
              {(expandedSections.strongWithoutMetrics ? data.strongVerbsWithoutMetrics : data.strongVerbsWithoutMetrics.slice(0, 3)).map((item, index) => (
                <div key={index} className="p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-yellow-800 text-sm font-medium mb-1">"{item.line}"</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-yellow-600">Strong verbs:</span>
                    {item.strongVerbs.map((verb, i) => (
                      <span key={i} className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded">
                        {verb}
                      </span>
                    ))}
                    <span 
                      className="text-lg cursor-help" 
                      title="Great action verb! Now add a number or metric to show the result."
                    >
                      💡
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {data.totalStrongWithoutMetrics > 3 && (
              <button
                onClick={() => toggleSection('strongWithoutMetrics')}
                className="mt-2 text-xs text-yellow-600 hover:text-yellow-800 underline"
              >
                {expandedSections.strongWithoutMetrics 
                  ? 'Show Less' 
                  : `Show ${data.totalStrongWithoutMetrics - 3} More`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Card 3: Weak Lines - Areas for Improvement */}
      {data.totalWeakLines > 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="font-semibold text-orange-800 mb-3 text-sm flex items-center">
            ⚠️ Weak Action Verbs - Consider Stronger Alternatives ({data.totalWeakLines})
          </h4>
          <div>
            <div className="space-y-2">
              {(expandedSections.weakLines ? data.weakLines : data.weakLines.slice(0, 3)).map((item, index) => (
                <div key={index} className="p-3 bg-orange-50 rounded border border-orange-200">
                  <p className="text-orange-800 text-sm font-medium mb-1">"{item.line}"</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-orange-600">Weak verbs:</span>
                    {item.weakVerbs.map((verb, i) => (
                      <span key={i} className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">
                        {verb}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {data.totalWeakLines > 3 && (
              <button
                onClick={() => toggleSection('weakLines')}
                className="mt-2 text-xs text-orange-600 hover:text-orange-800 underline"
              >
                {expandedSections.weakLines 
                  ? 'Show Less' 
                  : `Show ${data.totalWeakLines - 3} More`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Card 4: Personal Pronouns */}
      {data.totalPersonalPronouns > 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="font-semibold text-red-800 mb-3 text-sm flex items-center">
            ❌ Personal Pronouns ({data.totalPersonalPronouns})
          </h4>
          <div>
            <div className="space-y-2">
              {(expandedSections.personalPronouns ? data.personalPronounLines : data.personalPronounLines.slice(0, 3)).map((item, index) => (
                <div key={index} className="p-3 bg-red-50 rounded border border-red-200">
                  <p className="text-red-800 text-sm font-medium mb-1">"{item.line}"</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-red-600">Found pronouns:</span>
                    {item.pronouns.map((pronoun, i) => (
                      <span key={i} className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded">
                        {pronoun}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {data.totalPersonalPronouns > 3 && (
              <button
                onClick={() => toggleSection('personalPronouns')}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                {expandedSections.personalPronouns 
                  ? 'Show Less' 
                  : `Show ${data.totalPersonalPronouns - 3} More`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Card 5: Recommendations */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3 text-sm">📋 Recommendations</h4>
        <div>
          <div className="space-y-1">
            {(expandedSections.recommendations ? data.recommendations : data.recommendations.slice(0, 4)).map((rec, index) => (
              <p key={index} className="text-gray-700 text-sm">
                • {rec}
              </p>
            ))}
          </div>
          {data.recommendations.length > 5 && (
            <button
              onClick={() => toggleSection('recommendations')}
              className="mt-2 text-xs text-gray-600 hover:text-gray-800 underline"
            >
              {expandedSections.recommendations 
                ? 'Show Less' 
                : `Show ${data.recommendations.length - 5} More`}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentQualityReport; 