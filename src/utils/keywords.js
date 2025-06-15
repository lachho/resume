// Action verbs for achievement analysis
export const STRONG_ACTION_VERBS = [
  'accelerated', 'acceleration', 'achieved', 'advantage', 'administered', 'advocated', 'analysed',
  'assessed', 'audited', 'authored', 'automated', 'benefit', 'budgeted', 'built', 'calculated',
  'calibrated', 'certified', 'chaired', 'championed', 'changed', 'coached', 'collaborated',
  'conceptualised', 'conducted', 'consolidated', 'constructed', 'controlled', 'converted',
  'coordinated', 'created', 'critiqued', 'customised', 'decrease', 'decreased', 'defined',
  'delegated', 'delivered', 'designed', 'developed', 'development', 'devised', 'diagnosed', 'directed',
  'discovered', 'doubled', 'drafted', 'drove', 'effect', 'eliminated', 'enabled', 'engineered',
  'enhanced', 'enhancement', 'established', 'estimated', 'expedition', 'expedited', 'facilitated',
  'growth', 'impact', 'implemented', 'improved', 'improvement', 'improvised', 'inaugurated',
  'increase', 'increased', 'influenced', 'initiated', 'inspected', 'inspired', 'installed',
  'instituted', 'integrated', 'invented', 'investigated', 'launched', 'led', 'managed', 'marketed',
  'mastered', 'maximisation', 'maximised', 'mediated', 'mentored', 'merged', 'minimisation',
  'minimised', 'modelled', 'moderated', 'modernised', 'modified', 'motivated', 'multiplied',
  'navigated', 'negotiated', 'optimisation', 'optimised', 'organised', 'outcome', 'overhauled',
  'oversaw', 'piloted', 'pioneered', 'planned', 'prioritised', 'produced', 'programmed', 'projected',
  'promoted', 'promotion', 'proposed', 'proved', 'prototyped', 'rehabilitated', 'reduced',
  'reduction', 'restored', 'retrofitted', 'result', 'resulted', 'spearheaded', 'streamlined',
  'streamlining', 'supervised', 'surveyed', 'tested', 'transformed', 'validated', 'verified',
];

export const WEAK_ACTION_VERBS = [
  'advised', 'aided', 'answered', 'arranged', 'assisted', 'balanced', 'blended', 'briefed', 'catalogued', 'classified',
  'collected', 'communicated', 'compared', 'compiled', 'completed', 'computed', 'consulted', 'contacted', 'contributed',
  'corrected', 'counselled', 'debated', 'debugged', 'demonstrated', 'determined', 'detected', 'distributed', 'documented',
  'edited', 'educated', 'encouraged', 'ensured', 'examined', 'explained', 'explored', 'extracted', 'familiarised',
  'fashioned', 'focused', 'formed', 'fulfilled', 'functioned', 'furnished', 'gained', 'gathered', 'grouped', 'handled',
  'helped', 'hosted', 'illustrated', 'indexed', 'informed', 'instructed', 'interpreted', 'interviewed', 'introduced',
  'joined', 'judged', 'justified', 'learnt', 'lectured', 'licensed', 'listened', 'logged', 'maintained', 'manipulated',
  'measured', 'met', 'moulded', 'monitored', 'moved', 'networked', 'observed', 'obtained', 'operated', 'ordered',
  'oriented', 'participated', 'partnered', 'perceived', 'performed', 'persuaded', 'phased', 'prepared', 'presented',
  'presided', 'prevented', 'printed', 'processed', 'procured', 'proofread', 'protected', 'provided', 'repaired',
  'supported', 'analysed', "responsible", "tasked", "included", 'duties'
];

// Education keywords
export const DEGREE_KEYWORDS = [
  'bachelor', 'master', 'phd', 'doctorate', 'diploma', 'certificate', 'degree',
  'bachelor of engineering', 'master of engineering', 'bachelor of science',
  'master of science', 'bachelor of technology', 'master of technology',
  'bachelor of applied science', 'master of applied science', 'b.eng', 'b.sc',
  'm.eng', 'm.sc', 'bachelor of civil engineering', 'master of civil engineering',
];

