/**
 * Academic Renaissance Template
 *
 * Concept: A premium, editorial-academic design inspired by university
 * journals and prestigious conference proceedings. Features a distinctive
 * vertical ruled margin on the left with section content flowing in a
 * clean right column. The header has a serif display name with an accent
 * horizontal rule. Each section is presented as a "research note" with
 * subtle drop caps and letter spacing. The entire layout evokes scholarship
 * and serious academic discourse.
 *
 * Target: Professors, Researchers, Academic Coordinators, PhD candidates,
 * Post-doctoral fellows, Academic consultants.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'

export default function AcademicRenaissanceTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, skills, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Playfair Display", Georgia, serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const leftMarginWidth = '40px'

  const titleStyle: React.CSSProperties = {
    fontFamily: displayStack,
    fontSize: `calc(${fontSize} * 2.2)`,
    fontWeight: 700,
    color: theme.textColor,
    letterSpacing: '-0.03em',
    marginBottom: `calc(${gap} * 0.5)`,
  }

  const contactRow: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.85)`,
    color: '#64748b',
    marginBottom: `calc(${gap} * 1.5)`,
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  }

  const ruledMargin: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: leftMarginWidth,
    backgroundImage: `linear-gradient(to bottom, transparent calc(50% - 12px), ${accent} 50%, transparent calc(50% + 12px))`,
    backgroundSize: '1px 24px',
    backgroundRepeat: 'repeat-y',
    backgroundPosition: 'center',
  }

  const sectionBlock: React.CSSProperties = {
    marginBottom: `calc(${gap} * 1.5)`,
    position: 'relative',
    paddingLeft: '20px',
  }

  const sectionTitle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 1.3)`,
    fontWeight: 700,
    color: theme.textColor,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: `calc(${gap} * 0.5)`,
    position: 'relative',
  }

  const dropCap: React.CSSProperties = {
    fontFamily: displayStack,
    fontSize: `calc(${fontSize} * 1.8)`,
    fontWeight: 800,
    color: accent,
    float: 'left',
    margin: '0.1em 0.2em 0 -0.05em',
    lineHeight: 1,
  }

  const contentPara: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 1)`,
    lineHeight: 1.8,
    color: '#475569',
    textAlign: 'justify',
    marginBottom: `calc(${gap} * 0.8)`,
    textIndent: '20px',
    position: 'relative',
  }

  const container: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize,
    lineHeight,
    color: theme.textColor,
    backgroundColor: theme.backgroundColor,
    width: '210mm',
    minHeight: '297mm',
    boxSizing: 'border-box',
    padding: `16mm 20mm 20mm 60mm`,
    backgroundImage: `linear-gradient(to bottom, rgba(241, 245, 249, 0.3), rgba(241, 245, 249, 0.3))`,
    backgroundSize: 'cover',
    position: 'relative',
    overflow: 'hidden',
  }

  const header: React.CSSProperties = {
    borderBottom: `2px solid ${accent}`,
    paddingBottom: `calc(${gap} * 0.8)`,
    marginBottom: `calc(${gap} * 1.5)`,
  }

  const experienceEntry: React.CSSProperties = {
    marginBottom: `calc(${gap} * 1.2)`,
    position: 'relative',
    paddingLeft: '15px',
  }

  const experienceTitle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 1.05)`,
    fontWeight: 700,
    color: theme.textColor,
    marginBottom: '4px',
  }

  const companyInfo: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.95)`,
    color: accent,
    fontWeight: 500,
    marginBottom: '4px',
  }

  const dateBadge: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.85)`,
    color: '#94a3b8',
    backgroundColor: theme.backgroundColor,
    padding: '2px 8px',
    borderRadius: '4px',
    border: `1px solid #e2e8f0`,
    position: 'absolute',
    right: 0,
    top: 0,
  }

  return (
    <div style={container}>
      <div style={ruledMargin} />

      {/* Header - Name and contact */}
      <header style={header}>
        <h1 style={titleStyle}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Professor Name'}
        </h1>
        <div style={contactRow}>
          {personal.location && <span>📍 {personal.location}</span>}
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>☎ {personal.phone}</span>}
          {personal.linkedin && <span>in {personal.linkedin.replace('https://', '')}</span>}
          {personal.github && <span>gh {personal.github.replace('https://', '')}</span>}
        </div>
        <div style={{ height: '2px', backgroundColor: accent, width: '60px', marginTop: '12px' }} />
      </header>

      {/* Dynamic sections */}
      {sections
        .filter(s => s.visible)
        .sort((a, b) => a.order - b.order)
        .map(section => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <section key={section.id} style={sectionBlock}>
                  <h2 style={sectionTitle}>Academic Profile</h2>
                  <div>
                    <span style={dropCap}>I</span>
                    <p style={contentPara} dangerouslySetInnerHTML={{ __html: renderRichText(data.summary) }} />
                  </div>
                </section>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <section key={section.id} style={sectionBlock}>
                  <h2 style={sectionTitle}>Professional Experience</h2>
                  {experience.map((exp) => (
                    <div key={exp.id} style={experienceEntry}>
                      <h3 style={experienceTitle}>{exp.position}</h3>
                      <p style={companyInfo}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                      <span style={dateBadge}>{formatDateRange(exp.dateRange)}</span>
                      {exp.description && (
                        <div style={{ marginTop: '10px', color: '#475569', lineHeight }}
                          dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                        />
                      )}
                    </div>
                  ))}
                </section>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <section key={section.id} style={sectionBlock}>
                  <h2 style={sectionTitle}>Academic Background</h2>
                  {education.map((edu) => (
                    <div key={edu.id} style={experienceEntry}>
                      <h3 style={experienceTitle}>{edu.institution}</h3>
                      <p style={companyInfo}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</p>
                      <p style={{ fontSize: `calc(${fontSize} * 0.9)`, color: '#64748b' }}>{edu.location}</p>
                      <span style={dateBadge}>{formatDateRange(edu.dateRange)}</span>
                      <p style={{ marginTop: '8px', fontSize: `calc(${fontSize} * 0.88)`, color: '#475569' }}>GPA: {edu.gpa}</p>
                    </div>
                  ))}
                </section>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <section key={section.id} style={sectionBlock}>
                  <h2 style={sectionTitle}>Scholarly Output</h2>
                  {publications.map((pub) => (
                    <div key={pub.id} style={experienceEntry}>
                      <h3 style={experienceTitle}>
                        {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                      </h3>
                      <p style={companyInfo}>{pub.publisher}{pub.date && ` · ${formatMonthYear(pub.date)}`}</p>
                      {pub.description && (
                        <p style={{ marginTop: '6px', fontSize: `calc(${fontSize} * 0.88)`, color: '#475569' }}>{pub.description}</p>
                      )}
                    </div>
                  ))}
                </section>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <section key={section.id} style={sectionBlock}>
                  <h2 style={sectionTitle}>Research Contributions</h2>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={experienceEntry}>
                      <h3 style={experienceTitle}>{ach.title}</h3>
                      {ach.date && <p style={companyInfo}>{formatMonthYear(ach.date)}</p>}
                      {ach.description && (
                        <div style={{ marginTop: '6px', fontSize: `calc(${fontSize} * 0.88)`, color: '#475569' }}
                          dangerouslySetInnerHTML={{ __html: renderRichText(ach.description) }}
                        />
                      )}
                    </div>
                  ))}
                </section>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <section key={section.id} style={sectionBlock}>
                  <h2 style={sectionTitle}>Academic Honors</h2>
                  {awards.map((award) => (
                    <div key={award.id} style={experienceEntry}>
                      <h3 style={experienceTitle}>{award.title}</h3>
                      <p style={companyInfo}>{award.issuer}{award.date && ` · ${formatMonthYear(award.date)}`}</p>
                      {award.description && (
                        <p style={{ marginTop: '6px', fontSize: `calc(${fontSize} * 0.88)`, color: '#475569' }}>{award.description}</p>
                      )}
                    </div>
                  ))}
                </section>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <section key={section.id} style={sectionBlock}>
                  <h2 style={sectionTitle}>Expertise Areas</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                    {skills.map(cat => (
                      <div key={cat.id} style={{ backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '4px', border: `1px solid ${accent}20` }}>
                        <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.9)` }}>{cat.name}</p>
                        <p style={{ fontSize: `calc(${fontSize} * 0.8)`, color: '#64748b', marginTop: '4px' }}>{cat.skills.join(' · ')}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <section key={section.id} style={sectionBlock}>
                  <h2 style={sectionTitle}>Academic Service</h2>
                  {volunteer.map((vol) => (
                    <div key={vol.id} style={experienceEntry}>
                      <h3 style={experienceTitle}>{vol.role}</h3>
                      <p style={companyInfo}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                      <span style={dateBadge}>{formatDateRange(vol.dateRange)}</span>
                      {vol.description && (
                        <div style={{ marginTop: '6px', fontSize: `calc(${fontSize} * 0.88)`, color: '#475569' }}
                          dangerouslySetInnerHTML={{ __html: renderRichText(vol.description) }}
                        />
                      )}
                    </div>
                  ))}
                </section>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <section key={section.id} style={sectionBlock}>
                  <h2 style={sectionTitle}>Research Interests</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                    {interests.map((interest, idx) => (
                      <span key={interest.id} style={{ 
                        backgroundColor: `${accent}10`, 
                        padding: '4px 10px', 
                        borderRadius: '12px', 
                        fontSize: `calc(${fontSize} * 0.85)`, 
                        color: accent,
                        border: `1px solid ${accent}30` 
                      }}>
                        {interest.name}{idx < interests.length - 1 && ' ·'}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null

            default:
              return null
          }
        })}
      </div>
  )
}
