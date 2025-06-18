"""
This file contains keyword lists and dictionaries used for information extraction
from resumes. Keeping them here helps to declutter the main extractor logic.
"""

STRONG_ACTION_VERBS = sorted(list(set([
    'administered', 'advocated', 'audited', 'authored', 'automated', 'budgeted', 'built', 'chaired', 'championed', 'changed',
    'coached', 'collaborated', 'conceptualised', 'conducted', 'consolidated', 'constructed', 'controlled', 'converted', 'coordinated', 
    'created', 'critiqued', 'customised', 'cut', 'decreased', 'defined', 'delegated', 'delivered', 'designed', 'developed', 'devised', 
    'diagnosed', 'directed', 'discovered', 'doubled', 'drove', 'eliminated', 'enabled', 'engineered', 'enhanced', 'established',
    'improved', 'improvised', 'inaugurated', 'increased', 'influenced', 'initiated', 'inspected', 'inspired', 'installed', 
    'instituted', 'integrated', 'invented', 'investigated', 'launched', 'led', 'managed', 'marketed', 'mastered', 'maximised', 
    'mediated', 'mentored', 'merged', 'minimised', 'modelled', 'moderated', 'modernised', 'modified', 'motivated', 'multiplied', 
    'navigated', 'negotiated', 'optimised', 'organised', 'overhauled', 'oversaw', 'piloted', 'pioneered', 'planned', 'prioritised', 
    'produced', 'programmed', 'projected', 'promoted', 'proposed', 'proved', 'rehabilitated', 'restored', 'retrofitted', 'supervised', 
    'validated', 'verified', 'analysed', 'assessed', 'calculated', 'calibrated', 'certified', 'detailed', 'drafted', 'estimated',
    'prototyped', 'surveyed', 'tested', 'reccomended'
])))

WEAK_ACTION_VERBS = sorted(list(set([
    'advised', 'aided', 'answered', 'arranged', 'assisted', 'balanced', 'blended', 'briefed', 'catalogued', 'classified', 
    'collected', 'communicated', 'compared', 'compiled', 'completed', 'computed', 'consulted', 'contacted', 'contributed', 
    'corrected', 'counseled', 'debated', 'debugged', 'demonstrated', 'distributed', 'documented', 'edited', 'educated', 
    'encouraged', 'ensured', 'examined', 'explained', 'explored', 'extracted', 'familiarised', 'fashioned', 'focused', 
    'formed', 'fulfilled', 'functioned', 'furnished', 'gained', 'gathered', 'grouped', 'handled', 'helped', 'hosted', 
    'illustrated', 'indexed', 'informed', 'instructed', 'interpreted', 'interviewed', 'introduced', 'joined', 'judged', 
    'justified', 'learned', 'lectured', 'licensed', 'listened', 'logged', 'maintained', 'manipulated', 'measured', 'met',
    'molded', 'monitored', 'moved', 'networked', 'observed', 'obtained', 'operated', 'ordered', 'oriented', 'participated', 
    'partnered', 'perceived', 'performed', 'persuaded', 'phased', 'prepared', 'presented', 'presided', 'prevented', 'printed',
     'processed', 'procured', 'proofread', 'protected', 'provided', 'repaired', 'determined', 'composed', 'detected'
])))

COMMON_JOB_TITLES = ['engineer', 'intern', 'manager', 'consultant', 'assistant', 'coordinator', 'specialist', 'analyst', 'designer', 'drafter']
DEGREE_KEYWORDS = ['bachelor', 'master', 'phd', 'doctorate', 'diploma', 'certificate', 'degree', 'b.eng', 'b.sc', 'm.eng', 'm.sc']
COMPANY_INDICATORS = ['ltd', 'inc', 'llc', 'corp', 'corporation', 'university', 'college', 'institute', 'consultants', 'group', 'services']

