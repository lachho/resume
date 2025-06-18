# Resume Analysis Tool

A command-line tool that analyzes resumes and provides feedback on formatting, content, and job description matching. This tool helps job applicants understand how automated systems might interpret their resumes.

## Features

- **Resume parsing** (PDF, DOCX, and TXT support)
- **Readability scoring** based on text complexity and parsing difficulty
- **Information extraction** (contact details, experience, education, skills)
- **Formatting analysis** with section detection
- **Job description matching** against predefined requirements
- **Detailed feedback report** with actionable recommendations

## Installation

1. Clone this repository
2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Basic usage:
```bash
python main.py path/to/your/resume.pdf
```

Enable verbose output for debugging:
```bash
python main.py path/to/your/resume.pdf --verbose
```

## Project Structure

The project is organized into modular components:

- **`main.py`**: Main entry point and CLI interface
- **`parsers.py`**: PDF, DOCX, and TXT file parsing utilities
- **`text_processor.py`**: Text cleaning and preprocessing functions
- **`extractors.py`**: Information extraction from resume text
- **`scorers.py`**: Scoring algorithms (readability, formatting, job matching)
- **`job_data.py`**: Job description data for matching (currently Civil Engineering at COSVEC)
- **`reporter.py`**: Final report generation
- **`requirements.txt`**: Project dependencies

## Analysis Workflow

The tool follows a structured analysis pipeline:

1. **File Validation**: Checks file format and accessibility
2. **Resume Parsing**: Extracts text from PDF/DOCX/TXT files
3. **Text Processing**: Cleans and normalizes extracted text
4. **Information Extraction**: Identifies skills, experience, education, contact info
5. **Scoring**: Calculates readability, formatting, and job match scores
6. **Report Generation**: Creates comprehensive feedback report

## Detailed Scoring Algorithms

### 1. Readability Score (0-10 points)

**Algorithm**: Text complexity analysis based on document parsing success
- **Perfect Score (10 points)**: Document parsed successfully with >50 characters
- **Penalty System**: Deducts points based on parsing difficulties
  - Failed parsing: 0 points
  - Very short content (<50 chars): 0 points
  - Excessive special characters: -1 to -3 points
  - Complex layouts causing parsing issues: -1 to -2 points

**Implementation**: Uses character count, parsing success rate, and text cleanliness metrics

### 2. Formatting Score (0-10+ points)

**Algorithm**: Section detection and information extraction scoring

**Section Detection (7 points maximum)**:
- Experience section found: +3.0 points
- Education section found: +3.0 points  
- Skills section found: +4.0 points

**Contact Information (1 point maximum)**:
- Email address found: +0.5 points
- Phone number found: +0.5 points

**Score Calculation**:
```
Total Points = Section Points + Contact Points
Percentage = (Total Points / 10.0) × 100%
Final Score = min(Total Points, 10.5)  // Can exceed 10 for excellent formatting
```

**Feedback Thresholds**:
- 80%+: "Excellent formatting"
- 60-79%: "Good formatting" 
- 40-59%: "Fair formatting"
- <40%: "Poor formatting"

### 3. Job Match Score (0-100%)

**Algorithm**: Weighted skills matching against civil engineering job requirements

**Points System**:
- **Required Skills**: 20 points each (AutoCAD, Civil 3D, technical calculations, engineering analysis, technical reports)
- **Preferred Skills**: 10 points each (Revit, 12d Model, 3D modelling, Microsoft Office, flood modelling, traffic modelling, drainage design, road design, project planning, cost estimation)
- **Design/Analysis Skills**: 8 points each (detailed designs, site investigation, foundation design, slope stability analysis, hydrology, hydraulics, earthworks)
- **Documentation Skills**: 6 points each (specifications, drawings, development applications, technical documentation)
- **Project Skills**: 5 points each (stakeholder communication, client liaison, project delivery, scheduling, cost control)
- **Sector Terms**: 4 points each (land development, transport networks, water networks, wastewater networks, WSUD, infrastructure)
- **Soft Skills**: 3 points each (collaborative team, multidisciplinary teams, written communication, verbal communication, analytical skills, problem-solving, attention to detail, time management, organisation, leadership)
- **Education Match**: 15 points (bachelor/master in civil/environmental engineering/surveying)

**Maximum Possible Score Calculation**:
```
Max Score = (5 × 20) + (10 × 10) + (7 × 8) + (4 × 6) + (5 × 5) + (6 × 4) + (10 × 3) + 15
Max Score = 100 + 100 + 56 + 24 + 25 + 24 + 30 + 15 = 374 points
```

**Percentage Calculation**:
```
Job Match % = (Earned Points / Max Possible Points) × 100%
```

**Skill Matching Process**:
1. Convert all resume skills to lowercase
2. Match against job requirement categories using exact string matching
3. Award points based on category weights
4. Check education section for degree type and field matches
5. Calculate final percentage

**Feedback Generation**:
- Lists found skills by category (Required, Preferred, Design/Analysis, etc.)
- Identifies missing required skills
- Provides recommendations based on score:
  - <60%: Specific skill gaps and fundamental improvements
  - 60-79%: Minor additions and quantification suggestions
  - 80%+: Advanced optimization recommendations

### Overall Assessment Calculation

**Executive Summary Score**:
```
Overall % = (Readability/10 × 30%) + (Formatting/10 × 20%) + (Job Match% × 50%)
```

**Assessment Categories**:
- 80%+: "🟢 Excellent match - ready to apply"
- 65-79%: "🟡 Good potential - minor improvements recommended"  
- 45-64%: "🟠 Moderate fit - significant improvements recommended"
- <45%: "🔴 Poor match - major revisions needed"

## Sample Output

```
🔍 RESUME ANALYSIS REPORT
==================================================
Job Target: Civil Engineer - Early Career (COSVEC)

📊 EXECUTIVE SUMMARY
--------------------
Overall Assessment: 72.6%
🟡 Good potential - minor improvements recommended

📋 DETAILED ANALYSIS
--------------------
1. READABILITY SCORE: 10/10
   Excellent readability - clean, well-formatted document

2. FORMATTING SCORE: 10.5/10 (105.0%)
   Excellent formatting - all key sections clearly identified
   ✓ Experience section found
   ✓ Education section found
   ✓ Skills section found
   ✓ Email address found

3. JOB MATCH SCORE: 72.6%
   Overall Match: 72.6%
   
   ✓ Required Skills Found (5/5): AutoCAD, Civil 3D, technical calculations, engineering analysis, technical reports
   ✓ Preferred Skills Found (9/10): Revit, 3D modelling, Microsoft Office, flood modelling, traffic modelling, drainage design, road design, project planning, cost estimation
   ✓ Design/Analysis Skills Found (5): site investigation, foundation design, hydrology, hydraulics, earthworks
   ✓ Documentation Skills Found (2): specifications, development applications
   ✓ Sector Experience Found (2): land development, WSUD
   ✓ Education requirements met

   Good match! Consider:
   - Including more specific project examples
   - Quantifying your engineering achievements
```

## Development Status

This is a proof-of-concept (PoC) project currently focused on **Civil Engineering** positions at COSVEC. The tool uses rule-based algorithms and manual parsing methods to analyze resumes, without relying on external APIs for parsing or scoring.

## Contributing

Feel free to contribute by:
- Adding more civil engineering skills to the extraction list
- Improving parsing algorithms for complex resume layouts
- Adding support for more file formats
- Enhancing the scoring methodology with industry-specific weights
- Extending job descriptions for other engineering disciplines

## License

MIT License 