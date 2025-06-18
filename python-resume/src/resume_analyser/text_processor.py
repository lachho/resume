"""Enhanced text processing utilities for resume content with ATS compatibility analysis."""

import re
import logging
from typing import Tuple, Dict, Any, List

logger = logging.getLogger(__name__)

def clean_text(text: str) -> str:
    """Clean and normalise text content."""
    if not text:
        return ""
    
    # First, collapse multiple newlines into a single one to preserve paragraph breaks
    text = re.sub(r'[\r\n]+', '\n', text)
    
    # Split into individual lines
    lines = text.split('\n')
    cleaned_lines = []
    
    # Process each line to remove extra spaces without destroying the line itself
    for line in lines:
        # Replace multiple spaces/tabs with a single space and strip leading/trailing whitespace
        cleaned_line = re.sub(r'[ \t]+', ' ', line).strip()
        if cleaned_line:
            cleaned_lines.append(cleaned_line)
            
    # Join the cleaned lines back together
    return '\n'.join(cleaned_lines)

def analyse_text_complexity(text: str, parsing_metadata: Dict[str, Any] = None) -> Tuple[int, str]:
    """
    Analyses text for readability and ATS compatibility.
    Returns a score (1-10) and detailed feedback string.
    """
    if not text or len(text.strip()) < 50:
        return 0, "Very little text content found. The file may be mostly images or have parsing issues."
    
    score = 10  # Start with full points
    feedback_parts = []
    detailed_analysis = []
    
    # Parse metadata analysis
    if parsing_metadata:
        # Images analysis - dock points for images (ATS incompatible)
        if parsing_metadata.get('has_images', False):
            image_count = parsing_metadata.get('image_count', 0)
            score -= min(3, image_count)  # Lose 1 point per image, max 3 points
            feedback_parts.append(f"❌ Contains {image_count} image(s) - ATS systems cannot read images")
            detailed_analysis.append(f"Images Detected: {image_count} (ATS Incompatible)")
        
        # Columns analysis - dock points for columns (ATS difficulty)
        if parsing_metadata.get('has_columns', False):
            score -= 2
            feedback_parts.append("❌ Multi-column layout detected - ATS may misread content order")
            detailed_analysis.append("Layout: Multi-column format (ATS Difficulty)")
        
        # Tables analysis
        if parsing_metadata.get('has_tables', False):
            table_count = parsing_metadata.get('table_count', 0)
            if table_count > 2:  # Many tables can be problematic
                score -= 1
                feedback_parts.append(f"⚠️ Multiple tables detected ({table_count}) - may complicate ATS parsing")
        
        # Parsing issues
        if parsing_metadata.get('parsing_issues'):
            score -= len(parsing_metadata['parsing_issues'])
            for issue in parsing_metadata['parsing_issues']:
                feedback_parts.append(f"❌ {issue}")
    
    # Word count analysis
    words = text.split()
    word_count = len(words)
    
    if word_count > 800:  # Too verbose
        score -= 2
        feedback_parts.append(f"❌ Resume too long ({word_count} words) - ideal range is 300-600 words")
        detailed_analysis.append(f"Word Count: {word_count} (Too Long)")
    elif word_count > 700:
        score -= 1
        feedback_parts.append(f"⚠️ Resume slightly long ({word_count} words) - consider condensing")
        detailed_analysis.append(f"Word Count: {word_count} (Slightly Long)")
    elif word_count < 200:
        score -= 2
        feedback_parts.append(f"❌ Resume too short ({word_count} words) - add more relevant details")
        detailed_analysis.append(f"Word Count: {word_count} (Too Short)")
    else:
        detailed_analysis.append(f"Word Count: {word_count} (Good)")
    
    # Career profile/summary analysis
    career_profile_analysis = analyse_career_profile(text)
    if career_profile_analysis['too_long']:
        score -= 1
        feedback_parts.append("❌ Career profile/summary section too wordy - keep to 3-4 lines")
        detailed_analysis.append("Career Profile: Too Long")
    elif career_profile_analysis['found']:
        detailed_analysis.append("Career Profile: Appropriate Length")
    
    # Sentence length analysis
    sentence_analysis = analyse_sentence_complexity(text)
    if sentence_analysis['overly_long_sentences'] > 3:
        score -= 2
        feedback_parts.append(f"❌ {sentence_analysis['overly_long_sentences']} overly long sentences - break into bullet points")
        detailed_analysis.append(f"Sentence Structure: {sentence_analysis['overly_long_sentences']} Long Sentences")
    elif sentence_analysis['overly_long_sentences'] > 0:
        score -= 1
        feedback_parts.append(f"⚠️ {sentence_analysis['overly_long_sentences']} long sentences - consider bullet points")
        detailed_analysis.append(f"Sentence Structure: {sentence_analysis['overly_long_sentences']} Long Sentences")
    else:
        detailed_analysis.append("Sentence Structure: Good")
    
    # Bullet point usage analysis
    bullet_analysis = analyse_bullet_point_usage(text)
    if bullet_analysis['total_bullets'] < 5:
        score -= 1
        feedback_parts.append("❌ Few bullet points detected - use more bullets for better readability")
        detailed_analysis.append(f"Bullet Points: {bullet_analysis['total_bullets']} (Too Few)")
    else:
        detailed_analysis.append(f"Bullet Points: {bullet_analysis['total_bullets']} (Good)")
    
    # Text formatting and special characters
    special_char_analysis = analyse_special_characters(text)
    if special_char_analysis['problematic_ratio'] > 0.1:
        score -= 2
        feedback_parts.append("❌ High ratio of special characters - may indicate formatting issues")
        detailed_analysis.append("Special Characters: High Ratio (Problematic)")
    elif special_char_analysis['problematic_ratio'] > 0.05:
        score -= 1
        feedback_parts.append("⚠️ Moderate special character usage - ensure ATS compatibility")
        detailed_analysis.append("Special Characters: Moderate Ratio")
    else:
        detailed_analysis.append("Special Characters: Low Ratio (Good)")
    
    # Line break analysis
    line_analysis = analyse_line_structure(text)
    if line_analysis['very_long_lines'] > 5:
        score -= 1
        feedback_parts.append("❌ Many lines without proper breaks - use more line breaks for readability")
        detailed_analysis.append(f"Line Structure: {line_analysis['very_long_lines']} Long Lines")
    else:
        detailed_analysis.append("Line Structure: Good")
    
    # Generate comprehensive feedback
    score = max(0, min(10, score))  # Ensure score is between 0 and 10
    
    if score >= 8:
        overall_assessment = "🟢 Excellent ATS compatibility and readability"
    elif score >= 6:
        overall_assessment = "🟡 Good readability with minor ATS compatibility issues"
    elif score >= 4:
        overall_assessment = "🟠 Moderate readability - some significant ATS compatibility concerns"
    else:
        overall_assessment = "🔴 Poor ATS compatibility - major formatting and readability issues"
    
    # Construct detailed feedback
    feedback_message = f"{overall_assessment}\n\n"
    feedback_message += "📊 ANALYSIS BREAKDOWN:\n"
    feedback_message += "\n".join([f"• {analysis}" for analysis in detailed_analysis])
    
    if feedback_parts:
        feedback_message += "\n\n⚠️ ISSUES IDENTIFIED:\n"
        feedback_message += "\n".join([f"• {issue}" for issue in feedback_parts])
    
    # Add recommendations
    recommendations = generate_readability_recommendations(score, word_count, parsing_metadata)
    if recommendations:
        feedback_message += "\n\n💡 RECOMMENDATIONS:\n"
        feedback_message += "\n".join([f"• {rec}" for rec in recommendations])
    
    logger.debug(f"Readability score: {score}/10. Analysis complete.")
    return score, feedback_message

