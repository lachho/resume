import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import AnalysisDashboard from './components/AnalysisDashboard';
import JobDescription from './components/JobDescription';
import Footer from './components/Footer';
import ExportButtons from './components/ExportButtons';
import { parseFile } from './utils/fileParser';
import { analyseResume } from './utils/resumeAnalyser';

function MainPage() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) {
      setError('Please select a file.');
      return;
    }
    const file = files[0];

    setIsLoading(true);
    setAnalysisResults(null);
    setError('');

    try {
      const parsingResult = await parseFile(file);
      const results = await analyseResume(parsingResult);
      setAnalysisResults(results);
    } catch (err) {
      console.error("An error occurred:", err);
      const errorMessage = typeof err === 'string' ? err : 'Failed to process the file. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Resume Analyser
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
            Get instant, detailed feedback on your resume to stand out and land your dream job.
          </p>
          
          {/* Analysis Overview */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto text-left">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">🤖 ATS Compatibility</h3>
              <p className="text-sm text-gray-600">Companies use Applicant Tracking System algorithms to parse resumes. Checks how easy your resume is to read by bots.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">✍️ Content Quality</h3>
              <p className="text-sm text-gray-600">Analyses your resume's quality. Looks for strong action verbs, quantifiable achievements, and professional language.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">🎯 Job Requirements</h3>
              <p className="text-sm text-gray-600">Compares your resume against mock a job posting to see how your resume ranks in the algorithm.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">📋 Data Extraction</h3>
              <p className="text-sm text-gray-600">Identifies key information from your resume. This checks how easy ATS can extract data from your resume.</p>
            </div>
          </div>
        </header>

        <main>
          {!analysisResults && !isLoading && (
            <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />
          )}

          {isLoading && (
            <div className="text-center p-8">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600 mx-auto"></div>
              <p className="mt-4 text-lg font-semibold text-gray-700">Analysing your resume...</p>
              <p className="text-gray-500">This might take a moment.</p>
            </div>
          )}

          {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}

          {analysisResults && (
            <div>
              <AnalysisDashboard results={analysisResults} />
              
              {/* Export Buttons */}
              <ExportButtons results={analysisResults} />
              
              <div className="text-center mt-8">
                  <button 
                    onClick={() => {
                      setAnalysisResults(null);
                    }}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Analyse Another Resume
                  </button>
              </div>
            </div>
          )}
        </main>
        
      </div>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/job-description" element={<JobDescription />} />
      </Routes>
    </Router>
  );
}

export default App; 