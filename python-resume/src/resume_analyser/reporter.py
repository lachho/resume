"""Report generation for resume analysis results."""

import logging
from typing import Dict, Any, List
from .job_data import get_job_requirements

logger = logging.getLogger(__name__)

def format_job_requirements(job_req: Dict[str, Any]) -> str:
    """Formats the job requirements into a displayable string."""
    lines = []
    lines.append("🎯 KEYWORDS FROM JOB DESCRIPTION")
    lines.append("-" * 35)

    # Education
    essential = job_req.get('essential', {})
    degrees = essential.get('degrees', [])
    fields = essential.get('fields_of_study', [])
    if degrees or fields:
        education_keywords = degrees + fields
        lines.append(f"Education: {', '.join(education_keywords)}")

    # Hard Skills
    hard_skills = job_req.get('hard_skills', {})
    all_hard_skills = hard_skills.get('software', []) + hard_skills.get('engineering_disciplines', []) + hard_skills.get('technical_tasks', [])
    if all_hard_skills:
        display_skills = all_hard_skills[:12]
        lines.append(f"Technical Keywords: {', '.join(display_skills)}{'...' if len(all_hard_skills) > 12 else ''}")

    # Soft Skills
    soft_skills = job_req.get('hard_matches', [])
    if soft_skills:
        lines.append(f"Soft Skill Keywords: {', '.join(soft_skills)}")
    
    lines.append("") # for spacing
    return "\n".join(lines)

def generate_final_report(extracted_info: Dict[str, Any], scores: Dict[str, Any]) -> str:
    """Generate a comprehensive final report with scores and feedback."""
    
    report_lines = []
    
    # --- Header ---
    report_lines.append("🔍 RESUME ANALYSIS REPORT")
    report_lines.append("=" * 50)
    report_lines.append(f"Job Target: Civil Engineer - Early Career (COSVEC)")
    report_lines.append("")
    
    # --- Executive Summary ---
    report_lines.append("📊 EXECUTIVE SUMMARY")
    report_lines.append("-" * 20)
    
    readability = scores.get('readability', {}).get('score', 0)
    formatting = scores.get('formatting', {}).get('score', 0)
    content = scores.get('content', {}).get('score', 0)
    job_match = scores.get('job_match', {}).get('percentage', 0) / 10
    
    overall_score = (readability * 0.15 + formatting * 0.20 + content * 0.30 + job_match * 0.35) * 10
    
    if overall_score >= 80: assessment = f"🟢 Excellent fit ({overall_score:.1f}%)"
    elif overall_score >= 65: assessment = f"🟡 Good fit ({overall_score:.1f}%)"
    else: assessment = f"🟠 Moderate fit ({overall_score:.1f}%)"
        
    report_lines.append(f"Overall Assessment: {assessment}")
    report_lines.append("")
    
    # --- Detailed Analysis ---
    report_lines.append("📋 DETAILED ANALYSIS")
    report_lines.append("-" * 20)
    
    # 1. Readability & ATS Compatibility
    r_score = scores.get('readability', {})
    report_lines.append(f"1. READABILITY & ATS COMPATIBILITY: {r_score.get('score', 0)}/10")
    report_lines.append(f"   {r_score.get('feedback', 'N/A')}")
    report_lines.append("")
    
    # 2. Formatting & Structure
    f_score = scores.get('formatting', {})
    report_lines.append(f"2. FORMATTING & STRUCTURE: {f_score.get('score', 0):.1f}/10")
    report_lines.append(f"   {f_score.get('feedback', 'N/A')}")
    report_lines.append("")

    # 3. Content & Achievement-Orientation
    c_score = scores.get('content', {})
    report_lines.append(f"3. CONTENT & ACHIEVEMENT-ORIENTATION: {c_score.get('score', 0):.1f}/10")
    report_lines.append(f"   {c_score.get('feedback', 'N/A')}")
    report_lines.append("")
    
    # 4. Job Match Score
    jm_score = scores.get('job_match', {})
    report_lines.append(f"4. JOB MATCH SCORE: {jm_score.get('percentage', 0):.1f}%")
    report_lines.append(f"   {jm_score.get('feedback', 'N/A')}")
    report_lines.append("")
    
    # --- Keywords from Job Description ---
    job_req = get_job_requirements()
    report_lines.append(format_job_requirements(job_req))
    
    # --- Extracted Information ---
    report_lines.append("--- KEY INFORMATION EXTRACTED FROM RESUME ---")
    
    contact = extracted_info.get('contact', {})
    report_lines.append(f"Emails: {', '.join(contact.get('emails', ['Not found']))}")
    report_lines.append(f"Phones: {', '.join(contact.get('phones', ['Not found']))}")
    
    tech_skills = extracted_info.get('technical_skills', [])
    report_lines.append(f"Technical Skills Found ({len(tech_skills)}): {', '.join(tech_skills) if tech_skills else 'None'}")
    
    soft_skills = extracted_info.get('soft_skills', [])
    report_lines.append(f"Soft Skills Found ({len(soft_skills)}): {', '.join(soft_skills) if soft_skills else 'None'}")

    key_phrases = extracted_info.get('key_phrases', [])
    report_lines.append(f"Key Phrases Found ({len(key_phrases)}): {', '.join(key_phrases) if key_phrases else 'None'}")

    degrees = extracted_info.get('degrees', [])
    report_lines.append(f"Potential Education Found ({len(degrees)}):")
    if degrees:
        for degree_line in degrees:
            report_lines.append(f"  • {degree_line}")
    else:
        report_lines.append("  None")
    
    report_lines.append("-" * 35)
    report_lines.append("")
    
    # --- Key Recommendations ---
    report_lines.append("💡 KEY RECOMMENDATIONS")
    report_lines.append("-" * 25)
    recommendations = generate_recommendations(scores, extracted_info)
    report_lines.extend([f"• {rec}" for rec in recommendations])
    report_lines.append("")
    
    report_lines.append("=" * 50)
    report_lines.append("Analysis complete. Good luck with your application! 🚀")
    
    return "\n".join(report_lines)

def generate_recommendations(scores: Dict[str, Any], extracted_info: Dict[str, Any]) -> List[str]:
    """Generate a prioritized list of recommendations."""
    recommendations = []
    
    # Sort by score to prioritize worst areas first
    sorted_scores = sorted([
        ('content', scores.get('content', {}).get('score', 10)),
        ('formatting', scores.get('formatting', {}).get('score', 10)),
        ('readability', scores.get('readability', {}).get('score', 10)),
        ('job_match', scores.get('job_match', {}).get('percentage', 100) / 10)
    ], key=lambda item: item[1])
    
    for key, score in sorted_scores:
        if key == 'content' and score < 7:
            recommendations.append("Strengthen descriptions: start each line with an action verb and add numbers to show impact.")
        if key == 'formatting' and score < 7:
            recommendations.append("Improve structure: Use clear, standard headings like 'Work Experience' and 'Education'.")
        if key == 'readability' and score < 7:
            recommendations.append("Improve ATS compatibility: simplify layout, remove images, and use standard fonts.")
        if key == 'job_match' and score < 7:
            recommendations.append("Tailor your skills to the job description, using keywords from the posting.")
            
    # Add a final check for contact info
    if not extracted_info.get('contact', {}).get('phones'):
        recommendations.append("Include a phone number in your contact information.")

    return list(dict.fromkeys(recommendations))[:7] # Return top 3 unique recommendations 