def analyse_career_profile(text: str) -> Dict[str, Any]:
    """Analyse career profile/summary section for length and wordiness."""
    # Look for career profile/summary sections
    profile_patterns = [
        r'(?i)(career\s+(?:profile|summary|objective)|professional\s+summary|executive\s+summary|profile)',
        r'(?i)(summary|objective)'
    ]
    
    analysis = {'found': False, 'too_long': False, 'word_count': 0}
    
    for pattern in profile_patterns:
        match = re.search(pattern + r'[:\n]([^\\n]*(?:\\n[^\\n]*){0,6})', text)
        if match:
            analysis['found'] = True
            profile_text = match.group(1) if len(match.groups()) > 0 else ""
            profile_words = len(profile_text.split())
            analysis['word_count'] = profile_words
            
            # Check if too long (more than 80 words or 4+ lines)
            lines = profile_text.count('\n') + 1
            if profile_words > 80 or lines > 4:
                analysis['too_long'] = True
            break
    
    return analysis

def analyse_sentence_complexity(text: str) -> Dict[str, int]:
    """Analyse sentence length and complexity."""
    # Split into sentences (simple approach)
    sentences = re.split(r'[.!?]+', text)
    
    analysis = {
        'total_sentences': 0,
        'overly_long_sentences': 0,
        'average_length': 0
    }
    
    sentence_lengths = []
    for sentence in sentences:
        sentence = sentence.strip()
        if len(sentence) > 10:  # Filter out very short fragments
            words = len(sentence.split())
            sentence_lengths.append(words)
            
            # Consider 25+ words as overly long
            if words > 25:
                analysis['overly_long_sentences'] += 1
    
    analysis['total_sentences'] = len(sentence_lengths)
    analysis['average_length'] = sum(sentence_lengths) / len(sentence_lengths) if sentence_lengths else 0
    
    return analysis

