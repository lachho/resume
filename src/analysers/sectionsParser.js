// eslint-disable-next-line no-unused-vars
import { 
  CIVIL_ENGINEERING_SKILLS, 
  SOFT_SKILLS, 
  DEGREE_KEYWORDS, 
  SECTION_HEADERS
} from '../utils/keywords.js';

/**
 * Parses resume text to extract key sections and information.
 * @param {string} text The resume text.
 * @returns {object} An object containing extracted sections and analysis.
 */
export const parseSections = (text) => {
  console.log('Parsing sections...');
  
  if (!text || typeof text !== 'string') {
    return {
      contactInfo: { email: null, phone: null, urls: [] },
      skills: { hard: [], soft: [] },
      keyPhrases: [],
      education: [],
      sections: {},
      recommendations: []
    };
  }

  const lowerText = text.toLowerCase();
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  return {
    contactInfo: extractContactInfo(text),
    skills: extractSkills(lowerText, text),
    keyPhrases: extractKeyPhrases(text),
    education: extractEducation(lines, lowerText),
    sections: identifySections(lines, lowerText),
    recommendations: generateRecommendations(text, lowerText, lines)
  };
};

/**
 * Extracts contact information from resume text.
 * @param {string} text The resume text.
 * @returns {object} Contact information including email, phone, and URLs.
 */
const extractContactInfo = (text) => {
  const emailRegex = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/gi;
  const phoneRegex = /\b(?:\+?61|0)[2-47-8](?:[ -]?[0-9]){8}\b/g;
  const urlRegex = /\b(?<!@)(?:https?:\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+(?:com|org|net|dev|io|app|ai|me|xyz|au|ca|uk|nz)\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  const emails = [...text.matchAll(emailRegex)].map(match => match[0]);
  const phones = [...text.matchAll(phoneRegex)].map(match => match[0]);
  const urls = [...text.matchAll(urlRegex)].map(match => match[0]);

  return {
    email: emails.length > 0 ? emails[0] : null,
    phone: phones.length > 0 ? phones[0] : null,
    urls: urls
  };
};

/**
 * Extracts hard and soft skills from resume text.
 * @param {string} lowerText The lowercase resume text.
 * @param {string} originalText The original resume text.
 * @returns {object} Object containing arrays of hard and soft skills found.
 */
const extractSkills = (lowerText, originalText) => {
  const hardSkills = [];
  const softSkills = [];

  // Extract hard skills (civil engineering skills)
  Object.entries(CIVIL_ENGINEERING_SKILLS).forEach(([skillCategory, skillVariants]) => {
    skillVariants.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        if (!hardSkills.some(existing => existing.toLowerCase() === skillCategory.toLowerCase())) {
          hardSkills.push(skillCategory);
        }
      }
    });
  });

  // Extract soft skills
  Object.entries(SOFT_SKILLS).forEach(([skillCategory, skillVariants]) => {
    skillVariants.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        if (!softSkills.some(existing => existing.toLowerCase() === skillCategory.toLowerCase())) {
          softSkills.push(skillCategory);
        }
      }
    });
  });

  return { hard: hardSkills, soft: softSkills };
};

/**
 * Extracts key phrases in title case from resume text.
 * @param {string} text The resume text.
 * @returns {array} Array of key phrases found.
 */
const extractKeyPhrases = (text) => {
  const keyPhrases = [];
  const lines = text.split('\n');
  
  // Joining words that can be lowercase in title case phrases
  const joiningWords = ['and', 'or', 'of', 'in', 'at', 'for', 'with', 'by', 'to', 'the', 'a', 'an'];
  
  lines.forEach(line => {
    // Look for title case phrases (2-6 words)
    const titleCaseRegex = /\b[A-Z][a-z]*(?:\s+(?:[a-z]+|[A-Z][a-z]*)){1,5}\b/g;
    const matches = line.match(titleCaseRegex);
    
    if (matches) {
      matches.forEach(match => {
        const words = match.trim().split(/\s+/);
        
        // Check if it's a valid title case phrase
        const isValidTitleCase = words.every((word, index) => {
          const isJoiningWord = joiningWords.includes(word.toLowerCase());
          const startsWithCapital = /^[A-Z]/.test(word);
          
          // First word must be capitalised, joining words can be lowercase
          if (index === 0) return startsWithCapital;
          return startsWithCapital || isJoiningWord;
        });
        
        // Exclude overly long phrases (more than 6 words) and single words
        if (isValidTitleCase && words.length >= 2 && words.length <= 6) {
          let phrase = match.trim();
          
          // Remove joining words from the end of phrases
          const lastWord = words[words.length - 1];
          if (joiningWords.includes(lastWord.toLowerCase())) {
            const wordsWithoutLastJoining = words.slice(0, -1);
            phrase = wordsWithoutLastJoining.join(' ');
          }
          
          if (!keyPhrases.includes(phrase) && phrase.length > 3 && phrase.split(' ').length >= 1) {
            keyPhrases.push(phrase);
          }
        }
      });
    }
  });
  
  return keyPhrases.slice(0, 50); // Limit to top 50 phrases
};

