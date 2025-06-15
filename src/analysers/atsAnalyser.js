/**
 * Analyses the resume text for ATS compatibility.
 * @param {{text: string, hasImages: boolean, hasColumns: boolean, pageCount: number | null}} parsingResult The result from the file parser.
 * @returns {object} An ATS analysis object with a score and recommendations.
 */

// Helper function to generate ATS summary message based on score and key factors
const generateATSSummary = (score, hasImages, wordCount, bulletPoints) => {
  if (score >= 80) {
    return '✅ Excellent ATS compatibility - your resume should parse well';
  } else if (score >= 70) {
    return '🟡 Good ATS compatibility with minor improvements needed';
  } else if (score >= 55) {
    return '⚠️ Fair ATS compatibility - several issues need attention';
  } else {
    return '❌ Poor ATS compatibility - major formatting changes required';
  }
};

export const analyseATS = (parsingResult) => {
  const { text, hasImages, pageCount } = parsingResult;
  let score = 100;
  const recommendations = [];
  

  // Check if very little text was extracted
  if (text.length < 50) {
    recommendations.push("Very little text extracted - possible parsing problems");
    score -= 30;
  }

  const lines = text.split('\n').filter(line => line.trim() !== '');

  // 1. Word Count Check (Updated)
  const words = text.match(/\b\w+\b/g) || [];
  const wordCount = words.length;
  
  if (wordCount > 800) {
    score -= 20;
    recommendations.push(`Resume too long (${wordCount} words) - ideal range is 300-600 words`);
  } else if (wordCount > 700) {
    score -= 10;
    recommendations.push(`Resume slightly long (${wordCount} words) - consider condensing`);
  } else if (wordCount < 200) {
    score -= 20;
    recommendations.push(`Resume too short (${wordCount} words) - add more relevant details`);
  } else if (wordCount >= 300 && wordCount <= 600) {
    // Good range - no penalty, add positive feedback
    recommendations.push(`Good word count (${wordCount} words)`);
  }

  // 2. Image Check
  if (hasImages) {
    score -= 20;
    recommendations.push("An image was detected in your resume. It's best to remove all images, logos, and photos as they can't be read by ATS.");
  }

  // 3. Page Count Check
  if (pageCount && pageCount > 2) {
    score -= 10;
    recommendations.push(`Your resume is ${pageCount} pages long. Aim for a 1-2 page resume for most job applications.`);
  }

  // 4. Sentence Length Analysis
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 10);
  let overlyLongSentences = 0;
  
  sentences.forEach(sentence => {
    const words = sentence.trim().split(/\s+/);
    if (words.length > 25) {
      overlyLongSentences++;
    }
  });

  if (overlyLongSentences > 0) {
    score -= 10;
    recommendations.push("Break down overly long sentences for better readability and ATS parsing.");
  }

  // 5. Line Structure Check
  const longLines = lines.filter(line => line.length > 100 && !/^\s*[•·▪▫◦‣⁃\-*+]\s+/.test(line));
  if (longLines.length > 0) {
    score -= 10;
    recommendations.push("Long and wordy lines are hard to read. Use punchy bullet points to describe achievements, especially in your executive summary.");
  }

  // 6. Bullet Point Check (Updated)
  const bulletPatterns = [
    /^[•·▪▫◦‣⁃]\s*/,     // Common bullet symbols, space is optional
    /^[-*+]\s*/,          // Dash/asterisk/plus bullets, space is optional
    /^\d+\.\s*/,          // Numbered lists (1.), space is optional
    /^[a-zA-Z]\.\s*/,     // Lettered lists (a.), space is optional
    /^-\s+\w/,            // Dash followed by space and word
    /^\*\s+\w/,           // Asterisk followed by space and word
    /^•\s+\w/,            // Bullet followed by space and word
  ];
  
  // Debug: Log some lines to see what we're working with
  console.log('Sample lines for bullet detection:', lines.slice(0, 10));
  
  // Sanitize each line with .trim() before you test it
  const bulletPoints = lines.filter(line => {
    const trimmedLine = line.trim(); // <-- This is the crucial change
    if (trimmedLine.length === 0) return false; // Ignore empty lines
    
    return bulletPatterns.some(pattern => pattern.test(trimmedLine));
  });
  
  if (bulletPoints.length < 3) {
    score -= 10;
    recommendations.push("Your resume has very few bullet points. Using them makes your accomplishments easier to read for both recruiters and ATS.");
  }

  // 7. Special Characters Check (Updated)
  const problematicSpecialChars = new Set('©®™§¶†‡•‰‱′″‴‵‶‷‸‹›«»¡¿¦¨ª¯°±²³¹¼½¾×÷');
  const specialCharRatio = text.length > 0 ? 
    [...text].filter(char => problematicSpecialChars.has(char)).length / text.length : 0;
    
  if (specialCharRatio > 0.2) {
    score -= 15;
    recommendations.push("High ratio of special characters detected - this may indicate formatting issues that could confuse ATS systems.");
  }

  // Ensure score doesn't go below a minimum
  if (score < 0) {
    score = 0;
  }

  // Static recommendations for formatting
  recommendations.push(
    "Use a single-column layout to ensure ATS compatibility. Multi-column layouts can confuse parsers.",
    "Avoid using tables in your resume. They can cause parsing errors with many ATS systems.",
    "Save as PDF to preserve formatting while maintaining text readability by humans and ATS systems.",
  );

  // Helper function to get emoji based on metric value
  const getWordCountEmoji = (count) => {
    if (count >= 300 && count <= 700) return '✅';
    if (count >= 200 && count < 300) return '⚠️';
    if (count > 700 && count <= 1000) return '⚠️';
    return '❌';
  };

  const getPageCountEmoji = (pageCount) => {
    if (pageCount === 1 || pageCount === 2) return '✅';
    if (pageCount === 3) return '⚠️';
    return '❌';
  };

  const getImagesEmoji = (hasImages) => {
    return hasImages ? '❌' : '✅';
  };

  const getBulletPointsEmoji = (count) => {
    if (count >= 10) return '✅';
    if (count < 10 && count >= 5) return '⚠️';
    return '❌';
  };

  const getLongSentencesEmoji = (count) => {
    if (count === 0) return '✅';
    if (count <= 5) return '⚠️';
    return '❌';
  };

  const getSpecialCharactersEmoji = (percentage) => {
    if (percentage <= 5) return '✅';
    if (percentage <= 10) return '⚠️';
    return '❌';
  };

  const getLongLinesEmoji = (count) => {
    if (count === 0) return '✅';
    if (count <= 5) return '⚠️';
    return '❌';
  };

  return {
    score,
    recommendations,
    details: {
      wordCount: `${getWordCountEmoji(wordCount)} ${wordCount} words`,
      pageCount: `${getPageCountEmoji(pageCount || 0)} ${pageCount ? `${pageCount} page(s) detected` : "Could not determine page count"}`,
      images: `${getImagesEmoji(hasImages)} ${hasImages ? "Images detected" : "No images detected"}`,
      bulletPoints: `${getBulletPointsEmoji(bulletPoints.length)} ${bulletPoints.length} bullet points found`,
      longSentences: `${getLongSentencesEmoji(overlyLongSentences)} ${overlyLongSentences} long sentences found`,
      specialCharacters: `${getSpecialCharactersEmoji(Math.round(specialCharRatio * 100))} ${Math.round(specialCharRatio * 100)}% special characters`,
      longLines: `${getLongLinesEmoji(longLines.length)} ${longLines.length} long lines found`,
    },
    message: generateATSSummary(score, hasImages, wordCount, bulletPoints.length)
  };
}; 