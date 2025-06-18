#!/usr/bin/env python3

import argparse
import logging
from pathlib import Path
from typing import Dict, Any, Optional
import sys

# Update system path to include the new 'src' directory
sys.path.insert(0, str(Path(__file__).resolve().parent / 'src'))

# Import our custom modules from the new location
from resume_analyser.parsers import parse_resume_file_enhanced, ParseResult
from resume_analyser.text_processor import clean_text, analyse_text_complexity
from resume_analyser.extractors import extract_all_information
from resume_analyser.scorers import calculate_all_scores
from resume_analyser.reporter import generate_final_report

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ResumeAnalyser:
    """Main class for resume analysis workflow."""
    
    def __init__(self, resume_path: str):
        """Initialize the analyser with the resume file path."""
        self.resume_path = Path(resume_path)
        self.parse_result: Optional[ParseResult] = None
        self.raw_text: Optional[str] = None
        self.cleaned_text: Optional[str] = None
        self.parsing_metadata: Dict[str, Any] = {}
        self.extracted_info: Dict[str, Any] = {}
        self.scores: Dict[str, Any] = {}
        
    def validate_input(self) -> bool:
        """Validate the input resume file."""
        if not self.resume_path.exists():
            logger.error(f"Resume file not found: {self.resume_path}")
            return False
        if self.resume_path.suffix.lower() not in ['.pdf', '.docx', '.txt']:
            logger.error("Unsupported file format. Please provide a PDF, DOCX, or TXT file.")
            return False
        return True
    
    def parse_resume(self) -> bool:
        """Parse the resume and extract raw text content with metadata."""
        logger.info(f"Parsing resume file: {self.resume_path}")
        
        self.parse_result = parse_resume_file_enhanced(self.resume_path)
        
        if self.parse_result is None:
            logger.error("Failed to extract text from resume file")
            return False
        
        self.raw_text = self.parse_result.text
        self.parsing_metadata = self.parse_result.metadata
        
        if len(self.raw_text.strip()) < 10:
            logger.error("Very little text extracted - file may be corrupted or unsupported")
            return False
        
        # Log parsing metadata
        if self.parsing_metadata.get('has_images'):
            logger.info(f"⚠️ Detected {self.parsing_metadata['image_count']} image(s) - ATS compatibility concern")
        if self.parsing_metadata.get('has_columns'):
            logger.info("⚠️ Detected multi-column layout - ATS compatibility concern")
        if self.parsing_metadata.get('parsing_issues'):
            for issue in self.parsing_metadata['parsing_issues']:
                logger.warning(f"Parsing issue: {issue}")
        
        logger.info(f"Successfully extracted {len(self.raw_text)} characters")
        return True
    
    def process_text(self) -> bool:
        """Clean and process the extracted text."""
        if not self.raw_text:
            logger.error("No raw text available for processing")
            return False
        
        logger.info("Cleaning and processing text...")
        self.cleaned_text = clean_text(self.raw_text)
        
        if len(self.cleaned_text.strip()) < 10:
            logger.error("Text processing resulted in very little content")
            return False
        
        logger.info(f"Text processed: {len(self.cleaned_text)} characters after cleaning")
        return True
    
    def extract_information(self) -> bool:
        """Extract structured information from the resume."""
        if not self.cleaned_text:
            logger.error("No cleaned text available for information extraction")
            return False
        
        logger.info("Extracting structured information...")
        self.extracted_info = extract_all_information(self.cleaned_text)
        
        # Log summary of extracted information
        summary = self.extracted_info.get('summary', {})
        logger.info(f"Extraction complete: {summary.get('total_skills', 0)} skills, "
                   f"{summary.get('total_experience_entries', 0)} experience entries, "
                   f"{summary.get('total_education_entries', 0)} education entries")
        
        return True
    
    def calculate_scores(self) -> bool:
        """Calculate all scoring metrics."""
        if not self.cleaned_text or not self.extracted_info:
            logger.error("Missing required data for scoring")
            return False
        
        logger.info("Calculating scores...")
        self.scores = calculate_all_scores(self.cleaned_text, self.extracted_info, self.parsing_metadata)
        
        # Log score summary
        logger.info(f"Scoring complete: Readability={self.scores['readability']['score']}/10, "
                   f"Formatting={self.scores['formatting']['score']:.1f}/10, "
                   f"Job Match={self.scores['job_match']['percentage']:.1f}%")
        
        return True
    
    def generate_report(self) -> str:
        """Generate the final feedback report."""
        if not self.extracted_info or not self.scores:
            logger.error("Missing required data for report generation")
            return "Error: Cannot generate report due to missing data."
        
        logger.info("Generating final report...")
        report = generate_final_report(self.extracted_info, self.scores)
        return report
    
    def analyze(self) -> str:
        """Run the complete analysis workflow."""
        workflow_steps = [
            ("Validating input", self.validate_input),
            ("Parsing resume", self.parse_resume),
            ("Processing text", self.process_text),
            ("Extracting information", self.extract_information),
            ("Calculating scores", self.calculate_scores)
        ]
        
        for step_name, step_func in workflow_steps:
            logger.info(f"Step: {step_name}...")
            if not step_func():
                error_msg = f"Analysis failed at step: {step_name}"
                logger.error(error_msg)
                return f"❌ {error_msg}"
        
        # Generate and return the final report
        return self.generate_report()

def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="Resume Analyser Tool - Provides feedback on resume formatting and content",
        epilog="Example: python main.py my_resume.pdf --verbose"
    )
    parser.add_argument(
        "resume",
        help="Path to the resume file (PDF, DOCX, or TXT)"
    )
    parser.add_argument(
        "--output", "-o",
        default="report.txt",
        help="Path to save the text report file"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Enable verbose output for debugging"
    )
    return parser.parse_args()

def main():
    """Main entry point for the application."""
    print("🔍 Resume Analyser Tool")
    print("=" * 30)
    
    args = parse_arguments()
    
    if args.verbose:
        logger.setLevel(logging.DEBUG)
        # Set logger level for the package
        logging.getLogger('resume_analyser').setLevel(logging.DEBUG)
    
    try:
        analyser = ResumeAnalyser(args.resume)
        report = analyser.analyze()
        
        print("\n" + report + "\n")

        # Save the text report to a file
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(report)
        logger.info(f"Text report saved to {args.output}")
        
    except KeyboardInterrupt:
        print("\n\n⚠️  Analysis interrupted by user")
        return 130
    except Exception as e:
        logger.error(f"Unexpected error during analysis: {str(e)}")
        if args.verbose:
            import traceback
            traceback.print_exc()
        print(f"\n❌ Analysis failed: {str(e)}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
