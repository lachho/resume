import React, { useState } from 'react';
import { generateHTMLReport, copyHTMLToClipboard } from '../utils/exportUtils';

const ExportButtons = ({ results }) => {
  const [copyStatus, setCopyStatus] = useState('');

  const handleHTMLExport = async () => {
    try {
      const html = generateHTMLReport(results);
      const success = await copyHTMLToClipboard(html);
      
      if (success) {
        setCopyStatus('Copied to clipboard! Ready to paste into emails or documents.');
        setTimeout(() => setCopyStatus(''), 3000);
      } else {
        setCopyStatus('Failed to copy. Please try again.');
        setTimeout(() => setCopyStatus(''), 3000);
      }
    } catch (error) {
      console.error('HTML export failed:', error);
      setCopyStatus('Export failed. Please try again.');
      setTimeout(() => setCopyStatus(''), 3000);
    }
  };

  return (
    <div className="mt-8 text-center">
      <div className="inline-flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-700">Export Your Analysis</h3>
        
        <button
          onClick={handleHTMLExport}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Formatted Report
        </button>
        
        {copyStatus && (
          <p className={`text-sm ${copyStatus.includes('Failed') || copyStatus.includes('failed') ? 'text-red-600' : 'text-green-600'} max-w-md`}>
            {copyStatus}
          </p>
        )}
        
        <p className="text-sm text-gray-500 max-w-md">
          Perfect for pasting into email drafts, documents, or sharing with recruiters. 
          Includes all analysis details with professional formatting.
        </p>
      </div>
    </div>
  );
};

export default ExportButtons; 