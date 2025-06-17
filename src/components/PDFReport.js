import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { analyseJobRequirements } from '../analysers/jobRequirementsAnalyser';

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1f2937',
  },
  section: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  overallScore: {
    color: '#4f46e5',
  },
  atsScore: {
    color: '#059669',
  },
  contentScore: {
    color: '#2563eb',
  },
  messageBox: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
    border: '1px solid #e5e7eb',
  },
  messageText: {
    fontSize: 11,
    color: '#374151',
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 4,
    border: '1px solid #e5e7eb',
  },
  strengthsItem: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  improvementsItem: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  strengthsTitle: {
    color: '#166534',
  },
  improvementsTitle: {
    color: '#92400e',
  },
  listItem: {
    fontSize: 10,
    marginBottom: 3,
    paddingLeft: 8,
  },
  strengthsText: {
    color: '#15803d',
  },
  improvementsText: {
    color: '#b45309',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#374151',
    flex: 1,
  },
  detailValue: {
    fontSize: 11,
    color: '#6b7280',
    flex: 1,
  },
  cardSection: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    border: '1px solid #e5e7eb',
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#374151',
  },
  exampleBox: {
    backgroundColor: '#f3f4f6',
    padding: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 9,
    color: '#4b5563',
    fontStyle: 'italic',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    marginTop: 3,
  },
  tag: {
    fontSize: 8,
    padding: 2,
    borderRadius: 2,
    backgroundColor: '#e5e7eb',
    color: '#374151',
  },
  strengthTag: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  weakTag: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  skillTag: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  sectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionBox: {
    backgroundColor: '#ffffff',
    padding: 6,
    borderRadius: 4,
    border: '1px solid #e5e7eb',
    minWidth: '30%',
    marginBottom: 6,
  },
  sectionName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 3,
  },
  sectionCount: {
    fontSize: 8,
    color: '#6b7280',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    paddingTop: 15,
    borderTop: '1px solid #e5e7eb',
  },
  footerText: {
    fontSize: 9,
    color: '#6b7280',
  },
});

