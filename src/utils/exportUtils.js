// HTML Export Utility for copying formatted analysis to clipboard
import { analyseJobRequirements } from '../analysers/jobRequirementsAnalyser';

export const generateHTMLReport = (results) => {
  const { overall, ats, content, sections } = results;
  
  // Generate job requirements data
  const jobRequirementsData = results && results.originalText 
    ? analyseJobRequirements(results.originalText) 
    : null;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <h1 style="color: #1f2937; font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 20px;">
        Resume Analysis Report
      </h1>
      
      <!-- Overall Score Section -->
      <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; font-size: 22px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center;">
          Overall Score: <span style="color: #4f46e5; font-size: 32px; margin-left: 15px;">${overall.finalScore}/100</span>
        </h2>
        <div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 6px; padding: 12px; margin-bottom: 15px;">
          <p style="color: #3730a3; font-weight: 500; margin: 0;">
            ${overall.finalScore >= 85 ? '🎉 Outstanding resume! Ready for top-tier applications' :
              overall.finalScore >= 75 ? '✅ Strong resume with minor optimisation opportunities' :
              overall.finalScore >= 65 ? '🟡 Good foundation - focus on key improvement areas' :
              '⚠️ Room for improvement - address critical areas below'}
          </p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 15px;">
            <h3 style="color: #166534; font-size: 16px; font-weight: 600; margin-bottom: 10px;">
              ✅ Key Strengths
            </h3>
            <ul style="margin: 0; padding-left: 20px; color: #15803d;">
              ${overall.strengths.map(strength => `<li style="margin-bottom: 5px;">${strength}</li>`).join('')}
            </ul>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 15px;">
            <h3 style="color: #92400e; font-size: 16px; font-weight: 600; margin-bottom: 10px;">
              🎯 Priority Improvements
            </h3>
            <ul style="margin: 0; padding-left: 20px; color: #b45309;">
              ${overall.areasForImprovement.map(area => `<li style="margin-bottom: 5px;">${area}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- ATS Compatibility Section -->
      <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; font-size: 22px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center;">
          ATS Compatibility: <span style="color: #059669; font-size: 32px; margin-left: 15px;">${ats.score}/100</span>
        </h2>
        <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 12px; margin-bottom: 15px;">
          <p style="color: #065f46; font-weight: 500; margin: 0;">${ats.message}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          ${ats.details ? `
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px;">
            <h3 style="color: #374151; font-size: 16px; font-weight: 600; margin-bottom: 10px;">📊 Key Metrics</h3>
            <div style="color: #4b5563; font-size: 14px;">
              <div style="margin-bottom: 5px;"><strong>Word Count:</strong> ${ats.details.wordCount}</div>
              <div style="margin-bottom: 5px;"><strong>Page Count:</strong> ${ats.details.pageCount}</div>
              <div style="margin-bottom: 5px;"><strong>Images:</strong> ${ats.details.images}</div>
              <div style="margin-bottom: 5px;"><strong>Bullet Points:</strong> ${ats.details.bulletPoints}</div>
              <div style="margin-bottom: 5px;"><strong>Long Sentences:</strong> ${ats.details.longSentences}</div>
              <div style="margin-bottom: 5px;"><strong>Special Characters:</strong> ${ats.details.specialCharacters}</div>
              <div><strong>Long Lines:</strong> ${ats.details.longLines}</div>
            </div>
          </div>
          ` : ''}
          
          ${ats.recommendations ? `
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px;">
            <h3 style="color: #374151; font-size: 16px; font-weight: 600; margin-bottom: 10px;">📋 Recommendations</h3>
            <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px;">
              ${ats.recommendations.map(rec => `<li style="margin-bottom: 5px;">${rec}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
        </div>
      </div>

      <!-- Content Quality Section -->
      <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; font-size: 22px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center;">
          Content Quality: <span style="color: #2563eb; font-size: 32px; margin-left: 15px;">${content.score}/100</span>
        </h2>
        <div style="background: #eff6ff; border: 1px solid #93c5fd; border-radius: 6px; padding: 12px; margin-bottom: 15px;">
          <p style="color: #1e40af; font-weight: 500; margin: 0;">${content.summary}</p>
        </div>
        
        <!-- Content Quality Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
          ${content.totalAchievements !== undefined ? `
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 15px;">
            <h3 style="color: #166534; font-size: 14px; font-weight: 600; margin-bottom: 10px;">
              ✅ Strong Achievement Lines (${content.totalAchievements})
            </h3>
            ${content.totalAchievements > 0 ? `
              ${content.achievementLines.slice(0, 3).map(item => `
                <div style="background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 4px; padding: 10px; margin-bottom: 8px;">
                  <p style="color: #166534; font-size: 13px; font-weight: 500; margin-bottom: 5px;">"${item.line}"</p>
                  <div style="font-size: 11px;">
                    <span style="color: #15803d;">Strong verbs: </span>
                    ${item.strongVerbs.map(verb => `<span style="background: #bbf7d0; color: #166534; padding: 2px 6px; border-radius: 3px; margin-right: 4px;">${verb}</span>`).join('')}
                    <br><span style="color: #2563eb;">Metrics: </span>
                    ${item.metrics.map(metric => `<span style="background: #dbeafe; color: #1d4ed8; padding: 2px 6px; border-radius: 3px; margin-right: 4px;">${metric}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
              ${content.totalAchievements > 3 ? `<p style="color: #15803d; font-size: 12px; margin: 0;">...and ${content.totalAchievements - 3} more</p>` : ''}
            ` : `
              <p style="color: #6b7280; font-size: 13px; font-style: italic;">No strong achievement lines detected. Consider adding quantifiable results to your accomplishments.</p>
            `}
          </div>
          ` : ''}
          
          ${content.totalStrongWithoutMetrics > 0 ? `
          <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 15px;">
            <h3 style="color: #92400e; font-size: 14px; font-weight: 600; margin-bottom: 10px;">
              💡 Good Action Verbs - Consider Adding Metrics (${content.totalStrongWithoutMetrics})
            </h3>
            ${content.strongVerbsWithoutMetrics.slice(0, 3).map(item => `
              <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 4px; padding: 10px; margin-bottom: 8px;">
                <p style="color: #92400e; font-size: 13px; font-weight: 500; margin-bottom: 5px;">"${item.line}"</p>
                <div style="font-size: 11px;">
                  <span style="color: #b45309;">Strong verbs: </span>
                  ${item.strongVerbs.map(verb => `<span style="background: #fcd34d; color: #92400e; padding: 2px 6px; border-radius: 3px; margin-right: 4px;">${verb}</span>`).join('')}
                </div>
              </div>
            `).join('')}
            ${content.totalStrongWithoutMetrics > 3 ? `<p style="color: #b45309; font-size: 12px; margin: 0;">...and ${content.totalStrongWithoutMetrics - 3} more</p>` : ''}
          </div>
          ` : ''}
          
          ${content.totalWeakLines > 0 ? `
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 15px;">
            <h3 style="color: #991b1b; font-size: 14px; font-weight: 600; margin-bottom: 10px;">
              ⚠️ Weak Action Verbs - Consider Stronger Alternatives (${content.totalWeakLines})
            </h3>
            ${content.weakLines.slice(0, 3).map(item => `
              <div style="background: #fee2e2; border: 1px solid #fecaca; border-radius: 4px; padding: 10px; margin-bottom: 8px;">
                <p style="color: #991b1b; font-size: 13px; font-weight: 500; margin-bottom: 5px;">"${item.line}"</p>
                <div style="font-size: 11px;">
                  <span style="color: #dc2626;">Weak verbs: </span>
                  ${item.weakVerbs.map(verb => `<span style="background: #fecaca; color: #991b1b; padding: 2px 6px; border-radius: 3px; margin-right: 4px;">${verb}</span>`).join('')}
                </div>
              </div>
            `).join('')}
            ${content.totalWeakLines > 3 ? `<p style="color: #dc2626; font-size: 12px; margin: 0;">...and ${content.totalWeakLines - 3} more</p>` : ''}
          </div>
          ` : ''}
          
          ${content.totalPersonalPronouns > 0 ? `
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 15px;">
            <h3 style="color: #991b1b; font-size: 14px; font-weight: 600; margin-bottom: 10px;">
              ❌ Personal Pronouns (${content.totalPersonalPronouns})
            </h3>
            ${content.personalPronounLines.slice(0, 3).map(item => `
              <div style="background: #fee2e2; border: 1px solid #fecaca; border-radius: 4px; padding: 10px; margin-bottom: 8px;">
                <p style="color: #991b1b; font-size: 13px; font-weight: 500; margin-bottom: 5px;">"${item.line}"</p>
                <div style="font-size: 11px;">
                  <span style="color: #dc2626;">Found pronouns: </span>
                  ${item.pronouns.map(pronoun => `<span style="background: #fecaca; color: #991b1b; padding: 2px 6px; border-radius: 3px; margin-right: 4px;">${pronoun}</span>`).join('')}
                </div>
              </div>
            `).join('')}
            ${content.totalPersonalPronouns > 3 ? `<p style="color: #dc2626; font-size: 12px; margin: 0;">...and ${content.totalPersonalPronouns - 3} more</p>` : ''}
          </div>
          ` : ''}
          
          ${content.recommendations ? `
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px;">
            <h3 style="color: #374151; font-size: 14px; font-weight: 600; margin-bottom: 10px;">📋 Content Recommendations</h3>
            <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 13px;">
              ${content.recommendations.slice(0, 5).map(rec => `<li style="margin-bottom: 4px;">${rec}</li>`).join('')}
              ${content.recommendations.length > 5 ? `<li style="color: #6b7280; font-style: italic;">...and ${content.recommendations.length - 5} more recommendations</li>` : ''}
            </ul>
          </div>
          ` : ''}
        </div>
      </div>

      ${jobRequirementsData ? `
      <!-- Job Requirements Match Section -->
      <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; font-size: 22px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center;">
          Job Requirements Match: <span style="color: #7c3aed; font-size: 32px; margin-left: 15px;">${jobRequirementsData.score}/100</span>
        </h2>
        <div style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 6px; padding: 12px; margin-bottom: 15px;">
          <p style="color: #374151; font-weight: 500; margin: 0 0 8px 0;">${jobRequirementsData.message}</p>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Your resume was compared against 
            <a href="https://lachho.github.io/resume/#/job-description" style="color: #7c3aed; text-decoration: underline; font-weight: 500;" target="_blank" rel="noopener noreferrer">this job description</a>
            to assess alignment with typical industry requirements and ATS compatibility.
          </p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
          <!-- Academic Requirements -->
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 15px;">
            <h3 style="color: #166534; font-size: 14px; font-weight: 600; margin-bottom: 10px;">
              🎓 Academic Requirements ${jobRequirementsData.matches.academics.score >= 80 ? '✅' : jobRequirementsData.matches.academics.score >= 50 ? '🟡' : '❌'} ${jobRequirementsData.matches.academics.score}%
            </h3>
            ${jobRequirementsData.matches.academics.found.length > 0 ? `
              <div style="margin-bottom: 10px;">
                <h4 style="color: #15803d; font-size: 12px; font-weight: 600; margin-bottom: 5px;">Found (${jobRequirementsData.matches.academics.found.length})</h4>
                <div>
                  ${jobRequirementsData.matches.academics.found.map(item => `<span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 3px; margin-right: 4px; margin-bottom: 4px; display: inline-block; font-size: 11px;">${item}</span>`).join('')}
                </div>
              </div>
            ` : ''}
            ${jobRequirementsData.matches.academics.missing.length > 0 ? `
              <div>
                <h4 style="color: #6b7280; font-size: 12px; font-weight: 600; margin-bottom: 5px;">Not Found (${jobRequirementsData.matches.academics.missing.length})</h4>
                <div>
                  ${jobRequirementsData.matches.academics.missing.slice(0, 4).map(item => `<span style="background: #f3f4f6; color: #6b7280; padding: 2px 6px; border-radius: 3px; margin-right: 4px; margin-bottom: 4px; display: inline-block; font-size: 11px;">${item}</span>`).join('')}
                  ${jobRequirementsData.matches.academics.missing.length > 4 ? `<span style="color: #6b7280; font-size: 11px;">...+${jobRequirementsData.matches.academics.missing.length - 4} more</span>` : ''}
                </div>
              </div>
            ` : ''}
          </div>
          
          <!-- Technical Skills -->
          <div style="background: #eff6ff; border: 1px solid #93c5fd; border-radius: 6px; padding: 15px;">
            <h3 style="color: #1e40af; font-size: 14px; font-weight: 600; margin-bottom: 10px;">
              ⚙️ Technical Skills ${jobRequirementsData.matches.hardSkills.score >= 80 ? '✅' : jobRequirementsData.matches.hardSkills.score >= 50 ? '🟡' : '❌'} ${jobRequirementsData.matches.hardSkills.score}%
            </h3>
            ${jobRequirementsData.matches.hardSkills.found.length > 0 ? `
              <div style="margin-bottom: 10px;">
                <h4 style="color: #2563eb; font-size: 12px; font-weight: 600; margin-bottom: 5px;">Found (${jobRequirementsData.matches.hardSkills.found.length})</h4>
                <div>
                  ${jobRequirementsData.matches.hardSkills.found.slice(0, 8).map(item => `<span style="background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 3px; margin-right: 4px; margin-bottom: 4px; display: inline-block; font-size: 11px;">${item}</span>`).join('')}
                  ${jobRequirementsData.matches.hardSkills.found.length > 8 ? `<span style="color: #2563eb; font-size: 11px;">...+${jobRequirementsData.matches.hardSkills.found.length - 8} more</span>` : ''}
                </div>
              </div>
            ` : ''}
            ${jobRequirementsData.matches.hardSkills.missing.length > 0 ? `
              <div>
                <h4 style="color: #6b7280; font-size: 12px; font-weight: 600; margin-bottom: 5px;">High Priority Missing</h4>
                <div>
                  ${jobRequirementsData.matches.hardSkills.missing.slice(0, 6).map(item => `<span style="background: #f3f4f6; color: #6b7280; padding: 2px 6px; border-radius: 3px; margin-right: 4px; margin-bottom: 4px; display: inline-block; font-size: 11px;">${item}</span>`).join('')}
                </div>
              </div>
            ` : ''}
          </div>
          
          <!-- Professional Skills -->
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 15px;">
            <h3 style="color: #166534; font-size: 14px; font-weight: 600; margin-bottom: 10px;">
              💡 Professional Skills ${jobRequirementsData.matches.softSkills.score >= 80 ? '✅' : jobRequirementsData.matches.softSkills.score >= 50 ? '🟡' : '❌'} ${jobRequirementsData.matches.softSkills.score}%
            </h3>
            ${jobRequirementsData.matches.softSkills.found.length > 0 ? `
              <div style="margin-bottom: 10px;">
                <h4 style="color: #15803d; font-size: 12px; font-weight: 600; margin-bottom: 5px;">Found (${jobRequirementsData.matches.softSkills.found.length})</h4>
                <div>
                  ${jobRequirementsData.matches.softSkills.found.map(item => `<span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 3px; margin-right: 4px; margin-bottom: 4px; display: inline-block; font-size: 11px;">${item}</span>`).join('')}
                </div>
              </div>
            ` : ''}
            ${jobRequirementsData.matches.softSkills.missing.length > 0 ? `
              <div>
                <h4 style="color: #6b7280; font-size: 12px; font-weight: 600; margin-bottom: 5px;">Missing (${jobRequirementsData.matches.softSkills.missing.length})</h4>
                <div>
                  ${jobRequirementsData.matches.softSkills.missing.slice(0, 6).map(item => `<span style="background: #f3f4f6; color: #6b7280; padding: 2px 6px; border-radius: 3px; margin-right: 4px; margin-bottom: 4px; display: inline-block; font-size: 11px;">${item}</span>`).join('')}
                  ${jobRequirementsData.matches.softSkills.missing.length > 6 ? `<span style="color: #6b7280; font-size: 11px;">...+${jobRequirementsData.matches.softSkills.missing.length - 6} more</span>` : ''}
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        ${jobRequirementsData.recommendations && jobRequirementsData.recommendations.length > 0 ? `
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px; margin-top: 15px;">
          <h4 style="color: #374151; font-weight: 600; margin-bottom: 8px;">📋 Job Match Recommendations:</h4>
          <ul style="margin: 0; padding-left: 20px; color: #6b7280;">
            ${jobRequirementsData.recommendations.map(rec => `<li style="margin-bottom: 4px; font-size: 14px;">${rec}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
      </div>
      ` : ''}

      <!-- Extracted Information Section -->
      <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; font-size: 22px; font-weight: bold; margin-bottom: 15px;">
          Extracted Information
        </h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
          <!-- Contact Information -->
          ${sections.contactInfo ? `
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 15px;">
            <h3 style="color: #166534; font-size: 14px; font-weight: 600; margin-bottom: 10px;">📧 Contact Information</h3>
            <div style="color: #15803d; font-size: 13px;">
              ${sections.contactInfo.email ? `<div style="margin-bottom: 5px;"><strong>Email:</strong> ${sections.contactInfo.email}</div>` : ''}
              ${sections.contactInfo.phone ? `<div style="margin-bottom: 5px;"><strong>Phone:</strong> ${sections.contactInfo.phone}</div>` : ''}
              ${sections.contactInfo.urls && sections.contactInfo.urls.length > 0 ? `
                <div style="margin-bottom: 5px;"><strong>URLs:</strong></div>
                <ul style="margin: 0; padding-left: 20px;">
                  ${sections.contactInfo.urls.slice(0, 3).map(url => `<li style="margin-bottom: 2px;">${url}</li>`).join('')}
                  ${sections.contactInfo.urls.length > 3 ? `<li style="color: #6b7280;">...and ${sections.contactInfo.urls.length - 3} more</li>` : ''}
                </ul>
              ` : ''}
            </div>
          </div>
          ` : ''}
          
          <!-- Skills -->
          ${sections.skills ? `
          <div style="background: #eff6ff; border: 1px solid #93c5fd; border-radius: 6px; padding: 15px;">
            <h3 style="color: #1e40af; font-size: 14px; font-weight: 600; margin-bottom: 10px;">🛠️ Detected Skills</h3>
            ${sections.skills.hard && sections.skills.hard.length > 0 ? `
              <div style="margin-bottom: 10px;">
                <h4 style="color: #2563eb; font-size: 12px; font-weight: 600; margin-bottom: 5px;">Technical Skills (${sections.skills.hard.length})</h4>
                <div>
                  ${sections.skills.hard.slice(0, 8).map(skill => `<span style="background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 3px; margin-right: 4px; margin-bottom: 4px; display: inline-block; font-size: 11px;">${skill}</span>`).join('')}
                  ${sections.skills.hard.length > 8 ? `<span style="color: #2563eb; font-size: 11px;">...+${sections.skills.hard.length - 8} more</span>` : ''}
                </div>
              </div>
            ` : ''}
            ${sections.skills.soft && sections.skills.soft.length > 0 ? `
              <div>
                <h4 style="color: #2563eb; font-size: 12px; font-weight: 600; margin-bottom: 5px;">Professional Skills (${sections.skills.soft.length})</h4>
                <div>
                  ${sections.skills.soft.slice(0, 6).map(skill => `<span style="background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 3px; margin-right: 4px; margin-bottom: 4px; display: inline-block; font-size: 11px;">${skill}</span>`).join('')}
                  ${sections.skills.soft.length > 6 ? `<span style="color: #2563eb; font-size: 11px;">...+${sections.skills.soft.length - 6} more</span>` : ''}
                </div>
              </div>
            ` : ''}
          </div>
          ` : ''}
          
          <!-- Education -->
          ${sections.education && sections.education.length > 0 ? `
          <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 15px;">
            <h3 style="color: #92400e; font-size: 14px; font-weight: 600; margin-bottom: 10px;">🎓 Education (${sections.education.length})</h3>
            <div style="color: #b45309; font-size: 12px;">
              ${sections.education.slice(0, 3).map(edu => `
                <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 4px; padding: 8px; margin-bottom: 5px;">
                  "${edu}"
                </div>
              `).join('')}
              ${sections.education.length > 3 ? `<p style="color: #6b7280; font-style: italic; margin: 5px 0 0 0;">...and ${sections.education.length - 3} more education entries</p>` : ''}
            </div>
          </div>
          ` : ''}
          
          <!-- Key Phrases -->
          ${sections.keyPhrases && sections.keyPhrases.length > 0 ? `
          <div style="background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px;">
            <h3 style="color: #374151; font-size: 14px; font-weight: 600; margin-bottom: 10px;">💼 Key Phrases (${sections.keyPhrases.length})</h3>
            <div>
              ${sections.keyPhrases.slice(0, 12).map(phrase => `<span style="background: #e5e7eb; color: #374151; padding: 2px 6px; border-radius: 3px; margin-right: 4px; margin-bottom: 4px; display: inline-block; font-size: 11px;">${phrase}</span>`).join('')}
              ${sections.keyPhrases.length > 12 ? `<span style="color: #6b7280; font-size: 11px;">...+${sections.keyPhrases.length - 12} more phrases</span>` : ''}
            </div>
          </div>
          ` : ''}
        </div>
      </div>

      <!-- Resume Sections -->
      <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; font-size: 22px; font-weight: bold; margin-bottom: 15px;">
          Resume Sections Detected
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
          ${Object.entries(sections.sections || sections).map(([key, value]) => {
            if (typeof value === 'boolean' && value) {
              return `
                <div style="background: #f3f4f6; border-radius: 4px; padding: 10px;">
                  <h4 style="color: #374151; font-weight: 600; margin: 0 0 5px 0; text-transform: capitalize;">
                    ${key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p style="color: #16a34a; margin: 0; font-size: 14px;">✅ Found</p>
                </div>
              `;
            } else if (Array.isArray(value) && value.length > 0) {
              return `
                <div style="background: #f3f4f6; border-radius: 4px; padding: 10px;">
                  <h4 style="color: #374151; font-weight: 600; margin: 0 0 5px 0; text-transform: capitalize;">
                    ${key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p style="color: #6b7280; margin: 0; font-size: 14px;">
                    ${value.length} item${value.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              `;
            }
            return '';
          }).join('')}
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px;">
        <p style="color: #6b7280; margin: 0; font-size: 14px;">
          Generated by Resume Analyser - 
          <a href="https://lachho.github.io/resume" style="color: #4f46e5; text-decoration: none;">
            lachho.github.io/resume
          </a>
        </p>
      </div>
    </div>
  `;
  
  return html;
};

export const copyHTMLToClipboard = async (html) => {
  try {
    // Create a ClipboardItem with both HTML and plain text
    const clipboardItem = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([html.replace(/<[^>]*>/g, '')], { type: 'text/plain' })
    });
    
    await navigator.clipboard.write([clipboardItem]);
    return true;
  } catch (err) {
    // Fallback for browsers that don't support ClipboardItem
    try {
      await navigator.clipboard.writeText(html);
      return true;
    } catch (fallbackErr) {
      console.error('Failed to copy to clipboard:', fallbackErr);
      return false;
    }
  }
}; 