import React, { useMemo } from 'react';
import ATSReport from './ATSReport';
import ContentQualityReport from './ContentQualityReport';
import SectionsReport from './SectionsReport';
import JobRequirementsReport from './JobRequirementsReport';
import { analyseJobRequirements } from '../analysers/jobRequirementsAnalyser';

const AnalysisDashboard = ({ results }) => {
  // Analyse job requirements when component mounts or results change
  const jobRequirementsData = useMemo(() => {
    if (results && results.originalText) {
      try {
        return analyseJobRequirements(results.originalText);
      } catch (error) {
        console.error('Job requirements analysis failed:', error);
        return null;
      }
    }
    return null;
  }, [results]);

  if (!results) {
    return null;
  }

  const { overall, ats, content, sections } = results;

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">Your Analysis is Ready</h2>
      
      {/* Overall Score Section */}
      <div className="mt-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-6">
            <h3 className="text-2xl font-bold text-gray-800">Overall Score</h3>
            {overall && (
              <>
                <div className="text-4xl font-light text-indigo-600">
                  {overall.finalScore}<span className="text-2xl">/100</span>
                </div>
                <div className="flex-1">
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-indigo-800 font-medium text-sm">
                      {overall.finalScore >= 85 ? '🎉 Outstanding resume! Ready for top-tier applications' :
                       overall.finalScore >= 75 ? '✅ Strong resume with minor optimisation opportunities' :
                       overall.finalScore >= 65 ? '🟡 Good foundation - focus on key improvement areas' :
                       '⚠️ Room for improvement - address critical areas below'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Strengths Card */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h4 className="font-semibold text-green-800 mb-4 text-lg flex items-center">
              ✅ Key Strengths
            </h4>
            <ul className="space-y-2">
              {overall.strengths.map((strength, i) => (
                <li key={i} className="text-green-700 text-sm flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  <span className="flex-1">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Areas for Improvement Card */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h4 className="font-semibold text-orange-800 mb-4 text-lg flex items-center">
              🎯 Priority Improvements
            </h4>
            <ul className="space-y-2">
              {overall.areasForImprovement.map((area, i) => (
                <li key={i} className="text-orange-700 text-sm flex items-start">
                  <span className="text-orange-600 mr-2 mt-0.5">•</span>
                  <span className="flex-1">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ATS Compatibility Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-6">
            <h3 className="text-2xl font-bold text-gray-800">ATS Compatibility</h3>
            {ats && (
              <>
                <div className="text-4xl font-light text-green-600">
                  {ats.score}<span className="text-2xl">/100</span>
                </div>
                <div className="flex-1">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 font-medium text-sm">{ats.message}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <ATSReport data={ats} />
      </div>

      {/* Content Quality Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-6">
            <h3 className="text-2xl font-bold text-gray-800">Content Quality</h3>
            {content && (
              <>
                <div className="text-4xl font-light text-blue-600">
                  {content.score}<span className="text-2xl">/100</span>
                </div>
                <div className="flex-1">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-800 font-medium text-sm">{content.summary}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ContentQualityReport data={content} />
        </div>
      </div>

      {/* Job Requirements Match Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-6">
            <h3 className="text-2xl font-bold text-gray-800">Job Requirements Match</h3>
            {jobRequirementsData && (
              <>
                <div className="text-4xl font-light text-purple-600">
                  {jobRequirementsData.score}<span className="text-2xl">/100</span>
                </div>
                <div className="flex-1">
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-purple-800 font-medium text-sm">{jobRequirementsData.message}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            Your resume was compared against{' '}
            <a 
              href="#/job-description" 
              className="text-purple-600 hover:text-purple-800 underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              this job description
            </a>
            {' '}to assess alignment with typical industry requirements and ATS compatibility.
          </p>
        </div>
        <div className="mb-8">
          <JobRequirementsReport data={jobRequirementsData} />
        </div>
      </div>

      {/* Sections Report */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Extracted Sections</h3>
        <SectionsReport data={sections} />
      </div>
    </div>
  );
};

export default AnalysisDashboard; 