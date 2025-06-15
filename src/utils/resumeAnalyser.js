// Note: 'analyser' is Australian English spelling.

import { analyseATS } from '../analysers/atsAnalyser';
import { analyseContent } from '../analysers/contentAnalyser';
import { parseSections } from '../analysers/sectionsParser';
import { generateOverallScore } from '../analysers/scoreGenerator';

/**
 * Orchestrates the entire resume analysis process.
 * @param {{text: string, hasImages: boolean, hasColumns: boolean}} parsingResult The result from the file parser.
 * @returns {Promise<object>} An object containing all analysis results.
 */
export const analyseResume = async (parsingResult) => {
  // Simulate analysis delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const atsResult = analyseATS(parsingResult);
      const contentResult = analyseContent(parsingResult.text);
      const sectionsResult = parseSections(parsingResult.text);

      const allResults = {
        ats: atsResult,
        content: contentResult,
        sections: sectionsResult,
        originalText: parsingResult.text  // Add originalText for job requirements analysis
      };

      const overallScore = generateOverallScore(allResults);
      allResults.overall = overallScore;

      resolve(allResults);
    }, 1000);
  });
}; 