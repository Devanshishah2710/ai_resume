/**
 * Fresher Template — Neon
 *
 * Concept: A dark-theme, high-energy design with neon glow accents and a
 * futuristic club/creator aesthetic. The background is deep indigo-charcoal
 * with subtle grid lines, while section content glows on glass-like panels.
 * Heading text uses electric gradients. Perfect for bold fresh graduates
 * applying to creative tech, gaming, startups, and media roles where
 * personality matters as much as skills.
 *
 * Target: Creative-tech graduates, startup interns, digital media students,
 * gaming industry applicants, bold entry-level candidates.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'

export default function FresherNeonTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const pink = '#EC4899'
  const indigo = '#4F46E5'
  const sky = '#38BDF8'
  const darkBg = '#0F172A'
  const glassBg = 'rgba(255,255,255,0.04)'
  const glassBorder = 'rgba(255,255,255,0.06)'
  const textLight = 'rgba(255,255,255,0.85)'
  const textMuted = 'rgba(255,255,255,0.45)'

  const container: React.CSSProperties = {
    fontFamily: fontStack, fontSize, lineHeight, color: textLight,
    backgroundColor: darkBg, width: '210mm', minHeight: '297mm',
    boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
  }

  const gridBg: React.CSSProperties = {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
    backgroundSize: '24px 24px',
    zIndex: 0,
  }

  const glowOrb: React.CSSProperties = {
    position: 'absolute', top: '-120px', right: '-80px',
    width: '350px', height: '350px', borderRadius: '50%',
    background: `radial-gradient(circle, ${pink}15, transparent 70%)`,
    zIndex: 0, pointerEvents: 'none',
  }

  const glowOrb2: React.CSSProperties = {
    position: 'absolute', bottom: '-100px', left: '-60px',
    width: '280px', height: '280px', borderRadius: '50%',
    background: `radial-gradient(circle, ${indigo}12, transparent 70%)`,
    zIndex: 0, pointerEvents: 'none',
  }

  const headerSection: React.CSSProperties = {
    padding: '28mm 26mm 20mm 26mm',
    position: 'relative', zIndex: 1,
  }

  const nameStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 2.8)`,
    fontWeight: 900, lineHeight: 1,
    background: `linear-gradient(135deg, ${pink}, ${indigo}, ${sky})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.04em', marginBottom: '6px',
  }

  const headlineStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 0.9)`,
    fontWeight: 300, color: sky, letterSpacing: '0.15em',
    textTransform: 'uppercase', marginBottom: '14px',
  }

  const contactRow: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '8px',
  }

  const glassChip: React.CSSProperties = {
    backgroundColor: glassBg, padding: '4px 10px', borderRadius: '6px',
    color: textMuted, fontSize: `calc(${fontSize} * 0.78)`,
    border: `1px solid ${glassBorder}`,
    backdropFilter: 'blur(4px)',
    display: 'inline-flex', alignItems: 'center', gap: '4px',
  }

  const bodyArea: React.CSSProperties = {
    padding: '0 26mm 28mm 26mm',
    position: 'relative', zIndex: 1,
  }

  const glassPanel: React.CSSProperties = {
    backgroundColor: glassBg, borderRadius: '12px',
    padding: '16px 20px', marginBottom: `calc(${gap} * 1.2)`,
    border: `1px solid ${glassBorder}`,
    backdropFilter: 'blur(8px)',
    pageBreakInside: 'avoid',
    position: 'relative', overflow: 'hidden',
  }

  const panelGlow: React.CSSProperties = {
    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
    background: `linear-gradient(to right, ${pink}, ${indigo}, ${sky})`,
    opacity: 0.6,
  }

  const sectionTitle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 0.82)`,
    fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
    color: pink, marginBottom: `calc(${gap} * 0.6)`,
    display: 'flex', alignItems: 'center', gap: '8px',
  }

  const sectionDot: React.CSSProperties = {
    width: '6px', height: '6px', borderRadius: '50%',
    backgroundColor: sky, boxShadow: `0 0 8px ${sky}`,
  }

  const expEntry: React.CSSProperties = {
    marginBottom: `calc(${gap} * 0.6)`,
    paddingBottom: `calc(${gap} * 0.4)`,
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  }

  const expTitle: React.CSSProperties = {
    fontWeight: 600, fontSize: `calc(${fontSize} * 0.95)`,
    color: '#FFFFFF', marginBottom: '2px',
  }

  const expMeta: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.82)`, color: sky, fontWeight: 400,
  }

  const expDate: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.75)`, color: textMuted,
    marginTop: '2px',
  }

  const glowChip: React.CSSProperties = {
    display: 'inline-block', padding: '3px 10px', margin: '2px',
    backgroundColor: 'rgba(56,189,248,0.06)', color: sky,
    borderRadius: '6px', fontSize: `calc(${fontSize} * 0.78)`,
    border: '1px solid rgba(56,189,248,0.1)',
  }

  const pinkChip: React.CSSProperties = {
    ...glowChip,
    backgroundColor: 'rgba(236,72,153,0.06)', color: pink,
    borderColor: 'rgba(236,72,153,0.12)',
  }

  const skillCatRow: React.CSSProperties = {
    marginBottom: '8px',
  }

  const skillCatLabel: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.82)`, fontWeight: 600,
    color: '#FFFFFF', marginBottom: '4px',
    display: 'flex', alignItems: 'center', gap: '6px',
  }

  const twoCol: React.CSSProperties = {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `calc(${gap} * 0.8)`,
  }

  const certCard: React.CSSProperties = {
    padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
  }

  const certName: React.CSSProperties = {
    fontWeight: 500, fontSize: `calc(${fontSize} * 0.85)`, color: '#FFFFFF',
  }

  const certIssuer: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.72)`, color: textMuted,
  }

  const interestTag: React.CSSProperties = {
    display: 'inline-block', padding: '4px 12px', margin: '3px',
    background: `linear-gradient(135deg, ${pink}15, ${indigo}15)`,
    color: textLight, borderRadius: '20px',
    fontSize: `calc(${fontSize} * 0.82)`,
    border: `1px solid ${glassBorder}`,
  }

  return (
    <div style={container}>
      <div style={gridBg} />
      <div style={glowOrb} />
      <div style={glowOrb2} />

      <header style={headerSection}>
        <h1 style={nameStyle}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Fresh Graduate'}
        </h1>
        {personal.headline && <p style={headlineStyle}>{personal.headline}</p>}
        <div style={contactRow}>
          {personal.email && <span style={glassChip}>✉ {personal.email}</span>}
          {personal.phone && <span style={glassChip}>☎ {personal.phone}</span>}
          {personal.location && <span style={glassChip}>📍 {personal.location}</span>}
          {personal.linkedin && <span style={glassChip}>in {personal.linkedin}</span>}
          {personal.github && <span style={glassChip}>gh {personal.github}</span>}
        </div>
      </header>

      <div style={bodyArea}>
        {sections
          .filter(s => s.visible)
          .sort((a, b) => a.order - b.order)
          .map(section => {
            switch (section.type) {
              case 'summary':
                return data.summary ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Objective
                    </h2>
                    <div style={{ color: textMuted, lineHeight }}
                      dangerouslySetInnerHTML={{ __html: renderRichText(data.summary) }}
                    />
                  </section>
                ) : null

              case 'experience':
                return experience.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Experience
                    </h2>
                    {experience.map((exp) => (
                      <div key={exp.id} style={expEntry}>
                        <h3 style={expTitle}>{exp.position}</h3>
                        <p style={expMeta}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                        <p style={expDate}>{formatDateRange(exp.dateRange)}</p>
                        {exp.description && (
                          <div style={{ color: textMuted, lineHeight, fontSize: `calc(${fontSize} * 0.85)`, marginTop: '4px' }}
                            dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                          />
                        )}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'education':
                return education.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Education
                    </h2>
                    <div style={twoCol}>
                      {education.map((edu) => (
                        <div key={edu.id} style={expEntry}>
                          <h3 style={expTitle}>{edu.institution}</h3>
                          <p style={expMeta}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</p>
                          <p style={expDate}>{formatDateRange(edu.dateRange)}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'projects':
                return projects.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Projects
                    </h2>
                    <div style={twoCol}>
                      {projects.map((proj) => (
                        <div key={proj.id} style={expEntry}>
                          <h3 style={expTitle}>
                            {proj.url ? <a href={proj.url} style={{ color: sky, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                          </h3>
                          <p style={{ color: textMuted, fontSize: `calc(${fontSize} * 0.82)`, marginTop: '4px' }}>
                            {proj.description}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '6px' }}>
                            {proj.technologies.map((tech, i) => (
                              <span key={i} style={glowChip}>{tech}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'skills':
                return skills.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Skills
                    </h2>
                    <div style={twoCol}>
                      {skills.map((cat) => (
                        <div key={cat.id} style={skillCatRow}>
                          <p style={skillCatLabel}>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: pink, display: 'inline-block' }} />
                            {cat.name}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                            {cat.skills.map((s, i) => (
                              <span key={i} style={pinkChip}>{s}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'certifications':
                return certifications.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Certifications
                    </h2>
                    <div style={twoCol}>
                      {certifications.map((cert) => (
                        <div key={cert.id} style={certCard}>
                          <p style={certName}>{cert.name}</p>
                          <p style={certIssuer}>{cert.issuer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Achievements
                    </h2>
                    {achievements.map((ach) => (
                      <div key={ach.id} style={expEntry}>
                        <h3 style={expTitle}>{ach.title}</h3>
                        {ach.date && <p style={expDate}>{formatMonthYear(ach.date)}</p>}
                        {ach.description && <p style={{ color: textMuted, fontSize: `calc(${fontSize} * 0.85)` }}>{ach.description}</p>}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Awards
                    </h2>
                    {awards.map((award) => (
                      <div key={award.id} style={expEntry}>
                        <p style={{ fontWeight: 600, color: '#FFFFFF' }}>{award.title}</p>
                        <p style={expMeta}>{award.issuer}{award.date && ` · ${formatMonthYear(award.date)}`}</p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Volunteer
                    </h2>
                    {volunteer.map((vol) => (
                      <div key={vol.id} style={expEntry}>
                        <h3 style={expTitle}>{vol.role}</h3>
                        <p style={expMeta}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                        <p style={expDate}>{formatDateRange(vol.dateRange)}</p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Interests
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {interests.map((interest) => (
                        <span key={interest.id} style={interestTag}>
                          {interest.name}
                        </span>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'languages':
                return languages.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Languages
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {languages.map((lang) => (
                        <span key={lang.id} style={glowChip}>{lang.language}</span>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'publications':
                return publications.length > 0 ? (
                  <section key={section.id} style={glassPanel}>
                    <div style={panelGlow} />
                    <h2 style={sectionTitle}>
                      <span style={sectionDot} />
                      Publications
                    </h2>
                    {publications.map((pub) => (
                      <div key={pub.id} style={expEntry}>
                        <p style={{ fontWeight: 600, color: '#FFFFFF' }}>
                          {pub.url ? <a href={pub.url} style={{ color: sky, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                        </p>
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
