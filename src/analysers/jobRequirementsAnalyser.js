import { JOB_REQUIREMENTS } from '../utils/keywords.js';

/**
 * Analyses how well the resume matches job requirements.
 * @param {string} text The resume text.
 * @returns {object} Job requirements analysis with score and breakdown.
 */
export const analyseJobRequirements = (text) => {
  const lowerText = text.toLowerCase();
  let score = 0;
  const matches = {
    academics: { found: [], missing: [], score: 0 },
    hardSkills: { found: [], missing: [], score: 0 },
    softSkills: { found: [], missing: [], score: 0 }
  };

  // Helper function to generate summary message
  const generateJobMatchSummary = (score) => {
    if (score >= 80) {
      return '✅ Excellent job match - strong alignment with requirements';
    } else if (score >= 65) {
      return '🟡 Good job match with some gaps to address';
    } else if (score >= 50) {
      return '⚠️ Fair job match - several key requirements missing';
    } else {
      return '❌ Poor job match - significant skills gap identified';
    }
  };

  // 1. Check Academic Requirements (20% weight)
  const degreeMatches = [];
  const fieldMatches = [];
  const academicMissing = [];

  JOB_REQUIREMENTS.academics.degrees.forEach(degree => {
    if (lowerText.includes(degree.toLowerCase())) {
      degreeMatches.push(degree);
    } else {
      academicMissing.push(degree);
    }
  });

  JOB_REQUIREMENTS.academics.fields_of_study.forEach(field => {
    if (lowerText.includes(field.toLowerCase())) {
      fieldMatches.push(field);
    } else {
      academicMissing.push(field);
    }
  });

  const academicMatches = [...degreeMatches, ...fieldMatches];
  
  // If there's at least one degree AND one field of study, give 100%
  let academicScore = 0;
  if (degreeMatches.length >= 1 && fieldMatches.length >= 1) {
    academicScore = 100;
  } else if (degreeMatches.length >= 1 || fieldMatches.length >= 1) {
    academicScore = 50; // Partial credit for having either degree or field
  }
  
  matches.academics = { found: academicMatches, missing: academicMissing, score: academicScore };

  // 2. Check Hard Skills (50% weight) - 20 points per match, up to 100%
  const hardSkillMatches = [];
  const hardSkillMissing = [];

  // Check software skills
  JOB_REQUIREMENTS.hard_skills.software.forEach(software => {
    if (lowerText.includes(software.toLowerCase())) {
      hardSkillMatches.push(software);
    } else {
      hardSkillMissing.push(software);
    }
  });

  // Check engineering disciplines
  JOB_REQUIREMENTS.hard_skills.engineering_disciplines.forEach(discipline => {
    if (lowerText.includes(discipline.toLowerCase())) {
      hardSkillMatches.push(discipline);
    } else {
      hardSkillMissing.push(discipline);
    }
  });

  // Check technical tasks
  JOB_REQUIREMENTS.hard_skills.technical_tasks.forEach(task => {
    if (lowerText.includes(task.toLowerCase())) {
      hardSkillMatches.push(task);
    } else {
      hardSkillMissing.push(task);
    }
  });

  // 20 points per technical skill match, up to 100%
  const hardSkillScore = Math.min(100, hardSkillMatches.length * 20);
  matches.hardSkills = { found: hardSkillMatches, missing: hardSkillMissing.slice(0, 10), score: hardSkillScore };

  // 3. Check Soft Skills (30% weight) - 20 points per match, up to 100%
  const softSkillMatches = [];
  const softSkillMissing = [];

  JOB_REQUIREMENTS.hard_matches.forEach(skill => {
    const variants = JOB_REQUIREMENTS.soft_matches[skill] || [skill];
    let found = false;
    
    if (lowerText.includes(skill.toLowerCase())) {
      softSkillMatches.push(skill);
      found = true;
    } else {
      // Check variants
      variants.forEach(variant => {
        if (lowerText.includes(variant.toLowerCase())) {
          softSkillMatches.push(skill);
          found = true;
        }
      });
    }
    
    if (!found) {
      softSkillMissing.push(skill);
    }
  });

  // 20 points per professional skill match, up to 100%
  const softSkillScore = Math.min(100, softSkillMatches.length * 20);
  matches.softSkills = { found: softSkillMatches, missing: softSkillMissing.slice(0, 8), score: softSkillScore };

  // Calculate weighted overall score
  score = Math.round(
    (academicScore * 0.2) + 
    (hardSkillScore * 0.5) + 
    (softSkillScore * 0.3)
  );

  // Generate recommendations based on updated scoring
  const recommendations = [];
  
  if (academicScore < 100) {
    if (degreeMatches.length === 0) {
      recommendations.push("Highlight your degree qualifications more prominently");
    }
    if (fieldMatches.length === 0) {
      recommendations.push("Emphasise your field of study to match job requirements");
    }
  }
  
  if (hardSkillScore < 80) {
    recommendations.push("Add more technical skills and software proficiencies to strengthen your profile");
  }
  
  if (softSkillScore < 80) {
    recommendations.push("Include more examples demonstrating leadership, teamwork, and problem-solving abilities");
  }
  
  if (score >= 80) {
    recommendations.push("Excellent match! Consider applying for this role");
  } else if (score >= 65) {
    recommendations.push("Strong candidate profile - focus on quantifying your achievements");
  } else {
    recommendations.push("Consider upskilling in missing technical areas or gaining relevant experience");
  }

  const totalHardSkills = JOB_REQUIREMENTS.hard_skills.software.length + 
                         JOB_REQUIREMENTS.hard_skills.engineering_disciplines.length + 
                         JOB_REQUIREMENTS.hard_skills.technical_tasks.length;

  return {
    score,
    message: generateJobMatchSummary(score),
    matches,
    recommendations,
    summary: {
      totalRequirements: totalHardSkills + JOB_REQUIREMENTS.hard_matches.length + JOB_REQUIREMENTS.academics.degrees.length + JOB_REQUIREMENTS.academics.fields_of_study.length,
      totalMatches: academicMatches.length + hardSkillMatches.length + softSkillMatches.length,
      matchPercentage: score
    }
  };
}; 