def analyse_bullet_point_usage(text: str) -> Dict[str, int]:
    """Analyse bullet point usage for better readability."""
    # Common bullet point indicators
    bullet_patterns = [
        r'^\s*[•·▪▫◦‣⁃]\s+',  # Bullet symbols
        r'^\s*[-*+]\s+',        # Dash/asterisk bullets
        r'^\s*\d+\.\s+',        # Numbered lists
        r'^\s*[a-zA-Z]\.\s+',   # Lettered lists
    ]
    
    lines = text.split('\n')
    total_bullets = 0
    
    for line in lines:
        for pattern in bullet_patterns:
            if re.match(pattern, line):
                total_bullets += 1
                break
    
    return {'total_bullets': total_bullets}

def analyse_special_characters(text: str) -> Dict[str, float]:
    """Analyse special character usage that might confuse ATS."""
    if not text:
        return {'problematic_ratio': 0.0}
    
    # Characters that are often problematic for ATS
    problematic_chars = set('©®™§¶†‡•‰‱′″‴‵‶‷‸‹›«»¡¿¦¨ª¯°±²³¹¼½¾×÷')
    
    total_chars = len(text)
    problematic_count = sum(1 for char in text if char in problematic_chars)
    
    return {
        'problematic_ratio': problematic_count / total_chars if total_chars > 0 else 0.0,
        'problematic_count': problematic_count
    }

def analyse_line_structure(text: str) -> Dict[str, int]:
    """Analyse line structure for readability."""
    lines = text.split('\n')
    
    very_long_lines = 0
    for line in lines:
        # Lines with 100+ characters might be too long
        if len(line.strip()) > 100:
            very_long_lines += 1
    
    return {'very_long_lines': very_long_lines}

def generate_readability_recommendations(score: int, word_count: int, parsing_metadata: Dict[str, Any] = None) -> List[str]:
    """Generate specific recommendations based on analysis."""
    recommendations = []
    
    if score < 6:
        recommendations.append("Consider using a simple, single-column format")
        recommendations.append("Remove all images and replace with text descriptions")
        recommendations.append("Use bullet points instead of long paragraphs")
    
    if word_count > 600:
        recommendations.append("Reduce word count to 300-600 words for optimal ATS processing")
        recommendations.append("Focus on most relevant experiences and achievements")
    
    if parsing_metadata and parsing_metadata.get('has_images'):
        recommendations.append("Replace images with text-based content")
        recommendations.append("Use standard fonts and avoid graphical elements")
    
    if parsing_metadata and parsing_metadata.get('has_columns'):
        recommendations.append("Use single-column layout for better ATS compatibility")
        recommendations.append("Organize content in clear sections with headers")
    
    recommendations.append("Use standard section headers (Experience, Education, Skills)")
    recommendations.append("Save as PDF to preserve formatting while maintaining text readability")
    
    return recommendations

def detect_sections(text: str) -> dict:
    """Detect major resume sections in the text."""
    text_lower = text.lower()
    sections = {}
    
    # Common section headers and their variations
    section_patterns = {
        'experience': [
            r'\b(work\s+)?experience\b',
            r'\bemployment\s+history\b',
            r'\bprofessional\s+experience\b',
            r'\bcareer\s+history\b'
        ],
        'education': [
            r'\beducation\b',
            r'\bacademic\s+background\b',
            r'\bqualifications\b'
        ],
        'skills': [
            r'\bskills\b',
            r'\btechnical\s+skills\b',
            r'\bcore\s+competencies\b',
            r'\bcompetencies\b'
        ],
        'contact': [
            r'\bcontact\s+information\b',
            r'\bcontact\s+details\b',
            r'\bpersonal\s+information\b'
        ]
    }
    
    for section_name, patterns in section_patterns.items():
        for pattern in patterns:
            if re.search(pattern, text_lower):
                sections[section_name] = True
                logger.debug(f"Found {section_name} section")
                break
        else:
            sections[section_name] = False
    
    return sections

def extract_contact_info(text: str) -> dict:
    """Extract contact information from resume text."""
    contact_info = {}
    
    # Email pattern
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    contact_info['emails'] = list(set(emails))  # Remove duplicates
    
    # Phone pattern (various formats)
    phone_pattern = r'(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})'
    phones = re.findall(phone_pattern, text)
    contact_info['phones'] = [''.join(phone) for phone in phones]
    
    logger.debug(f"Extracted contact info: {len(contact_info['emails'])} emails, {len(contact_info['phones'])} phones")
    return contact_info 