const PDFReport = ({ results }) => {
  const { overall, ats, content, sections } = results;
  
  // Generate job requirements data
  const jobRequirementsData = results && results.originalText 
    ? analyseJobRequirements(results.originalText) 
    : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Resume Analysis Report</Text>
        
        {/* Overall Score Section */}
        <View style={styles.section}>
          <View style={styles.scoreContainer}>
            <Text style={styles.sectionTitle}>Overall Score:</Text>
            <Text style={[styles.score, styles.overallScore]}>{overall.finalScore}/100</Text>
          </View>
          
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>
              {overall.finalScore >= 85 ? '🎉 Outstanding resume! Ready for top-tier applications' :
               overall.finalScore >= 75 ? '✅ Strong resume with minor optimisation opportunities' :
               overall.finalScore >= 65 ? '🟡 Good foundation - focus on key improvement areas' :
               '⚠️ Room for improvement - address critical areas below'}
            </Text>
          </View>

          <View style={styles.gridContainer}>
            <View style={[styles.gridItem, styles.strengthsItem]}>
              <Text style={[styles.itemTitle, styles.strengthsTitle]}>✅ Key Strengths</Text>
              {overall.strengths.map((strength, index) => (
                <Text key={index} style={[styles.listItem, styles.strengthsText]}>
                  • {strength}
                </Text>
              ))}
            </View>
            
            <View style={[styles.gridItem, styles.improvementsItem]}>
              <Text style={[styles.itemTitle, styles.improvementsTitle]}>🎯 Priority Improvements</Text>
              {overall.areasForImprovement.map((area, index) => (
                <Text key={index} style={[styles.listItem, styles.improvementsText]}>
                  • {area}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* ATS Compatibility Section */}
        <View style={styles.section}>
          <View style={styles.scoreContainer}>
            <Text style={styles.sectionTitle}>ATS Compatibility:</Text>
            <Text style={[styles.score, styles.atsScore]}>{ats.score}/100</Text>
          </View>
          
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{ats.message}</Text>
          </View>

          <View style={styles.gridContainer}>
            {ats.details && (
              <View style={styles.cardSection}>
                <Text style={styles.cardTitle}>📊 Key Metrics</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Word Count:</Text>
                  <Text style={styles.detailValue}>{ats.details.wordCount}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Page Count:</Text>
                  <Text style={styles.detailValue}>{ats.details.pageCount}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Images:</Text>
                  <Text style={styles.detailValue}>{ats.details.images}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Bullet Points:</Text>
                  <Text style={styles.detailValue}>{ats.details.bulletPoints}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Long Sentences:</Text>
                  <Text style={styles.detailValue}>{ats.details.longSentences}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Special Characters:</Text>
                  <Text style={styles.detailValue}>{ats.details.specialCharacters}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Long Lines:</Text>
                  <Text style={styles.detailValue}>{ats.details.longLines}</Text>
                </View>
              </View>
            )}

            {ats.recommendations && (
              <View style={styles.cardSection}>
                <Text style={styles.cardTitle}>📋 Recommendations</Text>
                {ats.recommendations.slice(0, 5).map((rec, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {rec}
                  </Text>
                ))}
                {ats.recommendations.length > 5 && (
                  <Text style={[styles.listItem, { fontStyle: 'italic' }]}>
                    ...and {ats.recommendations.length - 5} more recommendations
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>

        {/* Content Quality Section */}
        <View style={styles.section}>
          <View style={styles.scoreContainer}>
            <Text style={styles.sectionTitle}>Content Quality:</Text>
            <Text style={[styles.score, styles.contentScore]}>{content.score}/100</Text>
          </View>
          
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{content.summary}</Text>
          </View>

          {/* Strong Achievement Lines */}
          {content.totalAchievements !== undefined && (
            <View style={styles.cardSection}>
              <Text style={[styles.cardTitle, styles.strengthsTitle]}>
                ✅ Strong Achievement Lines ({content.totalAchievements})
              </Text>
              {content.totalAchievements > 0 ? (
                <>
                  {content.achievementLines.slice(0, 2).map((item, index) => (
                    <View key={index} style={styles.exampleBox}>
                      <Text style={styles.exampleText}>"{item.line}"</Text>
                      <View style={styles.tagContainer}>
                        <Text style={styles.detailLabel}>Strong verbs: </Text>
                        {item.strongVerbs.slice(0, 3).map((verb, i) => (
                          <Text key={i} style={[styles.tag, styles.strengthTag]}>{verb}</Text>
                        ))}
                      </View>
                      <View style={styles.tagContainer}>
                        <Text style={styles.detailLabel}>Metrics: </Text>
                        {item.metrics.slice(0, 3).map((metric, i) => (
                          <Text key={i} style={[styles.tag, styles.skillTag]}>{metric}</Text>
                        ))}
                      </View>
                    </View>
                  ))}
                  {content.totalAchievements > 2 && (
                    <Text style={[styles.exampleText, { textAlign: 'center' }]}>
                      ...and {content.totalAchievements - 2} more achievement lines
                    </Text>
                  )}
                </>
              ) : (
                <Text style={styles.exampleText}>
                  No strong achievement lines detected. Consider adding quantifiable results.
                </Text>
              )}
            </View>
          )}

          {/* Strong Verbs Without Metrics */}
          {content.totalStrongWithoutMetrics > 0 && (
            <View style={styles.cardSection}>
              <Text style={[styles.cardTitle, { color: '#92400e' }]}>
                💡 Good Action Verbs - Consider Adding Metrics ({content.totalStrongWithoutMetrics})
              </Text>
              {content.strongVerbsWithoutMetrics.slice(0, 2).map((item, index) => (
                <View key={index} style={styles.exampleBox}>
                  <Text style={styles.exampleText}>"{item.line}"</Text>
                  <View style={styles.tagContainer}>
                    <Text style={styles.detailLabel}>Strong verbs: </Text>
                    {item.strongVerbs.map((verb, i) => (
                      <Text key={i} style={[styles.tag, { backgroundColor: '#fcd34d', color: '#92400e' }]}>{verb}</Text>
                    ))}
                  </View>
                </View>
              ))}
              {content.totalStrongWithoutMetrics > 2 && (
                <Text style={[styles.exampleText, { textAlign: 'center' }]}>
                  ...and {content.totalStrongWithoutMetrics - 2} more lines
                </Text>
              )}
            </View>
          )}

          {/* Weak Lines */}
          {content.totalWeakLines > 0 && (
            <View style={styles.cardSection}>
              <Text style={[styles.cardTitle, { color: '#991b1b' }]}>
                ⚠️ Weak Action Verbs ({content.totalWeakLines})
              </Text>
              {content.weakLines.slice(0, 2).map((item, index) => (
                <View key={index} style={styles.exampleBox}>
                  <Text style={styles.exampleText}>"{item.line}"</Text>
                  <View style={styles.tagContainer}>
                    <Text style={styles.detailLabel}>Weak verbs: </Text>
                    {item.weakVerbs.map((verb, i) => (
                      <Text key={i} style={[styles.tag, styles.weakTag]}>{verb}</Text>
                    ))}
                  </View>
                </View>
              ))}
              {content.totalWeakLines > 2 && (
                <Text style={[styles.exampleText, { textAlign: 'center' }]}>
                  ...and {content.totalWeakLines - 2} more weak lines
                </Text>
              )}
            </View>
          )}

          {/* Personal Pronouns */}
          {content.totalPersonalPronouns > 0 && (
            <View style={styles.cardSection}>
              <Text style={[styles.cardTitle, { color: '#991b1b' }]}>
                ❌ Personal Pronouns ({content.totalPersonalPronouns})
              </Text>
              {content.personalPronounLines.slice(0, 2).map((item, index) => (
                <View key={index} style={styles.exampleBox}>
                  <Text style={styles.exampleText}>"{item.line}"</Text>
                  <View style={styles.tagContainer}>
                    <Text style={styles.detailLabel}>Pronouns: </Text>
                    {item.pronouns.map((pronoun, i) => (
                      <Text key={i} style={[styles.tag, styles.weakTag]}>{pronoun}</Text>
                    ))}
                  </View>
                </View>
              ))}
              {content.totalPersonalPronouns > 2 && (
                <Text style={[styles.exampleText, { textAlign: 'center' }]}>
                  ...and {content.totalPersonalPronouns - 2} more lines with pronouns
                </Text>
              )}
            </View>
          )}

          {/* Content Recommendations */}
          {content.recommendations && (
            <View style={styles.cardSection}>
              <Text style={styles.cardTitle}>📋 Content Recommendations</Text>
              {content.recommendations.slice(0, 4).map((rec, index) => (
                <Text key={index} style={styles.listItem}>
                  • {rec}
                </Text>
              ))}
              {content.recommendations.length > 4 && (
                <Text style={[styles.listItem, { fontStyle: 'italic' }]}>
                  ...and {content.recommendations.length - 4} more recommendations
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Job Requirements Match Section */}
        {jobRequirementsData && (
          <View style={styles.section}>
            <View style={styles.scoreContainer}>
              <Text style={styles.sectionTitle}>Job Requirements Match:</Text>
              <Text style={[styles.score, { color: '#7c3aed' }]}>{jobRequirementsData.score}/100</Text>
            </View>
            
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>{jobRequirementsData.message}</Text>
            </View>

            <View style={styles.gridContainer}>
              {/* Academic Requirements */}
              <View style={styles.cardSection}>
                <Text style={[styles.cardTitle, styles.strengthsTitle]}>
                  🎓 Academic Requirements ({jobRequirementsData.matches.academics.score}%)
                </Text>
                {jobRequirementsData.matches.academics.found.length > 0 && (
                  <>
                    <Text style={[styles.detailLabel, { color: '#15803d' }]}>
                      Found ({jobRequirementsData.matches.academics.found.length}):
                    </Text>
                    <View style={styles.tagContainer}>
                      {jobRequirementsData.matches.academics.found.map((item, i) => (
                        <Text key={i} style={[styles.tag, styles.strengthTag]}>{item}</Text>
                      ))}
                    </View>
                  </>
                )}
                {jobRequirementsData.matches.academics.missing.length > 0 && (
                  <>
                    <Text style={[styles.detailLabel, { marginTop: 5 }]}>
                      Missing ({jobRequirementsData.matches.academics.missing.length}):
                    </Text>
                    <View style={styles.tagContainer}>
                      {jobRequirementsData.matches.academics.missing.slice(0, 4).map((item, i) => (
                        <Text key={i} style={styles.tag}>{item}</Text>
                      ))}
                    </View>
                  </>
                )}
              </View>

              {/* Technical Skills */}
              <View style={styles.cardSection}>
                <Text style={[styles.cardTitle, { color: '#1e40af' }]}>
                  ⚙️ Technical Skills ({jobRequirementsData.matches.hardSkills.score}%)
                </Text>
                {jobRequirementsData.matches.hardSkills.found.length > 0 && (
                  <>
                    <Text style={[styles.detailLabel, { color: '#2563eb' }]}>
                      Found ({jobRequirementsData.matches.hardSkills.found.length}):
                    </Text>
                    <View style={styles.tagContainer}>
                      {jobRequirementsData.matches.hardSkills.found.slice(0, 6).map((item, i) => (
                        <Text key={i} style={[styles.tag, styles.skillTag]}>{item}</Text>
                      ))}
                    </View>
                    {jobRequirementsData.matches.hardSkills.found.length > 6 && (
                      <Text style={[styles.exampleText, { textAlign: 'center' }]}>
                        ...and {jobRequirementsData.matches.hardSkills.found.length - 6} more
                      </Text>
                    )}
                  </>
                )}
                {jobRequirementsData.matches.hardSkills.missing.length > 0 && (
                  <>
                    <Text style={[styles.detailLabel, { marginTop: 5 }]}>High Priority Missing:</Text>
                    <View style={styles.tagContainer}>
                      {jobRequirementsData.matches.hardSkills.missing.slice(0, 4).map((item, i) => (
                        <Text key={i} style={styles.tag}>{item}</Text>
                      ))}
                    </View>
                  </>
                )}
              </View>
            </View>

            {/* Professional Skills */}
            <View style={styles.cardSection}>
              <Text style={[styles.cardTitle, styles.strengthsTitle]}>
                💡 Professional Skills ({jobRequirementsData.matches.softSkills.score}%)
              </Text>
              {jobRequirementsData.matches.softSkills.found.length > 0 && (
                <>
                  <Text style={[styles.detailLabel, { color: '#15803d' }]}>
                    Found ({jobRequirementsData.matches.softSkills.found.length}):
                  </Text>
                  <View style={styles.tagContainer}>
                    {jobRequirementsData.matches.softSkills.found.map((item, i) => (
                      <Text key={i} style={[styles.tag, styles.strengthTag]}>{item}</Text>
                    ))}
                  </View>
                </>
              )}
              {jobRequirementsData.matches.softSkills.missing.length > 0 && (
                <>
                  <Text style={[styles.detailLabel, { marginTop: 5 }]}>
                    Missing ({jobRequirementsData.matches.softSkills.missing.length}):
                  </Text>
                  <View style={styles.tagContainer}>
                    {jobRequirementsData.matches.softSkills.missing.slice(0, 6).map((item, i) => (
                      <Text key={i} style={styles.tag}>{item}</Text>
                    ))}
                  </View>
                </>
              )}
            </View>

            {/* Job Match Recommendations */}
            {jobRequirementsData.recommendations && jobRequirementsData.recommendations.length > 0 && (
              <View style={styles.cardSection}>
                <Text style={styles.cardTitle}>📋 Job Match Recommendations</Text>
                {jobRequirementsData.recommendations.slice(0, 3).map((rec, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {rec}
                  </Text>
                ))}
                {jobRequirementsData.recommendations.length > 3 && (
                  <Text style={[styles.listItem, { fontStyle: 'italic' }]}>
                    ...and {jobRequirementsData.recommendations.length - 3} more recommendations
                  </Text>
                )}
              </View>
            )}
          </View>
        )}

        {/* Resume Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resume Sections Detected</Text>
          <View style={styles.sectionsGrid}>
            {Object.entries(sections).map(([key, value]) => {
              if (Array.isArray(value) && value.length > 0) {
                return (
                  <View key={key} style={styles.sectionBox}>
                    <Text style={styles.sectionName}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Text>
                    <Text style={styles.sectionCount}>
                      {value.length} item{value.length !== 1 ? 's' : ''} found
                    </Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated by Resume Analyser - lachho.github.io/resume
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Function to generate and download PDF
export const generatePDF = async (results) => {
  try {
    const doc = <PDFReport results={results} />;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-analysis-report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

export default PDFReport; 