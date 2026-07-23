/**
 * Fresher Template — Trail
 *
 * Concept: A career-roadmap inspired design with a decorative winding
 * "trail" path running vertically through the left side. Section markers
 * hang off the trail like journey milestones. The layout is a single
 * column with a warm coral and navy palette that feels approachable and
 * energetic — ideal for fresh graduates mapping their career journey.
 *
 * Target: College students, fresh graduates, first-job applicants,
 * campus placement candidates.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'

export default function FresherTrailTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const coral = '#FF6B6B'
  const navy = '#1A2A3A'
  const cream = '#FEF9EF'
  const warmGray = '#8B7E74'

  const trailWidth = '32px'

  const container: React.CSSProperties = {
    fontFamily: fontStack, fontSize, lineHeight, color: '#1A2A3A',
    backgroundColor: cream, width: '210mm', minHeight: '297mm',
    boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
    padding: '0 0 28mm 0',
  }

  const headerBar: React.CSSProperties = {
    backgroundColor: navy, padding: '22mm 28mm 18mm 48mm',
    position: 'relative', overflow: 'hidden',
  }

  const headerBarAccent: React.CSSProperties = {
    position: 'absolute', right: '-40px', bottom: '-40px',
    width: '200px', height: '200px', borderRadius: '50%',
    backgroundColor: coral, opacity: 0.12,
  }

  const nameStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 2.6)`,
    fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em',
    lineHeight: 1.1, marginBottom: '4px',
  }

  const headlineStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 1.0)`,
    fontWeight: 400, color: coral, letterSpacing: '0.06em',
  }

  const contactRow: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '14px',
    color: 'rgba(255,255,255,0.75)', fontSize: `calc(${fontSize} * 0.85)`,
  }

  const contactItem: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '6px',
  }

  const trailLine: React.CSSProperties = {
    position: 'absolute', left: 0, top: 0, bottom: 0,
    width: trailWidth,
    background: `linear-gradient(to bottom, ${coral} 2px, transparent 2px)`,
    backgroundSize: '2px 20px', backgroundRepeat: 'repeat-y',
    backgroundPosition: 'center',
    opacity: 0.2,
  }

  const bodyPadding = '28mm'

  const sectionBlock: React.CSSProperties = {
    marginLeft: `calc(${trailWidth} + 20px)`,
    paddingRight: bodyPadding,
    position: 'relative',
    marginBottom: `calc(${gap} * 2)`,
    pageBreakInside: 'avoid',
  }

  const trailMarker: React.CSSProperties = {
    position: 'absolute', left: `calc(-${trailWidth} - 14px)`,
    top: '4px', width: '14px', height: '14px',
    borderRadius: '50%', backgroundColor: coral,
    border: `3px solid ${cream}`, boxShadow: `0 0 0 2px ${coral}`,
    zIndex: 2,
  }

  const sectionTitle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 1.1)`,
    fontWeight: 700, color: navy, textTransform: 'uppercase',
    letterSpacing: '0.08em', marginBottom: `calc(${gap} * 0.8)`,
    position: 'relative', display: 'inline-block',
  }

  const sectionTitleUnderline: React.CSSProperties = {
    position: 'absolute', bottom: '-4px', left: 0, right: '20%',
    height: '2px', backgroundColor: coral,
  }

  const expCard: React.CSSProperties = {
    backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '14px 16px',
    marginBottom: `calc(${gap} * 0.8)`,
    boxShadow: '0 2px 8px rgba(26,42,58,0.06)',
    borderLeft: `3px solid ${coral}`,
  }

  const expTitle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 1.0)`,
    fontWeight: 700, color: navy, marginBottom: '2px',
  }

  const expMeta: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 0.88)`,
    color: coral, fontWeight: 500, marginBottom: '4px',
  }

  const expDate: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.82)`, color: warmGray,
    marginBottom: '6px',
  }

  const skillPill: React.CSSProperties = {
    display: 'inline-block', padding: '4px 12px', margin: '3px',
    backgroundColor: '#FFFFFF', color: navy, borderRadius: '20px',
    fontSize: `calc(${fontSize} * 0.85)`, fontWeight: 500,
    border: `1px solid ${coral}40`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  }

  const tagGroup: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '2px', marginTop: '8px',
  }

  const certBadge: React.CSSProperties = {
    backgroundColor: navy, color: '#FFFFFF', padding: '6px 12px',
    borderRadius: '6px', fontSize: `calc(${fontSize} * 0.82)`,
    fontWeight: 600, display: 'inline-block', marginBottom: '4px',
  }

  return (
    <div style={container}>
      <div style={trailLine} />

      <header style={headerBar}>
        <div style={headerBarAccent} />
        <h1 style={nameStyle}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Fresh Graduate'}
        </h1>
        {personal.headline && <p style={headlineStyle}>{personal.headline}</p>}
        <div style={contactRow}>
          {personal.email && <span style={contactItem}>✉ {personal.email}</span>}
          {personal.phone && <span style={contactItem}>☎ {personal.phone}</span>}
          {personal.location && <span style={contactItem}>📍 {personal.location}</span>}
          {personal.linkedin && <span style={contactItem}>in {personal.linkedin.replace('https://', '')}</span>}
          {personal.github && <span style={contactItem}>gh {personal.github.replace('https://', '')}</span>}
        </div>
      </header>

      <div style={{ paddingTop: bodyPadding }}>
        {sections
          .filter(s => s.visible)
          .sort((a, b) => a.order - b.order)
          .map(section => {
            switch (section.type) {
              case 'summary':
                return data.summary ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Career Goal
                      <span style={sectionTitleUnderline} />
                    </h2>
                    <div style={expCard}>
                      <div style={{ color: '#475569', lineHeight }}
                        dangerouslySetInnerHTML={{ __html: renderRichText(data.summary) }}
                      />
                    </div>
                  </section>
                ) : null

              case 'experience':
                return experience.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Experience Trail
                      <span style={sectionTitleUnderline} />
                    </h2>
                    {experience.map((exp) => (
                      <div key={exp.id} style={expCard}>
                        <h3 style={expTitle}>{exp.position}</h3>
                        <p style={expMeta}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                        <p style={expDate}>{formatDateRange(exp.dateRange)}</p>
                        {exp.description && (
                          <div style={{ marginTop: '6px', color: '#475569', lineHeight }}
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
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Academic Path
                      <span style={sectionTitleUnderline} />
                    </h2>
                    {education.map((edu) => (
                      <div key={edu.id} style={expCard}>
                        <h3 style={expTitle}>{edu.institution}</h3>
                        <p style={expMeta}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</p>
                        <p style={expDate}>
                          {formatDateRange(edu.dateRange)}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                        </p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'projects':
                return projects.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Projects
                      <span style={sectionTitleUnderline} />
                    </h2>
                    {projects.map((proj) => (
                      <div key={proj.id} style={expCard}>
                        <h3 style={expTitle}>
                          {proj.url ? <a href={proj.url} style={{ color: coral, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                        </h3>
                        {proj.description && <p style={{ color: '#475569', marginTop: '4px' }}>{proj.description}</p>}
                        <div style={tagGroup}>
                          {proj.technologies.map((tech, i) => (
                            <span key={i} style={skillPill}>{tech}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'skills':
                return skills.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Skill Toolkit
                      <span style={sectionTitleUnderline} />
                    </h2>
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ marginBottom: `calc(${gap} * 0.6)` }}>
                        <p style={{ fontWeight: 600, color: navy, fontSize: `calc(${fontSize} * 0.9)`, marginBottom: '4px' }}>
                          {cat.name}
                        </p>
                        <div style={tagGroup}>
                          {cat.skills.map((s, i) => (
                            <span key={i} style={skillPill}>{s}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'certifications':
                return certifications.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Certifications
                      <span style={sectionTitleUnderline} />
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {certifications.map((cert) => (
                        <div key={cert.id} style={certBadge}>
                          <div style={{ fontWeight: 700 }}>{cert.name}</div>
                          <div style={{ opacity: 0.8, fontSize: `calc(${fontSize} * 0.78)` }}>{cert.issuer}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Achievements
                      <span style={sectionTitleUnderline} />
                    </h2>
                    {achievements.map((ach) => (
                      <div key={ach.id} style={expCard}>
                        <h3 style={expTitle}>{ach.title}</h3>
                        {ach.date && <p style={expDate}>{formatMonthYear(ach.date)}</p>}
                        {ach.description && <p style={{ color: '#475569', marginTop: '4px' }}>{ach.description}</p>}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Awards
                      <span style={sectionTitleUnderline} />
                    </h2>
                    {awards.map((award) => (
                      <div key={award.id} style={expCard}>
                        <h3 style={expTitle}>{award.title}</h3>
                        <p style={expMeta}>{award.issuer}{award.date && ` · ${formatMonthYear(award.date)}`}</p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Volunteering
                      <span style={sectionTitleUnderline} />
                    </h2>
                    {volunteer.map((vol) => (
                      <div key={vol.id} style={expCard}>
                        <h3 style={expTitle}>{vol.role}</h3>
                        <p style={expMeta}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                        <p style={expDate}>{formatDateRange(vol.dateRange)}</p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Interests
                      <span style={sectionTitleUnderline} />
                    </h2>
                    <div style={tagGroup}>
                      {interests.map((interest) => (
                        <span key={interest.id} style={{
                          ...skillPill, backgroundColor: `${coral}15`, borderColor: `${coral}30`,
                        }}>
                          {interest.name}
                        </span>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'languages':
                return languages.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Languages
                      <span style={sectionTitleUnderline} />
                    </h2>
                    <div style={tagGroup}>
                      {languages.map((lang) => (
                        <span key={lang.id} style={{
                          ...skillPill, backgroundColor: '#FFFFFF', borderColor: `${navy}20`,
                        }}>
                          {lang.language}
                        </span>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'publications':
                return publications.length > 0 ? (
                  <section key={section.id} style={sectionBlock}>
                    <div style={trailMarker} />
                    <h2 style={sectionTitle}>
                      Publications
                      <span style={sectionTitleUnderline} />
                    </h2>
                    {publications.map((pub) => (
                      <div key={pub.id} style={expCard}>
                        <h3 style={expTitle}>
                          {pub.url ? <a href={pub.url} style={{ color: coral, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                        </h3>
                        <p style={expMeta}>{pub.publisher}{pub.date && ` · ${formatMonthYear(pub.date)}`}</p>
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
