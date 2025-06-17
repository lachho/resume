# Resume Analyser

A comprehensive resume analysis tool built with React that provides instant, detailed feedback to help job seekers optimise their resumes for success. The application uses advanced parsing and analysis techniques to evaluate resumes across multiple dimensions and provide actionable insights.

## 🎯 What This App Does

This Resume Analyser provides a complete evaluation of your resume across four key areas:

### 1. **Overall Score (Weighted Analysis)**
- Combines all analysis results into a single score out of 100
- **Weighting**: ATS Compatibility (40%) + Content Quality (35%) + Job Requirements (25%)
- Provides dynamic feedback with specific strengths and improvement areas
- Score-based recommendations: Outstanding (85+), Strong (75+), Good (65+), Needs Improvement (<65)

### 2. **ATS Compatibility Analysis**
- **File Format Compatibility**: Checks for ATS-friendly formatting
- **Image Detection**: Identifies problematic images/graphics that ATS systems can't read
- **Column Analysis**: Detects multi-column layouts that can confuse ATS parsing
- **Page Count**: Evaluates optimal resume length (1-2 pages recommended)
- **Word Count**: Analyses if content length is within optimal range (300-700 words)
- **Special Characters**: Identifies potentially problematic characters that may break ATS systems
- **Formatting Issues**: Detects tables, complex layouts, and other ATS-unfriendly elements

### 3. **Content Quality Assessment**
- **Action Verb Analysis**: Identifies strong vs weak action verbs using exact word boundary matching
- **Quantifiable Results**: Detects and scores numerical achievements and metrics
- **Personal Pronouns**: Flags unprofessional first-person language (I, me, my)
- **Achievement Lines**: Scores lines that combine strong verbs with quantifiable results
- **Professional Language**: Evaluates impact-focused writing and professional tone
- **Detailed Examples**: Shows specific resume lines with detected issues or strengths

### 4. **Job Requirements Matching**
- **Academic Requirements**: Matches degrees and fields of study against job requirements
- **Technical Skills**: Analyses hard skills including software, engineering disciplines, and technical tasks
- **Professional Skills**: Evaluates soft skills and professional competencies
- **Exact Word Matching**: Uses precise word boundary detection to prevent false matches
- **Multi-variant Matching**: Handles hyphenated skills (e.g., "problem-solving" matches "problem solving")
- **Industry-Specific**: Tailored for civil engineering roles with relevant skill sets
- **Gap Analysis**: Identifies missing skills and provides improvement recommendations

### 5. **Extracted Information & Sections**
- **Contact Information**: Extracts emails, phone numbers, and URLs using regex patterns
- **Skills Identification**: Matches against comprehensive keyword databases for engineering and soft skills
- **Education Detection**: Identifies degree qualifications and educational background
- **Key Phrases**: Extracts important title-case phrases while filtering noise
- **Section Recognition**: Detects standard resume sections (experience, education, skills, projects, etc.)

## 🚀 Key Features

- ✅ **Instant Analysis**: Get comprehensive feedback in seconds
- 📊 **Visual Scoring**: Clear scores and progress indicators for each analysis area
- 🎯 **Actionable Insights**: Specific recommendations for improvement
- 📱 **Mobile Friendly**: Responsive design works on all devices
- 🔍 **Detailed Breakdown**: Granular analysis of every resume component
- 🎨 **Professional UI**: Clean, modern interface with intuitive navigation
- 📋 **Job Description Comparison**: Compare against industry-standard requirements
- 🚫 **Privacy Focused**: All processing happens client-side, no data stored
- 📋 **HTML Export**: Copy comprehensive analysis report to clipboard for sharing
- 🔄 **Automatic Deployment**: GitHub Actions handles deployment to GitHub Pages

## 📤 Export Functionality

The app includes a comprehensive HTML export feature that provides:
- Complete analysis data with detailed card information
- Specific resume line examples highlighting issues and strengths
- Job matching visuals showing found vs missing skills
- Professional formatting ready for email or document sharing
- One-click clipboard copying for easy sharing

## 🏗️ Technical Architecture

### **File Processing**
- **Multi-format Support**: PDF, DOCX, and TXT files
- **Advanced Parsing**: Extracts text while preserving structure and detecting formatting elements
- **Metadata Extraction**: Identifies document properties like column count, image presence, page count

### **Analysis Engine**
- **Modular Design**: Separate analysers for ATS, content, sections, and job matching
- **Dynamic Scoring**: Real-time calculation based on resume content
- **Australian English**: Spelling and terminology optimised for Australian market
- **Exact Word Matching**: Sophisticated keyword databases with precise matching algorithms

### **User Interface**
- **Modern Design**: Clean, professional interface built with Tailwind CSS
- **Responsive Layout**: Optimised for desktop and mobile viewing
- **Card-Based Results**: Easy-to-read analysis sections with colour-coded feedback
- **Interactive Elements**: Expandable sections, progress indicators, and detailed breakdowns

## 🛠️ How It Works

1. **Upload**: Drag and drop your resume (PDF, DOCX, or TXT)
2. **Parse**: Advanced text extraction and structure analysis
3. **Analyse**: Multi-dimensional evaluation across all key areas
4. **Results**: Detailed feedback with scores, strengths, and improvement areas
5. **Export**: Copy comprehensive report to clipboard for sharing
6. **Optimise**: Use recommendations to enhance your resume

## 📈 Scoring Methodology

### **ATS Compatibility** (40% of overall score)
- No images: +25 points
- Single column: +25 points
- 1-2 pages: +20 points
- Optimal word count (300-700): +20 points
- Clean formatting: +10 points

### **Content Quality** (35% of overall score)
- Achievement lines (strong verbs + metrics): Up to 30 points
- Strong verbs without metrics: Bonus points
- Minimal weak language: Avoid point deductions
- No personal pronouns: Avoid point deductions

### **Job Requirements** (25% of overall score)
- Academic match (degree + field): Up to 20 points
- Hard skills match: Up to 50 points
- Soft skills match: Up to 30 points

## 🎯 Target Users

- **Engineering Professionals**: Specifically tailored for civil engineering roles
- **Job Seekers**: Looking to optimise their resumes for ATS systems
- **Career Changers**: Wanting to ensure their resume meets industry standards
- **Recruiters**: Quick assessment tool for resume quality
- **Career Counsellors**: Professional tool for client guidance

## 🔧 Installation & Setup

```bash
# Clone the repository
git clone git@github.com:lachho/resume.git
cd resume-website

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🌟 What Makes This Different

- **Industry-Specific**: Tailored for engineering professionals with relevant skill sets
- **Precise Matching**: Advanced word boundary detection prevents false matches
- **Comprehensive Analysis**: Goes beyond simple keyword matching
- **Real-time Feedback**: Instant results with no server processing
- **Professional Grade**: Enterprise-quality analysis algorithms
- **Export Ready**: Professional reports ready for sharing with employers

## 📋 Supported File Formats

- **PDF**: Full text extraction with layout detection
- **DOCX**: Microsoft Word documents with formatting analysis
- **TXT**: Plain text files for basic analysis

---

*Built with React, Tailwind CSS, and modern web technologies. Optimised for Australian graduate engineers and engineering industry standards.*