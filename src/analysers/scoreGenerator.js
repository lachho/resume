/**
 * Generates an overall score and feedback based on individual analysis results.
 * @param {object} results The collected results from other analysis functions.
 * @returns {object} A final score and summary.
 */
export const generateOverallScore = (results) => {
  console.log('Generating overall score...');
  
  const { ats, content, sections } = results;
  const strengths = [];
  const areasForImprovement = [];
  
  // Extract scores with fallbacks
  const atsScore = ats?.score || 0;
  const contentScore = content?.score || 0;
  
  // Calculate overall score with weighted components
  // ATS: 40%, Content: 35%, Sections: 25%
  let sectionsScore = 0;
  if (sections) {
    const sectionCount = Object.values(sections.sections || {}).filter(Boolean).length;
    sectionsScore = Math.min(100, (sectionCount / 6) * 100); // 6 main sections expected
  }
  
  const finalScore = Math.round(
    (atsScore * 0.4) + 
    (contentScore * 0.35) + 
    (sectionsScore * 0.25)
  );
  
  // Generate strengths based on high scores
  if (atsScore >= 80) {
    strengths.push('Excellent ATS compatibility - your resume will pass through applicant tracking systems');
  } else if (atsScore >= 65) {
    strengths.push('Good ATS compatibility with minor optimisation opportunities');
  }
  
  if (contentScore >= 80) {
    strengths.push('Strong content quality with effective language and formatting');
  } else if (contentScore >= 65) {
    strengths.push('Good content structure with room for enhancement');
  }
  
  if (sectionsScore >= 80) {
    strengths.push('Comprehensive resume structure with all key sections present');
  }
  
  // Check for specific content strengths
  if (content?.metrics) {
    if (content.metrics.bulletPoints >= 8) {
      strengths.push('Well-structured with effective use of bullet points');
    }
    if (content.metrics.strongActionVerbs >= 5) {
      strengths.push('Strong action verbs demonstrate measurable achievements');
    }
    if (content.metrics.quantifiableResults >= 3) {
      strengths.push('Good use of quantifiable results to showcase impact');
    }
  }
  
  // Generate areas for improvement based on lower scores
  if (atsScore < 70) {
    if (ats?.metrics?.hasImages) {
      areasForImprovement.push('Remove images and graphics to improve ATS compatibility');
    }
    if (ats?.metrics?.wordCount < 300) {
      areasForImprovement.push('Expand content to meet optimal word count (400-600 words)');
    }
    areasForImprovement.push('Optimise formatting and keywords for better ATS performance');
  }
  
  if (contentScore < 70) {
    if (content?.metrics) {
      if (content.metrics.bulletPoints < 6) {
        areasForImprovement.push('Add more bullet points to improve readability and structure');
      }
      if (content.metrics.strongActionVerbs < 5) {
        areasForImprovement.push('Include more strong action verbs to demonstrate achievements');
      }
      if (content.metrics.quantifiableResults < 3) {
        areasForImprovement.push('Add quantifiable results to show measurable impact');
      }
    }
  }
  
  if (sectionsScore < 70) {
    const missingSections = [];
    if (sections?.sections) {
      if (!sections.sections.experience) missingSections.push('work experience');
      if (!sections.sections.education) missingSections.push('education');
      if (!sections.sections.skills) missingSections.push('skills');
      if (!sections.sections.projects) missingSections.push('projects');
    }
    if (missingSections.length > 0) {
      areasForImprovement.push(`Include missing sections: ${missingSections.join(', ')}`);
    }
  }
  
  // Ensure we have at least some feedback
  if (strengths.length === 0) {
    strengths.push('Resume foundation is present and ready for optimisation');
  }
  
  if (areasForImprovement.length === 0) {
    areasForImprovement.push('Continue refining content to maximise impact');
  }
  
  return {
    finalScore,
    strengths,
    areasForImprovement,
  };
}; 