SOFT_SKILLS = {
    'Leadership': ['leader', 'team leader', 'leadership', 'mentorship', 'guidance', 'supervising', 'managed a team', 'leading'],
    'Driven': ['driven', 'motivated', 'self-motivated', 'goal-oriented', 'ambitious', 'ambition'],
    'Adaptability': ['adaptable', 'flexible', 'resilient', 'open to change', 'versatile', 'adaptability', 'adapt'],
    'Passionate': ['passionate', 'enthusiastic', 'committed', 'dedicated', 'eager', 'passion'],
    'Time Management': ['time management', 'organised', 'efficient', 'prioritisation', 'deadline-driven', 'organisation', 'organisational skills', 'scheduling'],
    'Analytical Skills': ['analytical skills', 'critical thinking', 'problem analysis', 'logical reasoning', 'analytical thinking', 'analytical'],
    'Problem-Solving': ['problem solving', 'problem-solving', 'troubleshooting', 'solution-oriented', 'decision making', 'problem solver'],
    'Attention to Detail': ['attention to detail', 'meticulous', 'accurate', 'thorough', 'detail oriented'],
    'Written Communication': ['written communication', 'report writing', 'documentation', 'technical writing', 'communicated'],
    'Verbal Communication': ['verbal communication', 'presentation', 'public speaking', 'interpersonal communication', 'listening skills', 'presentation skills'],
    'Presentation Skills': ['presentation skills', 'public speaking', 'visual communication', 'storytelling'],
    'Proactive': ['proactive', 'self-starter', 'initiative', 'forward-thinking'],
    'Initiative': ['initiative', 'self-driven', 'go-getter', 'entrepreneurial'],
    'Collaboration': ['collaborative', 'collaboration', 'team player', 'cooperative', 'partnership', 'teamwork', 'team work', 'group work', 'joint effort', 'team-oriented'],
    'Growth Mindset': ['growth mindset', 'continuous learning', 'self-improvement'],
    'Eagerness to Learn': ['eagerness to learn', 'curious', 'inquisitive', 'open-minded'],
    'Creativity': ['creativity', 'creative thinking', 'innovation', 'innovative'],
    'Work Ethic': ['work ethic', 'dedicated', 'reliable', 'dependable', 'hard-working'],
    'Interpersonal Skills': ['interpersonal skills', 'people skills', 'relationship building', 'stakeholder communication', 'client liaison'],
    'Negotiation': ['negotiation', 'negotiating', 'persuasion'],
    'Conflict Resolution': ['conflict resolution', 'mediation'],
    'Emotional Intelligence': ['emotional intelligence', 'eq']
}

CIVIL_ENGINEERING_SKILLS = {
    'AutoCAD': ['autocad', 'auto cad', 'auto-cad', 'acad'], 'Civil 3D': ['civil 3d', 'civil3d', 'c3d'],
    'Revit': ['revit'], '12d Model': ['12d model', '12d'], 'HEC-RAS': ['hec-ras', 'hec ras'],
    'Microsoft Office': ['microsoft office', 'ms office', 'excel', 'word', 'microsoft office suite'], 
    '3D modelling': ['3d modelling', '3d modeling', 'bim', '3d modelling software'],
    'technical calculations': ['technical calculations', 'engineering calculations'], 'engineering analysis': ['engineering analysis', 'structural analysis'],
    'flood modelling': ['flood modelling', 'flood modeling', 'hydraulic modelling'], 'traffic modelling': ['traffic modelling', 'traffic modeling'],
    'foundation design': ['foundation design', 'footing design'], 'slope stability analysis': ['slope stability', 'slope analysis'],
    'road design': ['road design', 'pavement design', 'roads and bridges', 'highway design', 'bridge design'], 
    'drainage design': ['drainage design', 'stormwater design'],
    'structural design': ['structural design', 'steel design', 'concrete design', 'structural'], 
    'hydrology': ['hydrology'], 'hydraulics': ['hydraulics'], 'stormwater management': ['stormwater management', 'stormwater'],
    'WSUD': ['wsud', 'water sensitive urban design'], 
    'geotechnical engineering': ['geotechnical engineering', 'geotechnical'],
    'site investigation': ['site investigation'], 'soil testing': ['soil testing', 'soil analysis'],
    'earthworks': ['earthworks', 'cut and fill'], 
    'transport engineering': ['transport engineering', 'transportation engineering', 'transport planning'],
    'technical reports': ['technical reports', 'engineering reports'], 
    'specifications': ['specifications', 'technical specifications'],
    'development applications': ['development applications', 'da preparation'], 
    'project planning': ['project planning', 'project management'],
    'cost estimation': ['cost estimation', 'estimating'], 
    'project delivery': ['project delivery', 'construction management'],
    'quality assurance': ['quality assurance', 'qa', 'quality control', 'qc'], 
    'land development': ['land development', 'subdivision design'],
    'infrastructure': ['infrastructure', 'civil infrastructure'], 
    'construction': ['construction', 'site supervision'],
    'surveying': ['surveying', 'land surveying'],
    'Facade Engineering': ['facade engineering', 'facades', 'facade'],
    'Tunneling': ['tunneling', 'tunnel design', 'tunnels'],
    'Rail Engineering': ['rail engineering', 'rail design', 'railways', 'rail'],
    'Water Engineering': ['water engineering', 'water resources', 'water networks', 'water'],
    'Wastewater Engineering': ['wastewater engineering', 'wastewater networks', 'sewerage design', 'wastewater'],
    'Sustainability': ['sustainability', 'sustainable design', 'esd'],
    'Environmental Engineering': ['environmental engineering', 'environmental management', 'environmental'],
    'Digital Transformation': ['digital transformation', 'bim implementation'],
    'Drafting': ['drafting', 'drawings', 'cad drafting']
} 