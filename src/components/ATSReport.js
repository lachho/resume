import React from 'react';

const ATSReport = ({ data }) => {
  if (!data || !data.details) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <p className="text-gray-500 text-sm">Could not read the resume for this section. This may indicate it is not well-optimised for ATS.</p>
      </div>
    );
  }

  const { details, recommendations } = data;

  const metrics = [
    { label: 'Word Count', value: details.wordCount },
    { label: 'Page Count', value: details.pageCount },
    { label: 'Images', value: details.images },
    { label: 'Bullet Points', value: details.bulletPoints },
    { label: 'Long Sentences', value: details.longSentences },
    { label: 'Special Characters', value: details.specialCharacters },
    { label: 'Long Lines', value: details.longLines }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Key Metrics Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h4 className="font-semibold text-sm text-gray-800 mb-3">📊 Key Metrics</h4>
        <div className="space-y-2">
          {metrics.map(({ label, value }, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">{label}:</span>
              <span className="text-sm text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h4 className="font-semibold text-sm text-gray-800 mb-3">📋 Recommendations</h4>
        <div className="space-y-2">
          {recommendations.map((rec, index) => (
            <p key={index} className="text-sm text-gray-700">
              • {rec}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ATSReport; 