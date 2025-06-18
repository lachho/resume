"""Scoring algorithms for resume analysis."""

import logging
from typing import Dict, Any, Tuple
from .text_processor import analyse_text_complexity
from .job_data import get_job_requirements

logger = logging.getLogger(__name__)

def calculate_formatting_score(extracted_info: Dict[str, Any]) -> Tuple[float, str]:
    """
    Calculates formatting score based on the successful extraction of key components.
    """
    score = 0.0
    max_score = 10.0
    feedback_parts = []

    # Contact Info
    if extracted_info['contact'].get('emails'): score += 1.0; feedback_parts.append("✓ Email address found")
    if extracted_info['contact'].get('phones'): score += 1.0; feedback_parts.append("✓ Phone number found")

    # Education
    if extracted_info.get('degrees'): score += 3.0; feedback_parts.append(f"✓ Found {len(extracted_info['degrees'])} potential degree(s)")
    else: feedback_parts.append("✗ No clear degree or education entries found")

    # Key Phrases
    if extracted_info.get('key_phrases'): score += 3.0; feedback_parts.append(f"✓ Found {len(extracted_info['key_phrases'])} key phrase(s)")
    else: feedback_parts.append("✗ No clear key phrases (job titles, companies) found")

    # Skills
    total_skills = len(extracted_info.get('technical_skills', [])) + len(extracted_info.get('soft_skills', []))
    if total_skills > 0: score += 2.0; feedback_parts.append(f"✓ Found {total_skills} technical and soft skills")
    else: feedback_parts.append("✗ No skills section found")
    
    percentage = (score / max_score) * 100
    if percentage >= 80: overall_feedback = "Excellent formatting"
    elif percentage >= 60: overall_feedback = "Good formatting"
    else: overall_feedback = "Poor formatting - key info may be hard for an ATS to parse"
    
    return score, f"{overall_feedback}\n" + "\n".join(feedback_parts)


def calculate_content_score(extracted_info: Dict[str, Any]) -> Tuple[float, str]:
    """
    Analyses the quality of resume content based on achievement language.
    """
    analysis = extracted_info.get('content_analysis', {})
    strong_actions = analysis.get('strong_action_lines', [])
    weak_actions = analysis.get('weak_action_lines', [])
    
    # Score based on counts, rewarding strong verbs more.
    score = min(10.0, len(strong_actions) * 1.5)
    
    if score >= 8: 
        overall_feedback = "🟢 Excellent use of strong action verbs and measurable results."
    elif score >= 5: 
        overall_feedback = "🟡 Good use of action verbs and quantified results. Try to use stronger verbs."
    else: 
        overall_feedback = "🟠 Content can be improved by using more powerful action verbs and adding quantifiable achievements."

    detailed_feedback = f"{overall_feedback}\n"
    
    if strong_actions:
        detailed_feedback += "\n✅ STRONG ACTION VERBS:\n"
        for ex in strong_actions[:5]: detailed_feedback += f"• \"{ex}\"\n"

    if weak_actions:
        detailed_feedback += "\n⚠️ WEAK ACTION VERBS (can be improved):\n"
        for ex in weak_actions[:5]: detailed_feedback += f"• \"{ex}\"\n"

    if not strong_actions:
        detailed_feedback = "No achievement-oriented language found. Start bullet points with action verbs and include numbers to show impact."

    return score, detailed_feedback