// Civil Engineering specific skills
export const CIVIL_ENGINEERING_SKILLS = {
  // Design & Analysis
  'structural design': ['structural design', 'structural analysis', 'structural engineering', 'steel design', 'concrete design'],
  'autocad': ['autocad', 'auto cad', 'auto-cad', 'acad', 'cad', 'computer aided design'],
  'civil 3d': ['civil 3d', 'civil3d', 'c3d', 'autodesk civil 3d'],
  'revit': ['revit', 'bim', 'building information modelling'],
  '12d model': ['12d', '12d model', '12d design'],
  '3d modelling': ['3d modelling', '3d modeling', '3d design', 'bim', '3d modelling software'],
  
  // Technical Skills
  'technical calculations': ['calculations', 'structural calculations', 'engineering calculations', 'technical calculations'],
  'engineering analysis': ['analysis', 'engineering analysis', 'structural analysis', 'technical analysis'],
  'technical reports': ['reports', 'technical reports', 'engineering reports', 'design reports'],
  'project planning': ['project planning', 'planning', 'scheduling', 'project management'],
  'cost estimation': ['cost estimation', 'budgeting', 'estimating', 'cost planning'],
  
  // Specialised Areas
  'flood modelling': ['flood modelling', 'flood modeling', 'hydrology', 'hydraulic modelling', 'hec-ras', 'hec ras'],
  'traffic modelling': ['traffic modelling', 'traffic modeling', 'transport', 'traffic analysis', 'transport planning'],
  'drainage design': ['drainage', 'stormwater', 'water management', 'hydraulic design', 'stormwater management', 'wsud', 'water sensitive urban design'],
  'road design': ['road design', 'highway', 'transportation', 'pavement design', 'roads and bridges', 'bridge design'],
  'foundation design': ['foundation design', 'footing design', 'geotechnical engineering'],
  'slope stability': ['slope stability', 'slope analysis', 'geotechnical analysis'],
  'hydrology': ['hydrology', 'hydraulics', 'water resources'],
  'stormwater management': ['stormwater management', 'stormwater', 'water sensitive urban design', 'wsud'],
  'geotechnical engineering': ['geotechnical engineering', 'geotechnical', 'soil mechanics'],
  'site investigation': ['site investigation', 'soil testing', 'soil analysis'],
  'earthworks': ['earthworks', 'cut and fill', 'earthmoving'],
  'transport engineering': ['transport engineering', 'transportation engineering', 'transport planning', 'traffic engineering'],
  'technical specifications': ['specifications', 'technical specifications', 'design specifications'],
  'development applications': ['development applications', 'da preparation', 'planning applications'],
  'project delivery': ['project delivery', 'construction management', 'site supervision'],
  'quality assurance': ['quality assurance', 'qa', 'quality control', 'qc'],
  'land development': ['land development', 'subdivision design', 'urban development'],
  'infrastructure': ['infrastructure', 'civil infrastructure', 'public infrastructure'],
  'construction': ['construction', 'site supervision', 'construction management'],
  'surveying': ['surveying', 'land surveying', 'topographic surveying'],
  'facade engineering': ['facade engineering', 'facades', 'facade design'],
  'tunneling': ['tunneling', 'tunnel design', 'tunnels', 'underground construction'],
  'rail engineering': ['rail engineering', 'rail design', 'railways', 'rail infrastructure'],
  'water engineering': ['water engineering', 'water resources', 'water networks', 'water infrastructure'],
  'wastewater engineering': ['wastewater engineering', 'wastewater networks', 'sewerage design', 'wastewater treatment'],
  'sustainability': ['sustainability', 'sustainable design', 'esd', 'environmental sustainable design'],
  'environmental engineering': ['environmental engineering', 'environmental management', 'environmental assessment'],
  'digital transformation': ['digital transformation', 'bim implementation', 'digital engineering'],
  'drafting': ['drafting', 'drawings', 'cad drafting', 'technical drawing']
};

