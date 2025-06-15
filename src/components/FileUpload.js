import React from 'react';

const FileUpload = ({ onFileSelect, disabled }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
        <label
            htmlFor="file-upload"
            className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${disabled ? 'border-gray-300' : 'border-blue-500'}`}
        >
            <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h1.586A3 3 0 0113.414 4H17a4 4 0 014 4v5a4 4 0 01-4 4H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v6m0 0l-3-3m3 3l3-3"></path></svg>
                <p className="mt-2 text-lg font-semibold text-gray-600">
                    Drag and drop your resume here
                </p>
                <p className="mt-1 text-sm text-gray-500">or click to browse</p>
                <p className="mt-4 text-xs text-gray-400">Supports: .pdf, .docx, .txt</p>
            </div>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                disabled={disabled}
            />
        </label>
    </div>
  );
};

export default FileUpload; 