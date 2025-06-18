"""Information extraction utilities for resume content."""

import re
import logging
from typing import List, Dict, Any

from .keywords import (
    STRONG_ACTION_VERBS, WEAK_ACTION_VERBS, DEGREE_KEYWORDS,
    SOFT_SKILLS, CIVIL_ENGINEERING_SKILLS
)

logger = logging.getLogger(__name__)

# --- Lists for Component-Based Extraction ---
COMMON_JOB_TITLES = ['engineer', 'intern', 'manager', 'consultant', 'assistant', 'coordinator', 'specialist', 'analyst', 'designer', 'drafter']
COMPANY_INDICATORS = ['ltd', 'inc', 'llc', 'corp', 'corporation', 'university', 'college', 'institute', 'consultants', 'group', 'services']

def extract_skills(text: str, skill_map: Dict[str, List[str]]) -> List[str]:
    """Generic function to extract skills from text based on a provided map."""
    found_skills = set()
    text_lower = text.lower()
    
    for main_skill, variations in skill_map.items():
        for variation in variations:
            pattern = r'\b' + re.escape(variation) + r'\b'
            if re.search(pattern, text_lower):
                found_skills.add(main_skill)
                break
    
    return list(found_skills)


def find_potential_degrees(text: str) -> List[str]:
    """Finds potential degree names in the text."""
    found_degrees = set()
    lines = text.split('\n')
    for line in lines:
        line_lower = line.lower()
        if any(keyword in line_lower for keyword in DEGREE_KEYWORDS):
            # Capture the whole raw line as a potential degree entry
            found_degrees.add(line.strip())
            
    logger.info(f"Found {len(found_degrees)} potential degree entries.")
    return list(found_degrees)


def extract_key_phrases(text: str) -> List[str]:
    """Finds potential key phrases."""
    found_phrases = set()
    lines = text.split('\n')
    
    # This pattern finds sequences of capitalized words, allowing lowercase joining words.
    title_case_pattern = re.compile(r'\b([A-Z][a-z\'-]+(?:(?:\s+(?:and|or|the|of|in))?(\s+[A-Z][a-z\'-]+))+)\b')
    for line in lines:
        matches = title_case_pattern.findall(line)
        for match in matches:
            # The pattern returns tuples, so we access the first element
            full_match = match[0]
            # Avoid adding overly long sentences that might accidentally match.
            if len(full_match.split()) < 6:
                found_phrases.add(full_match)

    logger.info(f"Found {len(found_phrases)} potential key phrases.")
    return list(found_phrases)


def analyse_resume_content(text: str) -> Dict[str, Any]:
    """Analyses the entire resume for achievement-oriented language."""
    analysis = {
        'strong_action_lines': [],
        'weak_action_lines': [],
    }
    
    lines = text.split('\n')
    descriptive_lines = [line.strip().lower() for line in lines if line.strip()]

    quantified_pattern = re.compile(r'\b\d+[%kmgtb]?\b|\$[\d,.]+')

    strong_lines_set = set()
    weak_lines_set = set()

    for line in descriptive_lines:
        has_strong_verb = any(keyword in line for keyword in STRONG_ACTION_VERBS)
        has_weak_verb = any(keyword in line for keyword in WEAK_ACTION_VERBS)
        
        quantifiers_in_line = quantified_pattern.findall(line)
        is_quantified = False
        if quantifiers_in_line:
            for q in quantifiers_in_line:
                numeric_part = re.sub(r'\D', '', q)
                if numeric_part.isdigit():
                    num = int(numeric_part)
                    if not (1900 <= num <= 2099 and len(numeric_part) == 4):
                        is_quantified = True
                        break 


        if has_strong_verb and is_quantified:
            strong_lines_set.add(line)
        elif has_weak_verb:
            weak_lines_set.add(line)


    analysis['strong_action_lines'] = sorted(list(strong_lines_set), key=len, reverse=True)
    analysis['weak_action_lines'] = sorted(list(weak_lines_set), key=len, reverse=True)
            
    return analysis


def extract_all_information(text: str) -> Dict[str, Any]:
    """Extract all structured and unstructured information from the resume text."""
    logger.info("Extracting all information from cleaned text...")

    contact_info = extract_contact_info(text)
    technical_skills = extract_skills(text, CIVIL_ENGINEERING_SKILLS)
    soft_skills = extract_skills(text, SOFT_SKILLS)
    degrees = find_potential_degrees(text)
    key_phrases_raw = extract_key_phrases(text)

    # Filter out phrases that are already skills
    all_skills_lower = {s.lower() for s in technical_skills} | {s.lower() for s in soft_skills}
    key_phrases = [phrase for phrase in key_phrases_raw if phrase.lower() not in all_skills_lower]
    if len(key_phrases_raw) != len(key_phrases):
        logger.info(f"Filtered key phrases, removed {len(key_phrases_raw) - len(key_phrases)} phrases that were also skills.")
    
    content_analysis = analyse_resume_content(text)

    summary = {
        'has_email': bool(contact_info.get('emails')),
        'has_phone': bool(contact_info.get('phones')),
        'total_technical_skills': len(technical_skills),
        'total_soft_skills': len(soft_skills),
        'total_key_phrases': len(key_phrases),
        'total_degrees': len(degrees)
    }

    return {
        'contact': contact_info,
        'technical_skills': technical_skills,
        'soft_skills': soft_skills,
        'key_phrases': key_phrases,
        'degrees': degrees,
        'content_analysis': content_analysis,
        'summary': summary
    }


def extract_contact_info(text: str) -> dict:
    """Extract contact information from resume text with relaxed phone number parsing."""
    contact_info = {}
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    contact_info['emails'] = list(set(re.findall(email_pattern, text)))
    
    phone_pattern = r'[\d\s()-]{9,}'
    potential_phones = re.findall(phone_pattern, text)
    contact_info['phones'] = [re.sub(r'\D', '', p) for p in potential_phones if len(re.sub(r'\D', '', p)) >= 9]
    
    logger.debug(f"Extracted contact info: {len(contact_info['emails'])} emails, {len(contact_info['phones'])} phones")
    return contact_info