// Soft skills and professional attributes
export const SOFT_SKILLS = {
  // Leadership & Management
  'leadership': ['leadership', 'team leader', 'mentorship', 'guidance', 'supervising', 'managed a team', 'leading', 'supervision'],
  'driven': ['driven', 'motivated', 'self-motivated', 'goal-oriented', 'ambitious', 'ambition', 'determined', 'focused'],
  
  // Adaptability & Learning
  'adaptability': ['adaptable', 'flexible', 'resilient', 'open to change', 'versatile', 'adaptability', 'adapt', 'agile'],
  'growth mindset': ['growth mindset', 'continuous learning', 'self-improvement', 'professional development', 'upskilling'],
  'eagerness to learn': ['eagerness to learn', 'curious', 'inquisitive', 'open-minded', 'keen to learn', 'enthusiastic learner'],
  
  // Communication
  'written communication': ['written communication', 'report writing', 'documentation', 'technical writing', 'communicated', 'correspondence'],
  'verbal communication': ['verbal communication', 'presentation', 'public speaking', 'interpersonal communication', 'listening skills', 'oral communication'],
  'presentation skills': ['presentation skills', 'public speaking', 'visual communication', 'storytelling', 'presenting'],
  'interpersonal skills': ['interpersonal skills', 'people skills', 'relationship building', 'stakeholder communication', 'client liaison', 'team interaction'],
  
  // Professional Attributes
  'passionate': ['passionate', 'enthusiastic', 'committed', 'dedicated', 'eager', 'passion', 'zealous', 'devoted'],
  'time management': ['time management', 'organised', 'efficient', 'prioritisation', 'deadline-driven', 'organisation', 'organisational skills', 'scheduling', 'punctual'],
  'analytical skills': ['analytical skills', 'critical thinking', 'problem analysis', 'logical reasoning', 'analytical thinking', 'analytical', 'methodical'],
  'problem-solving': ['problem solving', 'problem-solving', 'troubleshooting', 'solution-oriented', 'decision making', 'problem solver', 'resolution'],
  'attention to detail': ['attention to detail', 'meticulous', 'accurate', 'thorough', 'detail oriented', 'precision', 'exactness'],
  'proactive': ['proactive', 'self-starter', 'initiative', 'forward-thinking', 'anticipatory', 'preventive'],
  'initiative': ['initiative', 'self-driven', 'go-getter', 'entrepreneurial', 'self-motivated', 'independent'],
  
  // Teamwork & Collaboration
  'collaboration': ['collaborative', 'collaboration', 'team player', 'cooperative', 'partnership', 'teamwork', 'team work', 'group work', 'joint effort', 'team-oriented'],
  'teamwork': ['teamwork', 'team player', 'collaborative', 'cooperative', 'supportive', 'team-oriented', 'group work'],
  
  // Creativity & Innovation
  'creativity': ['creativity', 'creative thinking', 'innovation', 'innovative', 'original', 'imaginative', 'resourceful'],
  
  // Professional Ethics
  'work ethic': ['work ethic', 'dedicated', 'reliable', 'dependable', 'hard-working', 'conscientious', 'professional', 'committed'],
  'negotiation': ['negotiation', 'negotiating', 'persuasion', 'influencing', 'bargaining', 'mediation'],
  'conflict resolution': ['conflict resolution', 'mediation', 'dispute resolution', 'problem resolution', 'conflict management'],
  'emotional intelligence': ['emotional intelligence', 'eq', 'empathy', 'self-awareness', 'social awareness', 'relationship management'],

  // Professional Development
  'continuous improvement': ['continuous improvement', 'kaizen', 'process improvement', 'quality improvement', 'ongoing development'],
  'professional development': ['professional development', 'career development', 'skill development', 'upskilling', 'reskilling'],
  'mentoring': ['mentoring', 'coaching', 'guidance', 'development', 'support', 'advice'],
  'knowledge sharing': ['knowledge sharing', 'knowledge transfer', 'information sharing', 'collaborative learning', 'peer learning'],
  
  // Project Management
  'project management': ['project management', 'project delivery', 'project coordination', 'project planning', 'project execution'],
  'stakeholder management': ['stakeholder management', 'stakeholder engagement', 'stakeholder communication', 'stakeholder relations'],
  'risk management': ['risk management', 'risk assessment', 'risk mitigation', 'risk analysis', 'risk control'],
  'change management': ['change management', 'change implementation', 'change adoption', 'change facilitation', 'change leadership'],
  
  // Business Acumen
  'business acumen': ['business acumen', 'commercial awareness', 'business understanding', 'market awareness', 'industry knowledge'],
  'strategic thinking': ['strategic thinking', 'strategic planning', 'strategic analysis', 'strategic vision', 'strategic insight'],
  'financial literacy': ['financial literacy', 'budget management', 'cost control', 'financial planning', 'financial analysis'],
  'market awareness': ['market awareness', 'industry trends', 'market analysis', 'competitive analysis', 'market intelligence'],
  
  // Innovation & Technology
  'digital literacy': ['digital literacy', 'digital skills', 'technology proficiency', 'digital competence', 'tech-savvy'],
  'innovation': ['innovation', 'innovative thinking', 'creative problem-solving', 'design thinking', 'ideation'],
  'technical aptitude': ['technical aptitude', 'technical understanding', 'technical knowledge', 'technical capability'],
  'data literacy': ['data literacy', 'data analysis', 'data interpretation', 'data-driven', 'data insights'],
  
  // Communication & Influence
  'influencing': ['influencing', 'persuasion', 'negotiation', 'advocacy', 'stakeholder influence'],
  'presentation': ['presentation', 'public speaking', 'visual communication', 'storytelling', 'pitching'],
  'technical writing': ['technical writing', 'documentation', 'report writing', 'specification writing', 'proposal writing'],
  'cross-cultural communication': ['cross-cultural communication', 'cultural awareness', 'cultural sensitivity', 'global communication'],
  
  // Personal Effectiveness
  'resilience': ['resilience', 'adaptability', 'stress management', 'coping skills', 'emotional strength'],
  'self-management': ['self-management', 'self-discipline', 'self-motivation', 'self-direction', 'autonomy'],
  'work-life balance': ['work-life balance', 'wellbeing', 'health management', 'stress management', 'lifestyle management'],
  'professional ethics': ['professional ethics', 'integrity', 'honesty', 'transparency', 'accountability'],
  
  // Team & Leadership
  'team leadership': ['team leadership', 'team management', 'team development', 'team building', 'team coaching'],
  'delegation': ['delegation', 'task assignment', 'responsibility management', 'work distribution', 'team coordination'],
  'conflict management': ['conflict management', 'dispute resolution', 'conflict resolution', 'mediation', 'negotiation'],
  'diversity and inclusion': ['diversity and inclusion', 'cultural diversity', 'inclusive leadership', 'equity', 'belonging'],
  
  // Customer Focus
  'customer focus': ['customer focus', 'client focus', 'customer service', 'client service', 'customer experience'],
  'service orientation': ['service orientation', 'customer orientation', 'client orientation', 'service delivery', 'customer satisfaction'],
  'relationship building': ['relationship building', 'client relationships', 'stakeholder relationships', 'networking', 'partnership building'],
  'customer insight': ['customer insight', 'client understanding', 'customer needs', 'client requirements', 'customer analysis']
};

// Job requirements data structure
export const JOB_REQUIREMENTS = {
  "academics": {
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

// Section headers commonly found in resumes
export const SECTION_HEADERS = {
  profile: [
    'career profile',
    'professional profile',
    'career summary',
    'professional summary',
    'executive summary',
    'career objective',
    'professional objective',
    'career statement',
    'professional statement',
    'profile',
    'summary',
    'objective',
    'career overview',
    'professional overview'
  ],
  experience: [
    'experience',
    'work experience',
    'employment',
    'professional experience',
    'work history',
    'career history',
    'employment history',
    'professional background',
    'work background',
    'employment background'
  ],
  education: [
    'education',
    'academic',
    'qualifications',
    'degrees',
    'university',
    'tertiary education',
    'academic background'
  ],
  skills: [
    'skills',
    'technical skills',
    'core competencies',
    'expertise',
    'capabilities',
    'key skills',
    'professional skills'
  ],
  projects: [
    'projects',
    'project experience',
    'key projects',
    'project portfolio',
    'notable projects',
    'project highlights'
  ],
  certifications: [
    'certifications',
    'certificates',
    'licenses',
    'accreditations',
    'professional memberships',
    'qualifications',
    'training'
  ]
};
