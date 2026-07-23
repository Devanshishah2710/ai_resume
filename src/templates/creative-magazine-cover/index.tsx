/**
 * Creative Template — Magazine Cover
 *
 * Concept: Inspired by premium magazine covers (Vogue, Forbes, TIME).
 * The name is treated as the magazine masthead — huge, bold, commanding.
 * The headline is the "cover line". Sections are arranged as editorial
 * spreads with pull quotes, overlapping typography, and a dramatic
 * visual hierarchy. The entire resume reads like a magazine feature
 * article about the person. Editorial grid with asymmetric layout.
 *
 * Target: Brand strategists, creative directors, editors, writers,
 * marketing leaders, and any creative professional who wants editorial
 * gravitas.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'

export default function CreativeMagazineCoverTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const gold = '#D4A853'
  const ink = '#1A1A2E'
  const paper = '#F5F0EB'
  const deepRose = '#B83280'

  const container: React.CSSProperties = {
    fontFamily: fontStack, fontSize, lineHeight, color: ink,
    backgroundColor: paper, width: '210mm', minHeight: '297mm',
    boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
  }

  const masthead: React.CSSProperties = {
    textAlign: 'center', padding: '20mm 28mm 6mm 28mm',
    position: 'relative',
  }

  const mastheadLine: React.CSSProperties = {
    width: '60%', margin: '0 auto', height: '1px',
    backgroundColor: gold, opacity: 0.5,
  }

  const nameStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 4.0)`,
    fontWeight: 900, color: ink, letterSpacing: '-0.06em',
    lineHeight: 0.95, textTransform: 'uppercase',
    marginBottom: '4px',
    textShadow: '4px 4px 0 rgba(212,168,83,0.08)',
  }

  const coverLine: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 0.9)`,
    fontWeight: 400, fontStyle: 'italic', color: deepRose,
    letterSpacing: '0.08em', marginTop: '6px',
    maxWidth: '70%', margin: '6px auto 0',
  }

  const contactStrip: React.CSSProperties = {
    display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap',
    padding: '6mm 28mm', borderTop: '1px solid rgba(26,26,46,0.06)',
    borderBottom: '1px solid rgba(26,26,46,0.06)',
    margin: '0 28mm', fontSize: `calc(${fontSize} * 0.78)`,
    color: '#6B6B80', letterSpacing: '0.04em',
  }

  const bodyArea: React.CSSProperties = {
    padding: '8mm 28mm 28mm 28mm',
  }

  const spreadCard: React.CSSProperties = {
    marginBottom: `calc(${gap} * 1.8)`,
    pageBreakInside: 'avoid',
    position: 'relative',
  }

  const sectionTitle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 1.6)`,
    fontWeight: 800, color: ink, lineHeight: 1.1,
    marginBottom: `calc(${gap} * 0.6)`,
    textTransform: 'uppercase', letterSpacing: '-0.02em',
  }

  const pullQuote: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 1.2)`,
    fontWeight: 300, fontStyle: 'italic', color: deepRose,
    lineHeight: 1.4, padding: '0 0 8px 16px',
    borderLeft: `3px solid ${gold}`,
    marginBottom: `calc(${gap} * 0.8)`,
  }

  const expRow: React.CSSProperties = {
    marginBottom: `calc(${gap} * 0.8)`,
    paddingBottom: `calc(${gap} * 0.6)`,
    borderBottom: '1px solid rgba(26,26,46,0.04)',
  }

  const expTitle: React.CSSProperties = {
    fontWeight: 700, fontSize: `calc(${fontSize} * 1.05)`,
    color: ink, marginBottom: '2px',
  }

  const expMeta: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.88)`, color: deepRose, fontWeight: 500,
  }

  const expDate: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.8)`, color: '#8B8BA0', fontStyle: 'italic',
  }

  const editorialGrid: React.CSSProperties = {
    display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: `calc(${gap} * 1.2)`,
  }

  const sidebarSection: React.CSSProperties = {
    borderLeft: `1px solid rgba(212,168,83,0.2)`,
    paddingLeft: '16px', marginBottom: `calc(${gap} * 0.8)`,
  }

  const sidebarTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.72)`, fontWeight: 700,
    color: gold, textTransform: 'uppercase', letterSpacing: '0.18em',
    marginBottom: '6px',
  }

  const pill: React.CSSProperties = {
    display: 'inline-block', padding: '2px 8px', margin: '2px',
    fontSize: `calc(${fontSize} * 0.78)`, color: '#6B6B80',
    border: '1px solid rgba(26,26,46,0.1)', borderRadius: '3px',
  }

  const goldPill: React.CSSProperties = {
    ...pill, borderColor: `${gold}30`, color: '#8B7530',
    backgroundColor: `${gold}06`,
  }

  const featureBlock: React.CSSProperties = {
    padding: '12px 16px', marginBottom: '8px',
    backgroundColor: '#FFFFFF', borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(26,26,46,0.04)',
  }

  const featureTitle: React.CSSProperties = {
    fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: ink,
    marginBottom: '2px',
  }

  const featureMeta: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.78)`, color: deepRose,
  }

  return (
    <div style={container}>
      <header style={masthead}>
        <div style={mastheadLine} />
        <h1 style={nameStyle}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Creative Name'}
        </h1>
        {personal.headline && <p style={coverLine}>{personal.headline}</p>}
        <div style={mastheadLine} />
      </header>

      <div style={contactStrip}>
        {personal.email && <span>✉ {personal.email}</span>}
        {personal.phone && <span>☎ {personal.phone}</span>}
        {personal.location && <span>📍 {personal.location}</span>}
        {personal.linkedin && <span>in {personal.linkedin}</span>}
        {personal.github && <span>gh {personal.github}</span>}
        {personal.website && <span>🌐 {personal.website}</span>}
      </div>

      <div style={bodyArea}>
        {sections
          .filter(s => s.visible)
          .sort((a, b) => a.order - b.order)
          .map(section => {
            switch (section.type) {
              case 'summary':
                return data.summary ? (
                  <section key={section.id} style={spreadCard}>
                    <h2 style={sectionTitle}>Profile</h2>
                    <div style={pullQuote}
                      dangerouslySetInnerHTML={{ __html: renderRichText(data.summary) }}
                    />
                  </section>
                ) : null

              case 'experience':
                return experience.length > 0 ? (
                  <section key={section.id} style={spreadCard}>
                    <h2 style={sectionTitle}>Career</h2>
                    <div style={editorialGrid}>
                      <div>
                        {experience.map((exp) => (
                          <div key={exp.id} style={expRow}>
                            <h3 style={expTitle}>{exp.position}</h3>
                            <p style={expMeta}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                            <p style={expDate}>{formatDateRange(exp.dateRange)}</p>
                            {exp.description && (
                              <div style={{ color: '#6B6B80', lineHeight, marginTop: '4px', fontSize: `calc(${fontSize} * 0.85)` }}
                                dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div>
                        {skills.length > 0 && (
                          <div style={sidebarSection}>
                            <h3 style={sidebarTitle}>Expertise</h3>
                            <div>
                              {skills.map((cat) => (
                                <div key={cat.id} style={{ marginBottom: '8px' }}>
                                  <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.82)`, color: ink }}>{cat.name}</p>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
                                    {cat.skills.map((s, i) => (
                                      <span key={i} style={goldPill}>{s}</span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                ) : null

              case 'education':
                return education.length > 0 ? (
                  <section key={section.id} style={spreadCard}>
                    <h2 style={sectionTitle}>Education</h2>
                    <div style={editorialGrid}>
                      {education.map((edu) => (
                        <div key={edu.id} style={featureBlock}>
                          <h3 style={featureTitle}>{edu.institution}</h3>
                          <p style={featureMeta}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</p>
                          <p style={expDate}>{formatDateRange(edu.dateRange)}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'projects':
                return projects.length > 0 ? (
                  <section key={section.id} style={spreadCard}>
                    <h2 style={sectionTitle}>Projects</h2>
                    <div style={editorialGrid}>
                      {projects.map((proj) => (
                        <div key={proj.id} style={featureBlock}>
                          <h3 style={featureTitle}>
                            {proj.url ? <a href={proj.url} style={{ color: ink, textDecoration: 'none', borderBottom: `1px solid ${gold}` }}>{proj.name}</a> : proj.name}
                          </h3>
                          {proj.description && <p style={{ color: '#6B6B80', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '2px' }}>{proj.description}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'skills':
                return skills.length > 0 && !sections.find(s => s.type === 'experience')?.visible ? (
                  <section key={section.id} style={spreadCard}>
                    <h2 style={sectionTitle}>Skills</h2>
                    <div style={editorialGrid}>
                      {skills.map((cat) => (
                        <div key={cat.id} style={sidebarSection}>
                          <h3 style={sidebarTitle}>{cat.name}</h3>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                            {cat.skills.map((s, i) => (
                              <span key={i} style={goldPill}>{s}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'certifications':
                return certifications.length > 0 ? (
                  <section key={section.id} style={sidebarSection}>
                    <h3 style={sidebarTitle}>Certifications</h3>
                    {certifications.map((cert) => (
                      <div key={cert.id} style={{ marginBottom: '4px' }}>
                        <p style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 0.82)`, color: ink }}>{cert.name}</p>
                        <p style={expDate}>{cert.issuer}</p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <section key={section.id} style={spreadCard}>
                    <h2 style={sectionTitle}>Notable</h2>
                    {achievements.map((ach) => (
                      <div key={ach.id} style={featureBlock}>
                        <h3 style={featureTitle}>{ach.title}</h3>
                        {ach.date && <p style={expDate}>{formatMonthYear(ach.date)}</p>}
                        {ach.description && <p style={{ color: '#6B6B80', fontSize: `calc(${fontSize} * 0.82)` }}>{ach.description}</p>}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <section key={section.id} style={sidebarSection}>
                    <h3 style={sidebarTitle}>Awards</h3>
                    {awards.map((award) => (
                      <div key={award.id} style={{ marginBottom: '6px' }}>
                        <p style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 0.82)`, color: ink }}>{award.title}</p>
                        <p style={expDate}>{award.issuer}{award.date && ` · ${formatMonthYear(award.date)}`}</p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <section key={section.id} style={sidebarSection}>
                    <h3 style={sidebarTitle}>Community</h3>
                    {volunteer.map((vol) => (
                      <div key={vol.id} style={{ marginBottom: '6px' }}>
                        <p style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 0.82)`, color: ink }}>{vol.role}</p>
                        <p style={expDate}>{vol.organization}{vol.dateRange && ` · ${formatDateRange(vol.dateRange)}`}</p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <section key={section.id} style={sidebarSection}>
                    <h3 style={sidebarTitle}>Interests</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {interests.map((interest) => (
                        <span key={interest.id} style={pill}>{interest.name}</span>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'languages':
                return languages.length > 0 ? (
                  <section key={section.id} style={sidebarSection}>
                    <h3 style={sidebarTitle}>Languages</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {languages.map((lang) => (
                        <span key={lang.id} style={goldPill}>{lang.language}</span>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'publications':
                return publications.length > 0 ? (
                  <section key={section.id} style={spreadCard}>
                    <h2 style={sectionTitle}>Writings</h2>
                    {publications.map((pub) => (
                      <div key={pub.id} style={featureBlock}>
                        <p style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 0.88)`, color: ink }}>
                          {pub.url ? <a href={pub.url} style={{ color: ink, textDecoration: 'none', borderBottom: `1px solid ${gold}` }}>{pub.title}</a> : pub.title}
                        </p>
                        <p style={expDate}>{pub.publisher}{pub.date && ` · ${formatMonthYear(pub.date)}`}</p>
                      </div>
                    ))}
                  </section>
                ) : null

              default:
                return null
            }
          })}
      </div>
    </div>
  )
}
