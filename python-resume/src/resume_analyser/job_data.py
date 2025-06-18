"""Job description data for resume matching."""

# New job description based on user-provided keywords and structure
JOB_DESCRIPTION = {
    "title": "Civil Engineer - Early Career (Generic)",
    "essential": {
        "degrees": [
            "Bachelor", "Master", "Degree", "PhD"
        ],
        "fields_of_study": [
            "Civil Engineering", "Environmental Engineering", "Surveying", "Engineering"
        ],
    },
    "hard_skills": {
        "software": [
            "AutoCAD", "Civil 3D", "Revit", "12d Model", "3D modelling software", "Microsoft Office Suite"
        ],
        "engineering_disciplines": [
            "Civil", "Geotechnical", "Structural", "Facade", "Transport Planning", "Roads and Bridges",
            "Tunneling", "Rail", "Water", "Wastewater", "Sustainability", "Environmental", "Project Management",
            "Digital Transformation", "Construction", "Surveying"
        ],
        "technical_tasks": [
            "detailed designs", "technical calculations", "engineering analysis", "technical reports",
            "specifications", "drawings", "development applications", "project planning", "cost estimation",
            "stakeholder communication"
        ]
    },
    "hard_matches": [
        "leader", "driven", "adaptable", "passionate", "time management", "analytical skills",
        "problem-solving skills", "attention to detail", "written communication", "verbal communication",
        "presentation skills", "proactive", "initiative", "collaborative", "teamwork", "growth mindset",
        "eagerness to learn"
    ],
    "soft_matches": {
        "leader": ["team leader", "leadership", "mentorship", "guidance"],
        "driven": ["motivated", "self-motivated", "goal-oriented", "ambitious"],
        "adaptable": ["flexible", "resilient", "open to change", "versatile"],
        "passionate": ["enthusiastic", "committed", "dedicated", "eager"],
        "time management": ["organised", "efficient", "prioritisation", "deadline-driven"],
        "analytical skills": ["critical thinking", "problem analysis", "logical reasoning"],
        "problem-solving skills": ["troubleshooting", "solution-oriented", "decision making"],
        "attention to detail": ["meticulous", "accurate", "thorough"],
        "written communication": ["report writing", "documentation", "technical writing"],
        "verbal communication": ["presentation", "public speaking", "interpersonal communication"],
        "presentation skills": ["public speaking", "visual communication", "storytelling"],
        "proactive": ["self-starter", "initiative", "forward-thinking"],
        "initiative": ["self-driven", "go-getter", "entrepreneurial"],
        "collaborative": ["team player", "cooperative", "partnership"],
        "teamwork": ["group work", "collaboration", "joint effort"],
        "growth mindset": ["continuous learning", "self-improvement", "adaptability"],
        "eagerness to learn": ["curious", "inquisitive", "open-minded"]
    }
}

def get_job_requirements():
    """Get the current job requirements for matching."""
    return JOB_DESCRIPTION 