def calculate_job_match_score(extracted_info: Dict[str, Any], job_req: Dict[str, Any]) -> Tuple[float, str]:
    """Calculates a detailed job match score based on the new job data structure."""
    
    weights = {'education': 0.25, 'hard_skills': 0.5, 'soft_skills': 0.25}
    scores = {'education': 0.0, 'hard_skills': 0.0, 'soft_skills': 0.0}
    feedback_parts = ["📊 JOB MATCH BREAKDOWN:"]

    # --- 1. Education Match ---
    education_reqs = job_req.get('essential', {})
    degrees_req = [d.lower() for d in education_reqs.get('degrees', [])]
    fields_req = [f.lower() for f in education_reqs.get('fields_of_study', [])]
    
    found_degree = False
    found_field = False
    
    extracted_degrees_text = " ".join(extracted_info.get('degrees', [])).lower()
    
    if any(req in extracted_degrees_text for req in degrees_req):
        found_degree = True
    if any(req in extracted_degrees_text for req in fields_req):
        found_field = True
        
    education_score = (0.5 * found_degree) + (0.5 * found_field)
    scores['education'] = education_score
    feedback_parts.append(f"• Education Match: {education_score*100:.0f}% (Degree: {'✓' if found_degree else '✗'}, Field: {'✓' if found_field else '✗'})")

    # --- 2. Hard Skills Match ---
    hard_skills_req = job_req.get('hard_skills', {})
    all_hard_skills_req = [s.lower() for s in hard_skills_req.get('software', [])] + \
                          [s.lower() for s in hard_skills_req.get('engineering_disciplines', [])] + \
                          [s.lower() for s in hard_skills_req.get('technical_tasks', [])]
    
    resume_tech_skills = {s.lower() for s in extracted_info.get('technical_skills', [])}
    
    matched_hard_skills_count = 0
    for req_skill in all_hard_skills_req:
        if req_skill in resume_tech_skills:
            matched_hard_skills_count += 1
        else:
            for resume_skill in resume_tech_skills:
                if req_skill in resume_skill or resume_skill in req_skill:
                    matched_hard_skills_count += 1
                    break
    
    hard_skill_score = matched_hard_skills_count / len(all_hard_skills_req) if all_hard_skills_req else 1.0
    scores['hard_skills'] = hard_skill_score
    feedback_parts.append(f"• Hard Skills Match: {hard_skill_score*100:.0f}% ({matched_hard_skills_count}/{len(all_hard_skills_req)} found)")

    # --- 3. Soft Skills Match ---
    soft_skills_req_list = job_req.get('hard_matches', [])
    soft_skills_map = job_req.get('soft_matches', {})
    resume_soft_skills = {s.lower() for s in extracted_info.get('soft_skills', [])}
    
    matched_soft_skills_count = 0
    for req_skill_key in soft_skills_req_list:
        req_skill_key_lower = req_skill_key.lower()
        synonyms = [s.lower() for s in soft_skills_map.get(req_skill_key, [])]
        search_terms = {req_skill_key_lower} | set(synonyms)
        
        if any(term in resume_soft_skills for term in search_terms):
             matched_soft_skills_count += 1

    soft_skill_score = matched_soft_skills_count / len(soft_skills_req_list) if soft_skills_req_list else 1.0
    scores['soft_skills'] = soft_skill_score
    feedback_parts.append(f"• Soft Skills Match: {soft_skill_score*100:.0f}% ({matched_soft_skills_count}/{len(soft_skills_req_list)} found)")
    
    # --- Final Score ---
    total_score = min(100, (scores['education'] * weights['education'] +
                   scores['hard_skills'] * weights['hard_skills'] +
                   scores['soft_skills'] * weights['soft_skills']) * 100)
                   
    return total_score, "\n".join(feedback_parts)


def calculate_all_scores(text: str, extracted_info: Dict[str, Any], parsing_metadata: Dict[str, Any] = None) -> Dict[str, Any]:
    """Calculate all scores and return consolidated results."""

    readability_score, readability_feedback = analyse_text_complexity(text, parsing_metadata)
    formatting_score, formatting_feedback = calculate_formatting_score(extracted_info)
    content_score, content_feedback = calculate_content_score(extracted_info)
    
    # New, detailed job match score
    job_req = get_job_requirements()
    job_match_percentage, job_match_feedback = calculate_job_match_score(extracted_info, job_req)

    return {
        'readability': {'score': readability_score, 'max_score': 10, 'feedback': readability_feedback},
        'formatting': {'score': formatting_score, 'max_score': 10, 'feedback': formatting_feedback},
        'content': {'score': content_score, 'max_score': 10, 'feedback': content_feedback},
        'job_match': {'percentage': job_match_percentage, 'feedback': job_match_feedback},
        'parsing_metadata': parsing_metadata or {}
    } 