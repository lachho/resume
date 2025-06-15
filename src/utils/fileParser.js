import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import mammoth from 'mammoth';

// Set up the PDF.js worker - use relative path for GitHub Pages compatibility
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL || ''}/pdf.worker.mjs`;

/**
 * Parses a file and returns the extracted text and analysis of its structure.
 * @param {File} file The file to parse.
 * @returns {Promise<{text: string, hasImages: boolean, hasColumns: boolean, pageCount: number | null}>} The extracted text and structural analysis.
 */
export const parseFile = async (file) => {
  const fileType = file.type;
  const fileName = file.name;

  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const pdf = await pdfjsLib.getDocument({ data: event.target.result }).promise;
          let text = '';
          let hasImages = false;
          const pageCount = pdf.numPages;

          for (let i = 1; i <= pageCount; i++) {
            const page = await pdf.getPage(i);

            // Check for images (but don't break text extraction)
            if (!hasImages) {
              try {
                const operatorList = await page.getOperatorList();
                // Check for common image-related operators
                const imageOperators = ['paintImageXObject', 'paintInlineImageXObject', 'paintImageMaskXObject'];
                
                for (let j = 0; j < operatorList.fnArray.length; j++) {
                  const opName = Object.keys(pdfjsLib.OPS).find(key => pdfjsLib.OPS[key] === operatorList.fnArray[j]);
                  if (opName && imageOperators.includes(opName)) {
                    hasImages = true;
                    break;
                  }
                }
              } catch (imageError) {
                console.warn('Could not check for images on page', i, ':', imageError);
                // Continue processing without image detection
              }
            }

            // ALWAYS extract text content regardless of image detection
            try {
              const content = await page.getTextContent();
              
              // Preserve raw text structure - group by lines but keep original spacing
              const lines = {};
              content.items.forEach(item => {
                const y = Math.round(item.transform[5]); // y-coordinate
                if (!lines[y]) lines[y] = [];
                lines[y].push(item);
              });

              // Sort lines by y-coordinate (top to bottom) and preserve raw text
              const sortedYCoords = Object.keys(lines).sort((a, b) => b - a); // Descending order (top to bottom)
              for (const y of sortedYCoords) {
                const lineItems = lines[y].sort((a, b) => a.transform[4] - b.transform[4]); // Sort by x-coordinate (left to right)
                // Keep the raw text including spaces and special characters
                const lineText = lineItems.map(item => item.str).join('');
                if (lineText.trim()) {
                  text += lineText + '\n';
                }
              }
            } catch (textError) {
              console.warn('Could not extract text from page', i, ':', textError);
              // Continue to next page
            }
          }

          // Ensure we return something even if text extraction had issues
          if (!text.trim()) {
            console.warn('No text could be extracted from PDF');
          }

          resolve({ text, hasImages, hasColumns: false, pageCount });
        } catch (error) {
          console.error('Error parsing PDF:', error);
          reject('Error parsing PDF file. The PDF may be corrupted or password-protected.');
        }
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        reject('Error reading file. Please try again.');
      };
      reader.readAsArrayBuffer(file);
    });
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          // Use extractRawText to preserve the actual document structure
          const result = await mammoth.extractRawText({ arrayBuffer: event.target.result });
          resolve({ text: result.value, hasImages: false, hasColumns: false, pageCount: null });
        } catch (error) {
          console.error('Error parsing DOCX:', error);
          reject('Error parsing DOCX file. The document may be corrupted.');
        }
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        reject('Error reading file. Please try again.');
      };
      reader.readAsArrayBuffer(file);
    });
  } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve({ text: event.target.result, hasImages: false, hasColumns: false, pageCount: null });
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        reject('Error reading file. Please try again.');
      };
      reader.readAsText(file);
    });
  } else {
    return Promise.reject('Unsupported file type. Please upload a .pdf, .docx, or .txt file.');
  }
}; 