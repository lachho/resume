import { STRONG_ACTION_VERBS, WEAK_ACTION_VERBS } from '../utils/keywords.js';

/**
 * Helper function to check if a word exists in text using exact word boundaries
 * @param {string} text - The text to search in
 * @param {string} word - The word to search for
 * @returns {boolean} - True if exact word match is found
 */
const hasExactWord = (text, word) => {
  const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  return regex.test(text);
};

/**
 * Helper function to find all exact word matches in text
 * @param {string} text - The text to search in
 * @param {Array} words - Array of words to search for
 * @returns {Array} - Array of words that were found
 */
const findExactWords = (text, words) => {
  return words.filter(word => hasExactWord(text, word));
};

/**
 * Analyses the content quality of the resume.
 * @param {string} text The resume text.
 * @returns {object} A comprehensive content quality analysis object.
 */
export const analyseContent = (text) => {
  console.log('Analysing content quality...');
  
  if (!text || text.trim().length === 0) {
    return {
      score: 0,
      achievementLines: [],
      weakLines: [],
      personalPronounLines: [],
      strongVerbsWithoutMetrics: [],
      recommendations: [
        'No content found to analyse. Please ensure your resume text is properly extracted.',
      ],
      totalAchievements: 0,
      totalWeakLines: 0,
      totalPersonalPronouns: 0,
      totalStrongWithoutMetrics: 0
    };
  }

  const lines = text.split('\n').filter(line => line.trim().length > 10);
  
  const achievementLines = [];
  const weakLines = [];
  const personalPronounLines = [];
  const strongVerbsWithoutMetrics = [];
  
  // Personal pronouns to detect
  const personalPronouns = /\b(I|me|my|mine|myself|we|us|our|ours|ourselves)\b/gi;
  
  // Numbers pattern (excluding years 1900-2099)
  const numbersPattern = /\b(?!(?:19|20)\d{2}\b)\d+(?:[.,]\d+)?(?:\s*%|percent|percentage|\s*million|\s*billion|\s*thousand|\s*k\b|\s*m\b|\s*bn\b)?/gi;
  
  lines.forEach((line, index) => {
    // Check for personal pronouns
    const pronounMatches = line.match(personalPronouns);
    if (pronounMatches) {
      personalPronounLines.push({
        line: line.trim(),
        pronouns: pronounMatches,
        lineNumber: index + 1
      });
    }
    
    // Check for strong action verbs using exact word matching
    const foundStrongVerbs = findExactWords(line, STRONG_ACTION_VERBS);
    const hasStrongVerb = foundStrongVerbs.length > 0;
    
    // Check for weak action verbs using exact word matching
    const foundWeakVerbs = findExactWords(line, WEAK_ACTION_VERBS);
    const hasWeakVerb = foundWeakVerbs.length > 0;
    
    // Check for quantifiable results (numbers)
    const hasNumbers = numbersPattern.test(line);
    
    if (hasStrongVerb && hasNumbers) {
      // Strong achievement line
      const numbers = line.match(numbersPattern) || [];
      
      achievementLines.push({
        line: line.trim(),
        strongVerbs: foundStrongVerbs,
        metrics: numbers,
        lineNumber: index + 1
      });
    } else if (hasStrongVerb && !hasNumbers) {
      // Strong verb but no metrics
      strongVerbsWithoutMetrics.push({
        line: line.trim(),
        strongVerbs: foundStrongVerbs,
        lineNumber: index + 1
      });
    } else if (hasWeakVerb) {
      // Weak action verb line
      weakLines.push({
        line: line.trim(),
        weakVerbs: foundWeakVerbs,
        lineNumber: index + 1
      });
    }
  });
  
  // Calculate score based on findings
  let score = 50; // Base score
  
  // Positive scoring
  score += Math.min(achievementLines.length * 8, 30); // Up to 30 points for achievements
  
  // Negative scoring
  score -= Math.min(weakLines.length * 3, 20); // Lose up to 20 points for weak language
  score -= Math.min(personalPronounLines.length * 2, 15); // Lose up to 15 points for personal pronouns
  
  // Bonus for strong verbs (even without metrics)
  score += Math.min(strongVerbsWithoutMetrics.length * 2, 10);
  
  score = Math.max(0, Math.min(100, score));
  
  // Generate recommendations
  const recommendations = [];
  
  if (achievementLines.length === 0) {
    recommendations.push('Add quantifiable achievements with strong action verbs and metrics to showcase your impact.');
  }
  
  if (strongVerbsWithoutMetrics.length > 0) {
    recommendations.push('Great use of strong action verbs! Consider adding numbers or metrics to show results.');
  }
  
  if (weakLines.length > 0) {
    recommendations.push('Replace weak action verbs with stronger alternatives that demonstrate leadership and impact.');
  }
  
  if (personalPronounLines.length > 0) {
    recommendations.push('Remove personal pronouns (I, my, me) - professional resumes use implied first-person voice.');
  }
  
  recommendations.push('Perform a thorough grammar and typo check using tools like Grammarly or similar.');
  recommendations.push('Consider using the STAR method (Situation, Task, Action, Result) or PAR method (Problem, Action, Result) to structure your achievements.');
  
  return {
    score: Math.round(score),
    achievementLines,
    weakLines,
    personalPronounLines,
    strongVerbsWithoutMetrics,
    recommendations,
    totalAchievements: achievementLines.length,
    totalWeakLines: weakLines.length,
    totalPersonalPronouns: personalPronounLines.length,
    totalStrongWithoutMetrics: strongVerbsWithoutMetrics.length,
    summary: generateQualitySummary(score, achievementLines.length, weakLines.length, personalPronounLines.length)
  };
};

/**
 * Generates a quality summary based on the analysis results
 */
const generateQualitySummary = (score, achievements, weakLines, personalPronouns) => {
  if (score >= 80) {
    return '✅ Excellent content quality with strong achievement-oriented language';
  } else if (score >= 65) {
    return '🟡 Good content quality with room for improvement';
  } else if (score >= 50) {
    return '⚠️ Fair content quality - needs significant improvement';
  } else {
    return '❌ Poor content quality - major revision required';
  }
}; 