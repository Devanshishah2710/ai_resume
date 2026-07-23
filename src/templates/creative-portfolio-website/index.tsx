/**
 * Creative Template — Portfolio Website
 *
 * Concept: A premium personal portfolio website rendered as a resume.
 * Features a hero section with name/headline, floating project cards,
 * gradient backgrounds, and glassmorphism panels. Sections are designed
 * like portfolio page sections — About, Work, Skills, Contact. Large
 * typography, generous whitespace, and modern UI components create a
 * digital-native feel that looks like a Behance or Dribbble profile page.
 *
 * Target: Creative directors, UI/UX designers, visual designers, art
 * directors, brand strategists, and any creative professional who wants
 * their resume to feel like a portfolio website.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'

export default function CreativePortfolioWebsiteTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const sunset = '#F97316'
  const deep = '#1E0A3C'
  const cream = '#FFFBF5'
  const coral = '#FB7185'

  const container: React.CSSProperties = {
    fontFamily: fontStack, fontSize, lineHeight, color: '#1E0A3C',
    backgroundColor: cream, width: '210mm', minHeight: '297mm',
    boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
  }

  const heroSection: React.CSSProperties = {
    padding: '36mm 28mm 28mm 28mm',
    background: `linear-gradient(160deg, ${deep} 0%, #2D1B69 50%, ${deep} 100%)`,
    position: 'relative', overflow: 'hidden',
  }

  const heroBlob: React.CSSProperties = {
    position: 'absolute', top: '-80px', right: '-40px',
    width: '300px', height: '300px', borderRadius: '50%',
    background: `radial-gradient(circle, ${sunset}25, transparent 70%)`,
    zIndex: 0,
  }

  const heroBlob2: React.CSSProperties = {
    position: 'absolute', bottom: '-60px', left: '-30px',
    width: '200px', height: '200px', borderRadius: '50%',
    background: `radial-gradient(circle, ${coral}20, transparent 70%)`,
    zIndex: 0,
  }

  const nameStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 3.2)`,
    fontWeight: 900, color: '#FFFFFF', lineHeight: 1.05,
    letterSpacing: '-0.04em', position: 'relative', zIndex: 1,
  }

  const nameAccent: React.CSSProperties = {
    display: 'block',
    background: `linear-gradient(135deg, ${sunset}, ${coral})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  }

  const headlineStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 1.1)`, color: 'rgba(255,255,255,0.75)',
    fontWeight: 300, marginTop: '8px', position: 'relative', zIndex: 1,
  }

  const contactRow: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px',
    position: 'relative', zIndex: 1,
  }

  const contactPill: React.CSSProperties = {
    padding: '6px 14px', borderRadius: '24px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.7)', fontSize: `calc(${fontSize} * 0.85)`,
    border: '1px solid rgba(255,255,255,0.06)',
    backdropFilter: 'blur(4px)', display: 'inline-flex', alignItems: 'center', gap: '4px',
  }

  const bodyArea: React.CSSProperties = {
    padding: '0 28mm 28mm 28mm', position: 'relative', zIndex: 1,
    marginTop: '-12mm',
  }

  const glassCard: React.CSSProperties = {
    backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px 24px',
    marginBottom: `calc(${gap} * 1.5)`,
    boxShadow: '0 8px 32px rgba(30,10,60,0.06), 0 2px 8px rgba(30,10,60,0.04)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(30,10,60,0.04)',
    pageBreakInside: 'avoid',
  }

  const sectionTitle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 0.78)`,
    fontWeight: 700, color: sunset, textTransform: 'uppercase',
    letterSpacing: '0.12em', marginBottom: `calc(${gap} * 0.8)`,
    display: 'flex', alignItems: 'center', gap: '8px',
  }

  const sectionLine: React.CSSProperties = {
    flex: 1, height: '1px',
    background: `linear-gradient(to right, ${sunset}30, transparent)`,
  }

  const expEntry: React.CSSProperties = {
    marginBottom: `calc(${gap} * 0.8)`,
    paddingBottom: `calc(${gap} * 0.6)`,
    borderBottom: '1px solid rgba(30,10,60,0.04)',
  }

  const expTitle: React.CSSProperties = {
    fontWeight: 700, fontSize: `calc(${fontSize} * 1.0)`,
    color: deep, marginBottom: '2px',
  }

  const expMeta: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.88)`, color: sunset, fontWeight: 500,
  }

  const expDate: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.8)`, color: '#8B7D9B',
  }

  const projCard: React.CSSProperties = {
    borderRadius: '12px', overflow: 'hidden',
    marginBottom: `calc(${gap} * 0.6)`,
    boxShadow: '0 4px 16px rgba(30,10,60,0.06)',
  }

  const projHeader: React.CSSProperties = {
    padding: '12px 16px',
    background: `linear-gradient(135deg, ${sunset}10, ${coral}08)`,
  }

  const projTitle: React.CSSProperties = {
    fontWeight: 700, fontSize: `calc(${fontSize} * 0.95)`, color: deep,
  }

  const projTech: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.78)`, color: sunset, marginTop: '2px',
  }

  const chipGroup: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px',
  }

  const chip: React.CSSProperties = {
    padding: '4px 12px', fontSize: `calc(${fontSize} * 0.78)`,
    backgroundColor: `${sunset}10`, color: '#C2410C',
    borderRadius: '6px', border: `1px solid ${sunset}15`,
  }

  const skillGroup: React.CSSProperties = {
    marginBottom: '10px',
  }

  const skillLabel: React.CSSProperties = {
    fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`,
    color: deep, marginBottom: '6px',
  }

  const skillTags: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '4px',
  }

  const tag: React.CSSProperties = {
    padding: '3px 10px', fontSize: `calc(${fontSize} * 0.78)`,
    backgroundColor: `${deep}06`, color: '#5B4B7A',
    borderRadius: '4px',
  }

  const twoCol: React.CSSProperties = {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `calc(${gap} * 0.8)`,
  }

  const awardEntry: React.CSSProperties = {
    padding: '8px 0', borderBottom: '1px solid rgba(30,10,60,0.04)',
  }

  const achievementBadge: React.CSSProperties = {
    display: 'inline-block', padding: '4px 12px', margin: '3px',
    background: `linear-gradient(135deg, ${sunset}, ${coral})`,
    color: '#FFFFFF', borderRadius: '8px',
    fontSize: `calc(${fontSize} * 0.78)`, fontWeight: 600,
  }

  return (
    <div style={container}>
      <section style={heroSection}>
        <div style={heroBlob} />
        <div style={heroBlob2} />
        <h1 style={nameStyle}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Creative Name'}
          <span style={nameAccent}>.</span>
        </h1>
        {personal.headline && <p style={headlineStyle}>{personal.headline}</p>}
        <div style={contactRow}>
          {personal.email && <span style={contactPill}>✉ {personal.email}</span>}
          {personal.phone && <span style={contactPill}>☎ {personal.phone}</span>}
          {personal.location && <span style={contactPill}>📍 {personal.location}</span>}
          {personal.linkedin && <span style={contactPill}>in {personal.linkedin}</span>}
          {personal.github && <span style={contactPill}>gh {personal.github}</span>}
          {personal.website && <span style={contactPill}>🌐 {personal.website}</span>}
        </div>
      </section>

      <div style={bodyArea}>
        {sections
          .filter(s => s.visible)
          .sort((a, b) => a.order - b.order)
          .map(section => {
            switch (section.type) {
              case 'summary':
                return data.summary ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      About <span style={sectionLine} />
                    </h2>
                    <div style={{ color: '#5B4B7A', lineHeight, fontSize: `calc(${fontSize} * 1.02)` }}
                      dangerouslySetInnerHTML={{ __html: renderRichText(data.summary) }}
                    />
                  </section>
                ) : null

              case 'experience':
                return experience.length > 0 ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Work <span style={sectionLine} />
                    </h2>
                    {experience.map((exp) => (
                      <div key={exp.id} style={expEntry}>
                        <h3 style={expTitle}>{exp.position}</h3>
                        <p style={expMeta}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                        <p style={expDate}>{formatDateRange(exp.dateRange)}</p>
                        {exp.description && (
                          <div style={{ color: '#5B4B7A', lineHeight, marginTop: '4px', fontSize: `calc(${fontSize} * 0.88)` }}
                            dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                          />
                        )}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'education':
                return education.length > 0 ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Education <span style={sectionLine} />
                    </h2>
                    <div style={twoCol}>
                      {education.map((edu) => (
                        <div key={edu.id}>
                          <h3 style={expTitle}>{edu.institution}</h3>
                          <p style={expMeta}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</p>
                          <p style={expDate}>{formatDateRange(edu.dateRange)}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'projects':
                return projects.length > 0 ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Projects <span style={sectionLine} />
                    </h2>
                    <div style={twoCol}>
                      {projects.map((proj) => (
                        <div key={proj.id} style={projCard}>
                          <div style={projHeader}>
                            <h3 style={projTitle}>
                              {proj.url ? <a href={proj.url} style={{ color: deep, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                            </h3>
                            <p style={projTech}>{proj.technologies?.join(', ')}</p>
                          </div>
                          {proj.description && (
                            <div style={{ padding: '10px 16px', color: '#5B4B7A', fontSize: `calc(${fontSize} * 0.82)` }}>
                              {proj.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'skills':
                return skills.length > 0 ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Toolkit <span style={sectionLine} />
                    </h2>
                    <div style={twoCol}>
                      {skills.map((cat) => (
                        <div key={cat.id} style={skillGroup}>
                          <p style={skillLabel}>{cat.name}</p>
                          <div style={skillTags}>
                            {cat.skills.map((s, i) => (
                              <span key={i} style={tag}>{s}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Achievements <span style={sectionLine} />
                    </h2>
                    {achievements.map((ach) => (
                      <div key={ach.id} style={awardEntry}>
                        <h3 style={expTitle}>{ach.title}</h3>
                        {ach.date && <p style={expDate}>{formatMonthYear(ach.date)}</p>}
                        {ach.description && <p style={{ color: '#5B4B7A', marginTop: '2px', fontSize: `calc(${fontSize} * 0.85)` }}>{ach.description}</p>}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'certifications':
                return certifications.length > 0 ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Certs <span style={sectionLine} />
                    </h2>
                    <div style={chipGroup}>
                      {certifications.map((cert) => (
                        <span key={cert.id} style={achievementBadge}>
                          {cert.name}
                        </span>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Awards <span style={sectionLine} />
                    </h2>
                    {awards.map((award) => (
                      <div key={award.id} style={awardEntry}>
                        <p style={{ fontWeight: 600, color: deep }}>{award.title}</p>
                        <p style={expMeta}>{award.issuer}{award.date && ` · ${formatMonthYear(award.date)}`}</p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Community <span style={sectionLine} />
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
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Interests <span style={sectionLine} />
                    </h2>
                    <div style={chipGroup}>
                      {interests.map((interest) => (
                        <span key={interest.id} style={chip}>{interest.name}</span>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'languages':
                return languages.length > 0 ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Languages <span style={sectionLine} />
                    </h2>
                    <div style={chipGroup}>
                      {languages.map((lang) => (
                        <span key={lang.id} style={tag}>{lang.language}</span>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'publications':
                return publications.length > 0 ? (
                  <section key={section.id} style={glassCard}>
                    <h2 style={sectionTitle}>
                      Writing <span style={sectionLine} />
                    </h2>
                    {publications.map((pub) => (
                      <div key={pub.id} style={awardEntry}>
                        <p style={{ fontWeight: 600, color: deep }}>
                          {pub.url ? <a href={pub.url} style={{ color: sunset, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
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