/**
 * Extracts education information from resume text.
 * @param {array} lines Array of text lines.
 * @param {string} lowerText The lowercase resume text.
 * @returns {array} Array of education entries found.
 */
const extractEducation = (lines, lowerText) => {
  const education = [];
  
  lines.forEach(line => {
    const lowerLine = line.toLowerCase();
    
    // Check if line contains degree keywords
    const hasEducationKeyword = DEGREE_KEYWORDS.some(keyword => 
      lowerLine.includes(keyword.toLowerCase())
    );
    
    if (hasEducationKeyword) {
      // Also check for year patterns (common in education entries)
      const hasYear = /\b(19|20)\d{2}\b/.test(line);
      const hasEducationContext = /\b(university|college|institute|school)\b/i.test(line);
      
      if (hasYear || hasEducationContext || line.trim().length > 10) {
        education.push(line.trim());
      }
    }
  });
  
  return education;
};

/**
 * Identifies different sections in the resume.
 * @param {array} lines Array of text lines.
 * @param {string} lowerText The lowercase resume text.
 * @returns {object} Object containing identified sections.
 */
const identifySections = (lines, lowerText) => {
  const sections = {
    CareerProfile: false,
    experience: false,
    education: false,
    skills: false,
    projects: false,
    certifications: false
  };
  
  // Check for section headers
  Object.entries(SECTION_HEADERS).forEach(([sectionType, headers]) => {
    headers.forEach(header => {
      if (lowerText.includes(header.toLowerCase())) {
        sections[sectionType] = true;
      }
    });
  });
  
  return sections;
};

/**
 * Generates recommendations based on parsed content.
 * @param {string} text The original resume text.
 * @param {string} lowerText The lowercase resume text.
 * @param {array} lines Array of text lines.
 * @returns {array} Array of recommendation strings.
 */
const generateRecommendations = (text, lowerText, lines) => {
  const recommendations = [];
  
  // Check for missing contact information
  const hasEmail = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i.test(text);
  const hasPhone = /\b(?:\+?61|0)[2-47-8](?:[ -]?[0-9]){8}\b/.test(text);
  
  if (!hasEmail) {
    recommendations.push('Consider adding a professional email address to your contact information.');
  }
  
  if (!hasPhone) {
    recommendations.push('Consider adding a phone number to make it easier for employers to contact you.');
  }
  
  // Check for LinkedIn URL
  const hasLinkedIn = /linkedin\.com\/in\//i.test(text);
  if (!hasLinkedIn) {
    recommendations.push('Consider adding your LinkedIn profile URL to enhance your professional presence.');
  }
  
  // Check for skills section
  const hasSkillsSection = SECTION_HEADERS.skills.some(header => 
    lowerText.includes(header.toLowerCase())
  );
  
  if (!hasSkillsSection) {
    recommendations.push('Consider adding a dedicated skills section to highlight your technical competencies.');
  }
  
  // Check for quantified achievements
  const hasNumbers = /\d+%|\d+\s*(years?|months?)|[$]\d+|\d+\s*(people|team|projects?)/i.test(text);
  if (!hasNumbers) {
    recommendations.push('Consider adding quantified achievements (percentages, numbers, timeframes) to demonstrate impact.');
  }
  
  // Check for education section
  const hasEducation = DEGREE_KEYWORDS.some(keyword => 
    lowerText.includes(keyword.toLowerCase())
  );
  
  if (!hasEducation) {
    recommendations.push('Consider adding your educational background to provide context for your qualifications.');
  }
  
  return recommendations;
}; 