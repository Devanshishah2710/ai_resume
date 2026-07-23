/**
 * Centered Curriculum Template
 *
 * Concept: A premium, scholarly template that exudes academic gravitas with
 * editorial typography. The design centers the name with an elegant serif
 * display, followed by a structured, magazine-style layout. Sections are
 * arranged in a flowing academic rhythm with soft visual hierarchy. The
 * background suggests parchment or research paper with subtle watermark.
 *
 * Target: Lecturers, PhD Candidates, Postdoctoral Researchers, Scholars,
 * Education Researchers, Curriculum Developers.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'

export default function CenteredCurriculumTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, skills, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Playfair Display", Georgia, serif'
  const bodyStack = '"Source Serif Pro", "Palatino Linotype", serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const titleStyle: React.CSSProperties = {
    fontFamily: displayStack,
    fontSize: `calc(${fontSize} * 2.8)`,
    fontWeight: 600,
    color: theme.textColor,
    letterSpacing: '-0.04em',
    marginBottom: `calc(${gap} * 0.8)`,
    lineHeight: 1.1,
    textAlign: 'center',
  }

  const headlineStyle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.95)`,
    fontWeight: 400,
    fontStyle: 'italic',
    color: '#64748b',
    marginBottom: `calc(${gap} * 1.5)`,
    maxWidth: '500px',
    lineHeight: 1.4,
    textAlign: 'center',
  }

  const contactRow: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.85)`,
    color: '#94a3b8',
    marginBottom: `calc(${gap} * 1.5)`,
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  }

  const academicDivider: React.CSSProperties = {
    width: '80px',
    height: '2px',
    backgroundColor: accent,
    margin: `0 auto calc(${gap} * 1.5)`,
  }

  const sectionTitle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 1.1)`,
    fontWeight: 700,
    color: theme.textColor,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: `calc(${gap} * 1.2)`,
    paddingBottom: '8px',
    borderBottom: `2px solid ${accent}30`,
    display: 'inline-block',
    width: '100%',
  }

  const dropCap: React.CSSProperties = {
    fontFamily: displayStack,
    fontSize: `calc(${fontSize} * 1.8)`,
    fontWeight: 700,
    color: accent,
    float: 'left',
    margin: '0.1em 0.3em 0 -0.05em',
    lineHeight: 1,
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
  }

  const contentPara: React.CSSProperties = {
    fontFamily: bodyStack,
    fontSize: `calc(${fontSize} * 1.05)`,
    lineHeight: 1.9,
    color: '#475569',
    textAlign: 'justify',
    marginBottom: `calc(${gap} * 1.2)`,
    textIndent: '20px',
    position: 'relative',
    paddingLeft: '5px',
  }

  const academicCard: React.CSSProperties = {
    backgroundColor: '#fff',
    border: `1px solid #e2e8f0`,
    borderRadius: '2px',
    padding: '20px 24px',
    marginBottom: `calc(${gap} * 1.5)`,
    pageBreakInside: 'avoid',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    position: 'relative',
    overflow: 'hidden',
  }

  const cardAccent: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '3px',
    height: '100%',
    backgroundColor: accent,
  }

  const cardTitle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 1.05)`,
    fontWeight: 700,
    color: accent,
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  const cardContent: React.CSSProperties = {
    fontFamily: bodyStack,
    fontSize: `calc(${fontSize} * 0.95)`,
    color: '#475569',
    lineHeight: 1.7,
  }

  const timelineEntry: React.CSSProperties = {
    position: 'relative',
    paddingLeft: '30px',
    marginBottom: `calc(${gap} * 1.5)`,
    pageBreakInside: 'avoid',
  }

  const timelineDot: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: '8px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: accent,
    border: `2px solid #fff`,
    boxShadow: `0 0 0 2px ${accent}40`,
  }

  const timelineLine: React.CSSProperties = {
    position: 'absolute',
    left: '5px',
    top: '16px',
    bottom: '-24px',
    width: '2px',
    backgroundColor: '#e2e8f0',
  }

  const experienceEntry: React.CSSProperties = {
    marginBottom: `calc(${gap} * 1.5)`,
    pageBreakInside: 'avoid',
  }

  const experienceHeader: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '10px',
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
    fontSize: `calc(${fontSize} * 0.95)`,
    color: accent,
    fontWeight: 500,
    marginBottom: '4px',
  }

  const dateBadge: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `calc(${fontSize} * 0.85)`,
    color: '#94a3b8',
    backgroundColor: '#f1f5f9',
    padding: '4px 10px',
    borderRadius: '3px',
    border: `1px solid #e2e8f0`,
    whiteSpace: 'nowrap',
  }

  const skillChip: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 12px',
    margin: '4px',
    backgroundColor: `${accent}10`,
    color: accent,
    borderRadius: '16px',
    fontSize: `calc(${fontSize} * 0.9)`,
    fontWeight: 500,
    border: `1px solid ${accent}30`,
  }

  const container: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize,
    lineHeight,
    color: theme.textColor,
    backgroundColor: theme.backgroundColor,
    width: '210mm',
    minHeight: '297mm',
    padding: `32mm 32mm 40mm 32mm`,
    boxSizing: 'border-box',
    position: 'relative',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f8fafc' fill-opacity='0.4'%3E%3Cpath d='M11 18c3.528 0 6.001 2.373 6.588 5.887.59 3.524-.246 8.11-2.539 11.246-2.292 3.136-6.367 5.904-10.293 5.904-5.445 0-9.879-4.434-9.879-9.879C.121 11.434 4.555.002 10.606.002c5.445 0 9.879 4.434 9.879 9.879 0 3.881-1.762 7.326-4.555 9.654C21.587 60.01 16.777 73.114 11 73.114c-5.476 0-9.91-4.434-9.91-9.91 0-5.445 4.434-9.91 9.91-9.91zm0 0'/%3E%3Cpath d='M22 18c3.528 0 6.001 2.373 6.588 5.887.59 3.524-.246 8.11-2.539 11.246-2.292 3.136-6.367 5.904-10.293 5.904-5.445 0-9.879-4.434-9.879-9.879C12.121 11.434 16.555.002 22.606.002c5.445 0 9.879 4.434 9.879 9.879 0 3.881-1.762 7.326-4.555 9.654C39.587 60.01 34.777 73.114 22 73.114c-5.476 0-9.91-4.434-9.91-9.91 0-5.445 4.434-9.91 9.91-9.91zm0 0'/%3E%3Cpath d='M33 18c3.528 0 6.001 2.373 6.588 5.887.59 3.524-.246 8.11-2.539 11.246-2.292 3.136-6.367 5.904-10.293 5.904-5.445 0-9.879-4.434-9.879-9.879C23.121 11.434 27.555.002 33.606.002c5.445 0 9.879 4.434 9.879 9.879 0 3.881-1.762 7.326-4.555 9.654C45.587 60.01 40.777 73.114 33 73.114c-5.476 0-9.91-4.434-9.91-9.91 0-5.445 4.434-9.91 9.91-9.91zm0 0'/%3E%3Cpath d='M44 18c3.528 0 6.001 2.373 6.588 5.887.59 3.524-.246 8.11-2.539 11.246-2.292 3.136-6.367 5.904-10.293 5.904-5.445 0-9.879-4.434-9.879-9.879C34.121 11.434 38.555.002 44.606.002c5.445 0 9.879 4.434 9.879 9.879 0 3.881-1.762 7.326-4.555 9.654C55.587 60.01 50.777 73.114 44 73.114c-5.476 0-9.91-4.434-9.91-9.91 0-5.445 4.434-9.91 9.91-9.91zm0 0'/%3E%3Cpath d='M55 18c3.528 0 6.001 2.373 6.588 5.887.59 3.524-.246 8.11-2.539 11.246-2.292 3.136-6.367 5.904-10.293 5.904-5.445 0-9.879-4.434-9.879-9.879C45.121 11.434 49.555.002 55.606.002c5.445 0 9.879 4.434 9.879 9.879 0 3.881-1.762 7.326-4.555 9.654C66.587 60.01 61.777 73.114 55 73.114c-5.476 0-9.91-4.434-9.91-9.91 0-5.445 4.434-9.91 9.91-9.91zm0 0'/%3E%3Cpath d='M66 18c3.528 0 6.001 2.373 6.588 5.887.59 3.524-.246 8.11-2.539 11.246-2.292 3.136-6.367 5.904-10.293 5.904-5.445 0-9.879-4.434-9.879-9.879C56.121 11.434 60.555.002 66.606.002c5.445 0 9.879 4.434 9.879 9.879 0 3.881-1.762 7.326-4.555 9.654C77.587 60.01 72.777 73.114 66 73.114c-5.476 0-9.91-4.434-9.91-9.91 0-5.445 4.434-9.91 9.91-9.91zm0 0'/%3E%3Cpath d='M77 18c3.528 0 6.001 2.373 6.588 5.887.59 3.524-.246 8.11-2.539 11.246-2.292 3.136-6.367 5.904-10.293 5.904-5.445 0-9.879-4.434-9.879-9.879C67.121 11.434 71.555.002 77.606.002c5.445 0 9.879 4.434 9.879 9.879 0 3.881-1.762 7.326-4.555 9.654C88.587 60.01 83.777 73.114 77 73.114c-5.476 0-9.91-4.434-9.91-9.91 0-5.445 4.434-9.91 9.91-9.91zm0 0'/%3E%3Cpath d='M88 18c3.528 0 6.001 2.373 6.588 5.887.59 3.524-.246 8.11-2.539 11.246-2.292 3.136-6.367 5.904-10.293 5.904-5.445 0-9.879-4.434-9.879-9.879C78.121 11.434 82.555.002 88.606.002c5.445 0 9.879 4.434 9.879 9.879 0 3.881-1.762 7.326-4.555 9.654C99.587 60.01 94.777 73.114 88 73.114c-5.476 0-9.91-4.434-9.91-9.91 0-5.445 4.434-9.91 9.91-9.91zm0 0'/%3E%3Cpath d='M99 18c3.528 0 6.001 2.373 6.588 5.887.59 3.524-.246 8.11-2.539 11.246-2.292 3.136-6.367 5.904-10.293 5.904-5.445 0-9.879-4.434-9.879-9.879C89.121 11.434 93.555.002 99.606.002c5.445 0 9.879 4.434 9.879 9.879 0 3.881-1.762 7.326-4.555 9.654C111.587 60.01 106.777 73.114 99 73.114c-5.476 0-9.91-4.434-9.91-9.91 0-5.445 4.434-9.91 9.91-9.91zm0 0'/%3E%3C/g%3E%3C/svg%3E')`,
    backgroundSize: '200px',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'top left',
  }

  const watermark: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '120px',
    color: '#f1f5f9',
    fontWeight: 700,
    opacity: 0.03,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    zIndex: 0,
  }

  return (
    <div style={container}>
      {/* Watermark - subtle academic branding */}
      <div style={watermark}>ACADEMIC</div>

      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: `calc(${gap} * 2)`, position: 'relative', zIndex: 1 }}>
        <h1 style={titleStyle}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Professor Name'}
        </h1>
        <p style={headlineStyle}>
          {personal.headline || 'Senior Lecturer & Academic Researcher'}
        </p>
        <div style={contactRow}>
          {personal.location && <span>📍 {personal.location}</span>}
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>☎ {personal.phone}</span>}
          {personal.linkedin && <span>in {personal.linkedin.replace('https://', '')}</span>}
          {personal.github && <span>gh {personal.github.replace('https://', '')}</span>}
        </div>
        <div style={academicDivider} />
      </header>

      {/* Dynamic sections */}
      {sections
        .filter(s => s.visible)
        .sort((a, b) => a.order - b.order)
        .map(section => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <section key={section.id} style={{ position: 'relative', zIndex: 1, marginBottom: `calc(${gap} * 2)` }}>
                  <h2 style={sectionTitle}>Academic Profile</h2>
                  <div style={academicCard}>
                    <div style={cardAccent} />
                    <div style={cardTitle}>Professional Statement</div>
                    <div style={cardContent}>
                      <span style={dropCap}>I</span>
                      <p style={contentPara} dangerouslySetInnerHTML={{ __html: renderRichText(data.summary) }} />
                    </div>
                  </div>
                </section>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <section key={section.id} style={{ position: 'relative', zIndex: 1, marginBottom: `calc(${gap} * 2)` }}>
                  <h2 style={sectionTitle}>Teaching Experience</h2>
                  <div style={{ position: 'relative', paddingBottom: `calc(${gap} * 1.5)` }}>
                    <div style={timelineLine} />
                    {experience.map((exp) => (
                      <div key={exp.id} style={timelineEntry}>
                        <div style={timelineDot} />
                        <div style={experienceEntry}>
                          <div style={experienceHeader}>
                            <h3 style={experienceTitle}>{exp.position}</h3>
                            <div style={dateBadge}>{formatDateRange(exp.dateRange)}</div>
                          </div>
                          <p style={companyInfo}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                          {exp.description && (
                            <div style={{ marginTop: '10px', color: '#475569', lineHeight, position: 'relative', zIndex: 1 }}
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
                <section key={section.id} style={{ position: 'relative', zIndex: 1, marginBottom: `calc(${gap} * 2)` }}>
                  <h2 style={sectionTitle}>Academic Background</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: `calc(${gap} * 1.5)` }}>
                    {education.map((edu) => (
                      <div key={edu.id} style={academicCard}>
                        <div style={cardAccent} />
                        <div style={cardTitle}>Education</div>
                        <div style={cardContent}>
                          <div style={{ fontWeight: 600, marginBottom: '6px', color: accent }}>{edu.institution}</div>
                          <div style={{ marginBottom: '4px' }}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</div>
                          <div style={{ color: '#64748b', marginBottom: '4px' }}>{edu.location}</div>
                          <div style={{ fontSize: `calc(${fontSize} * 0.85)`, color: '#94a3b8' }}>Class of {edu.dateRange.endDate?.split('-')[0] || 'Present'}</div>
                          <div style={{ marginTop: '8px', fontSize: `calc(${fontSize} * 0.85)`, color: accent }}>GPA: {edu.gpa}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <section key={section.id} style={{ position: 'relative', zIndex: 1, marginBottom: `calc(${gap} * 2)` }}>
                  <h2 style={sectionTitle}>Scholarly Publications</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: `calc(${gap} * 1.5)` }}>
                    {publications.map((pub) => (
                      <div key={pub.id} style={academicCard}>
                        <div style={cardAccent} />
                        <div style={cardTitle}>Publication</div>
                        <div style={cardContent}>
                          <div style={{ fontWeight: 600, marginBottom: '6px' }}>
                            {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                          </div>
                          <div style={{ color: '#64748b', marginBottom: '4px' }}>{pub.publisher} · {formatMonthYear(pub.date)}</div>
                          {pub.authors && pub.authors.length > 0 && (
                            <div style={{ fontSize: `calc(${fontSize} * 0.85)`, color: '#94a3b8' }}>Co-authors: {pub.authors.join(', ')}</div>
                          )}
                          {pub.description && <div style={{ marginTop: '8px' }}>{pub.description}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <section key={section.id} style={{ position: 'relative', zIndex: 1, marginBottom: `calc(${gap} * 2)` }}>
                  <h2 style={sectionTitle}>Awards & Honors</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: `calc(${gap} * 1.5)` }}>
                    {awards.map((award) => (
                      <div key={award.id} style={academicCard}>
                        <div style={cardAccent} />
                        <div style={cardTitle}>Award</div>
                        <div style={cardContent}>
                          <div style={{ fontWeight: 600, marginBottom: '6px' }}>{award.title}</div>
                          <div style={{ color: '#64748b' }}>{award.issuer} · {formatMonthYear(award.date)}</div>
                          {award.description && <div style={{ marginTop: '8px' }}>{award.description}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <section key={section.id} style={{ position: 'relative', zIndex: 1, marginBottom: `calc(${gap} * 2)` }}>
                  <h2 style={sectionTitle}>Research Contributions</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: `calc(${gap} * 1.5)` }}>
                    {achievements.map((ach) => (
                      <div key={ach.id} style={academicCard}>
                        <div style={cardAccent} />
                        <div style={cardTitle}>Contribution</div>
                        <div style={cardContent}>
                          <div style={{ fontWeight: 600, marginBottom: '6px' }}>{ach.title}</div>
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
                <section key={section.id} style={{ position: 'relative', zIndex: 1, marginBottom: `calc(${gap} * 2)` }}>
                  <h2 style={sectionTitle}>Teaching Expertise</h2>
                  <div style={academicCard}>
                    <div style={cardAccent} />
                    <div style={cardTitle}>Professional Competencies</div>
                    <div style={cardContent}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                        {skills.map((cat) => (
                          <div key={cat.id} style={skillChip}>{cat.name}: {cat.skills.join(', ')}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <section key={section.id} style={{ position: 'relative', zIndex: 1, marginBottom: `calc(${gap} * 2)` }}>
                  <h2 style={sectionTitle}>Academic Service</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: `calc(${gap} * 1.5)` }}>
                    {volunteer.map((vol) => (
                      <div key={vol.id} style={academicCard}>
                        <div style={cardAccent} />
                        <div style={cardTitle}>Service</div>
                        <div style={cardContent}>
                          <div style={{ fontWeight: 600, marginBottom: '6px' }}>{vol.role}</div>
                          <div style={{ color: '#64748b', marginBottom: '4px' }}>{vol.organization} · {vol.location}</div>
                          <div style={{ fontWeight: 600, color: accent, marginTop: '6px' }}>{formatDateRange(vol.dateRange)}</div>
                          {vol.description && <div style={{ marginTop: '8px' }}>{vol.description}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <section key={section.id} style={{ position: 'relative', zIndex: 1, marginBottom: `calc(${gap} * 2)` }}>
                  <h2 style={sectionTitle}>Research Focus Areas</h2>
                  <div style={academicCard}>
                    <div style={cardAccent} />
                    <div style={cardTitle}>Academic Interests</div>
                    <div style={cardContent}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                        {interests.map((interest, idx) => (
                          <span key={interest.id} style={skillChip}>{interest.name}{idx < interests.length - 1 && ' ·'}</span>
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
      </div>
  )
}
