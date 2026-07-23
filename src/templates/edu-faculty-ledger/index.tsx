/**
 * Faculty Ledger Template
 *
 * Concept: An elegant, institutional-inspired design for senior faculty and
 * department heads. Structured like a university ledger book with wide
 * ruled margins, clean grid sections, and academic document typography.
 * Features two-column sections that evoke report cards and grade sheets.
 * The header has a centered serif name with academic accent details.
 *
 * Target: School Principals, Department Chairs, Senior Lecturers, Academic
 * Administrators, Faculty Deans, Education Consultants.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'

export default function FacultyLedgerTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, skills, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Times New Roman", Georgia, serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const headerHeight = '140px'
  const sidebarWidth = '140px'
  const mainWidth = 'calc(210mm - 140px)'

  const nameStyle: React.CSSProperties = {
    fontFamily: displayStack,
    fontSize: `calc(${fontSize} * 2.5)`,
    fontWeight: 700,
    color: theme.textColor,
    letterSpacing: '-0.04em',
    marginBottom: `calc(${gap} * 0.5)`,
    lineHeight: 1,
  }

  const headerAccent: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(to right, ${accent}, ${theme.secondaryColor || accent}80)`,
  }

  const sidebar: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: sidebarWidth,
    backgroundColor: '#f8fafc',
    borderRight: `1px solid #e2e8f0`,
    padding: '24px 16px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: `calc(${gap} * 1.5)`,
  }

  const sidebarTitle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.75)`,
    fontWeight: 700,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '8px',
  }

  const contactItem: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.85)`,
    color: '#1e293b',
    marginBottom: '8px',
    lineHeight: 1.3,
    wordBreak: 'break-all',
  }

  const mainContent: React.CSSProperties = {
    marginLeft: sidebarWidth,
    width: mainWidth,
    padding: `24px 32px`,
    boxSizing: 'border-box',
  }

  const sectionBlock: React.CSSProperties = {
    marginBottom: `calc(${gap} * 2)`,
    position: 'relative',
    pageBreakInside: 'avoid',
  }

  const sectionTitle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 1.2)`,
    fontWeight: 700,
    color: theme.textColor,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: `calc(${gap} * 0.8)`,
    paddingBottom: '8px',
    borderBottom: `2px solid ${accent}`,
    display: 'inline-block',
    minWidth: '200px',
  }

  const cardGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: `calc(${gap} * 1.5)`,
    marginTop: `calc(${gap} * 1.5)`,
  }

  const card: React.CSSProperties = {
    backgroundColor: '#fff',
    border: `1px solid #e2e8f0`,
    borderRadius: '4px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    pageBreakInside: 'avoid',
  }

  const cardTitle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.9)`,
    fontWeight: 700,
    color: accent,
    marginBottom: '6px',
  }

  const cardContent: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.85)`,
    color: '#475569',
    lineHeight: 1.5,
  }

  const timelineEntry: React.CSSProperties = {
    position: 'relative',
    paddingLeft: '24px',
    marginBottom: `calc(${gap} * 1.5)`,
    pageBreakInside: 'avoid',
  }

  const timelineDot: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: '6px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: accent,
    border: '2px solid #fff',
  }

  const timelineLine: React.CSSProperties = {
    position: 'absolute',
    left: '5px',
    top: '16px',
    bottom: '-24px',
    width: '2px',
    backgroundColor: '#e2e8f0',
    zIndex: -1,
  }

  const experienceEntry: React.CSSProperties = {
    marginBottom: `calc(${gap} * 1.5)`,
    pageBreakInside: 'avoid',
  }

  const experienceHeader: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
    flexWrap: 'wrap',
    gap: '8px',
  }

  const experienceTitle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 1.05)`,
    fontWeight: 700,
    color: theme.textColor,
    flex: 1,
    minWidth: '200px',
  }

  const companyInfo: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.9)`,
    color: accent,
    fontWeight: 500,
    marginBottom: '4px',
  }

  const dateRange: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.85)`,
    color: '#94a3b8',
    fontWeight: 500,
    backgroundColor: '#f1f5f9',
    padding: '4px 8px',
    borderRadius: '3px',
    whiteSpace: 'nowrap',
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
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  }

  const headerSection: React.CSSProperties = {
    height: headerHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 32px',
    position: 'relative',
    backgroundColor: '#fff',
  }

  return (
    <div style={container}>
      {/* Sidebar - Contact & Quick Facts */}
      <aside style={sidebar}>
        {theme.showAvatar && (
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: accent,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#fff',
            fontWeight: 600,
            border: '3px solid #fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}>
            {personal.firstName?.[0]?.toUpperCase() ?? '?'}
          </div>
        )}

        <h2 style={sidebarTitle}>Contact</h2>
        <div style={contactItem}><strong>Email:</strong><br/>{personal.email}</div>
        {personal.phone && <div style={contactItem}><strong>Phone:</strong><br/>{personal.phone}</div>}
        {personal.location && <div style={contactItem}><strong>Location:</strong><br/>{personal.location}</div>}
        {personal.linkedin && <div style={contactItem}><strong>LinkedIn:</strong><br/><a href={personal.linkedin} style={{ color: accent, textDecoration: 'none' }}>{personal.linkedin}</a></div>}
        {personal.github && <div style={contactItem}><strong>GitHub:</strong><br/><a href={personal.github} style={{ color: accent, textDecoration: 'none' }}>{personal.github}</a></div>}

      {skills.length > 0 && (
        <>
          <h2 style={sidebarTitle}>Core Skills</h2>
          {skills.slice(0, 3).map((cat: any) => (
            <div key={cat.id} style={contactItem}>
              <strong style={{ color: accent }}>{cat.name}:</strong><br/>
              <span style={{ fontSize: `calc(${fontSize} * 0.8)`, color: '#64748b' }}>{cat.skills.slice(0, 4).join(', ')}</span>
            </div>
          ))}
        </>
      )}
      </aside>

      {/* Main Content */}
      <main style={mainContent}>
        {/* Header */}
        <header style={headerSection}>
          <h1 style={nameStyle}>
            {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Dr. Faculty Name'}
          </h1>
          <p style={{ fontSize: `calc(${fontSize} * 0.95)`, color: '#64748b', marginBottom: `calc(${gap} * 0.5)`, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            {personal.headline || 'Senior Lecturer & Academic Researcher'}
          </p>
          <div style={headerAccent} />
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
                    <div style={cardGrid}>
                      <div style={card}>
                        <h3 style={cardTitle}>Professional Overview</h3>
                        <div style={cardContent} dangerouslySetInnerHTML={{ __html: renderRichText(data.summary) }} />
                      </div>
                    </div>
                  </section>
                ) : null

              case 'experience':
                return experience.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <h2 style={sectionTitle}>Teaching & Research Experience</h2>
                    <div style={{ position: 'relative', paddingBottom: `calc(${gap} * 1.5)` }}>
                      <div style={timelineLine} />
                      {experience.map((exp) => (
                        <div key={exp.id} style={timelineEntry}>
                          <div style={timelineDot} />
                          <div style={experienceEntry}>
                            <div style={experienceHeader}>
                              <h3 style={experienceTitle}>{exp.position}</h3>
                              <div style={dateRange}>{formatDateRange(exp.dateRange)}</div>
                            </div>
                            <p style={companyInfo}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                            {exp.description && (
                              <div style={{ marginTop: '10px', color: '#475569', lineHeight }}
                                dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'education':
                return education.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <h2 style={sectionTitle}>Academic Qualifications</h2>
                    <div style={cardGrid}>
                      {education.map((edu) => (
                        <div key={edu.id} style={card}>
                          <h3 style={cardTitle}>{edu.institution}</h3>
                          <div style={cardContent}>
                            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</div>
                            <div style={{ color: '#64748b', marginBottom: '4px' }}>{edu.location}</div>
                            <div style={{ fontSize: `calc(${fontSize} * 0.85)`, color: '#94a3b8' }}>Graduated: {formatDateRange(edu.dateRange)}</div>
                            <div style={{ marginTop: '8px', fontSize: `calc(${fontSize} * 0.85)`, color: accent }}>GPA: {edu.gpa}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'publications':
                return publications.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <h2 style={sectionTitle}>Published Works</h2>
                    <div style={cardGrid}>
                      {publications.map((pub) => (
                        <div key={pub.id} style={card}>
                          <h3 style={cardTitle}>
                            {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                          </h3>
                          <div style={cardContent}>
                            <div style={{ marginBottom: '4px' }}>{pub.publisher} · {formatMonthYear(pub.date)}</div>
                            {pub.authors && pub.authors.length > 0 && (
                              <div style={{ fontSize: `calc(${fontSize} * 0.8)`, color: '#64748b' }}>Authors: {pub.authors.join(', ')}</div>
                            )}
                            {pub.description && <div style={{ marginTop: '6px' }}>{pub.description}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <h2 style={sectionTitle}>Academic Honors</h2>
                    <div style={cardGrid}>
                      {awards.map((award) => (
                        <div key={award.id} style={card}>
                          <h3 style={cardTitle}>{award.title}</h3>
                          <div style={cardContent}>
                            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{award.issuer}</div>
                            <div style={{ color: '#64748b' }}>{formatMonthYear(award.date)}</div>
                            {award.description && <div style={{ marginTop: '6px' }}>{award.description}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <h2 style={sectionTitle}>Research Contributions</h2>
                    <div style={cardGrid}>
                      {achievements.map((ach) => (
                        <div key={ach.id} style={card}>
                          <h3 style={cardTitle}>{ach.title}</h3>
                          <div style={cardContent}>
                            {ach.date && <div style={{ color: '#64748b', marginBottom: '4px' }}>{formatMonthYear(ach.date)}</div>}
                            {ach.description && <div>{ach.description}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'skills':
                return skills.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <h2 style={sectionTitle}>Teaching Expertise</h2>
                    <div style={cardGrid}>
                      {skills.map((cat) => (
                        <div key={cat.id} style={card}>
                          <h3 style={cardTitle}>{cat.name}</h3>
                          <div style={cardContent}>
                            <div>{cat.skills.join(', ')}</div>
                            {cat.level && (
                              <div style={{ marginTop: '6px', fontSize: `calc(${fontSize} * 0.85)`, color: accent }}>
                                Level: {cat.level}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <h2 style={sectionTitle}>Academic Service</h2>
                    <div style={cardGrid}>
                      {volunteer.map((vol) => (
                        <div key={vol.id} style={card}>
                          <h3 style={cardTitle}>{vol.role}</h3>
                          <div style={cardContent}>
                            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{vol.organization}</div>
                            <div style={{ color: '#64748b', marginBottom: '4px' }}>{vol.location}</div>
                            <div style={{ fontWeight: 600, color: accent, marginTop: '6px' }}>{formatDateRange(vol.dateRange)}</div>
                            {vol.description && <div style={{ marginTop: '6px' }}>{vol.description}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <h2 style={sectionTitle}>Research Focus</h2>
                    <div style={cardGrid}>
                      <div style={{ ...card, gridColumn: '1 / -1' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                          {interests.map((interest, idx) => (
                            <span key={interest.id} style={{ 
                              backgroundColor: `${accent}15`, 
                              padding: '6px 12px', 
                              borderRadius: '4px', 
                              fontSize: `calc(${fontSize} * 0.9)`, 
                              color: accent,
                              border: `1px solid ${accent}30`,
                              display: 'inline-block',
                              marginBottom: '8px'
                            }}>
                              {interest.name}{idx < interests.length - 1 && ' ·'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                ) : null

              default:
                return null
            }
          })}
      </main>
    </div>
  )
}
