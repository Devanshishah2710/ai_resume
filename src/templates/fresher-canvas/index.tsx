/**
 * Fresher Template — Canvas
 *
 * Concept: An art-gallery / creative-portfolio inspired design. The page
 * reads like a curated exhibition panel — generous whitespace, floating
 * section blocks, artistic accent splashes, and editorial typography.
 * The name is treated as a bold gallery title. Sections float as
 * independent "artworks" on the canvas, each with its own composition.
 * Perfect for design students, creative graduates, and portfolio-driven
 * entry-level roles.
 *
 * Target: Design graduates, creative interns, art school students,
 * portfolio-based entry-level applicants.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'

export default function FresherCanvasTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const purple = '#7C3AED'
  const cyan = '#06B6D4'
  const white = '#FFFFFF'
  const lightBg = '#FAFAFE'
  const ink = '#1E0A3C'

  const container: React.CSSProperties = {
    fontFamily: fontStack, fontSize, lineHeight, color: ink,
    backgroundColor: lightBg, width: '210mm', minHeight: '297mm',
    boxSizing: 'border-box', padding: '0',
    position: 'relative', overflow: 'hidden',
  }

  const headerSection: React.CSSProperties = {
    padding: '24mm 28mm 20mm 28mm',
    position: 'relative',
    overflow: 'hidden',
  }

  const artistSplash: React.CSSProperties = {
    position: 'absolute', top: '-80px', right: '-60px',
    width: '280px', height: '280px', borderRadius: '50%',
    background: `linear-gradient(135deg, ${purple}30, ${cyan}20)`,
    zIndex: 0,
  }

  const artistSplash2: React.CSSProperties = {
    position: 'absolute', bottom: '-40px', left: '-30px',
    width: '160px', height: '160px', borderRadius: '50%',
    background: `linear-gradient(45deg, ${cyan}15, transparent)`,
    zIndex: 0,
  }

  const nameStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 3.0)`,
    fontWeight: 800, color: ink, letterSpacing: '-0.06em',
    lineHeight: 1, marginBottom: '6px', position: 'relative', zIndex: 1,
  }

  const displayBracket: React.CSSProperties = {
    color: purple, fontSize: `calc(${fontSize} * 3.0)`,
    fontWeight: 200, lineHeight: 1, marginRight: '-4px',
  }

  const headlineStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 0.95)`,
    fontWeight: 400, color: purple, letterSpacing: '0.12em',
    textTransform: 'uppercase', position: 'relative', zIndex: 1,
    marginBottom: '16px',
  }

  const contactStrip: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '12px',
    color: '#6B5B8A', fontSize: `calc(${fontSize} * 0.85)`,
    position: 'relative', zIndex: 1,
    borderTop: `1px solid ${purple}20`, paddingTop: '12px',
  }

  const contactTag: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    backgroundColor: `${purple}08`, padding: '2px 10px',
    borderRadius: '4px',
  }

  const floatingSection: React.CSSProperties = {
    margin: `0 28mm calc(${gap} * 1.8) 28mm`,
    pageBreakInside: 'avoid', position: 'relative',
  }

  const sectionTitle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 0.78)`,
    fontWeight: 700, color: purple, textTransform: 'uppercase',
    letterSpacing: '0.3em', marginBottom: `calc(${gap} * 0.6)`,
    display: 'inline-block', position: 'relative',
  }

  const sectionBar: React.CSSProperties = {
    width: '40px', height: '3px', backgroundColor: cyan,
    marginBottom: `calc(${gap} * 0.4)`,
    borderRadius: '2px',
  }

  const card: React.CSSProperties = {
    backgroundColor: white, borderRadius: '4px', padding: '16px 20px',
    marginBottom: `calc(${gap} * 0.8)`,
    boxShadow: '0 4px 20px rgba(124,58,237,0.06)',
    border: '1px solid rgba(124,58,237,0.06)',
    position: 'relative', overflow: 'hidden',
  }

  const cardDot: React.CSSProperties = {
    position: 'absolute', top: '8px', right: '8px',
    width: '6px', height: '6px', borderRadius: '50%',
    backgroundColor: cyan, opacity: 0.3,
  }

  const cardTitle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 1.0)`,
    fontWeight: 700, color: ink, marginBottom: '2px',
  }

  const cardMeta: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.88)`, color: purple, fontWeight: 500,
  }

  const cardDate: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.82)`, color: '#8B7BAB',
    marginBottom: '4px',
  }

  const chipRow: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px',
  }

  const chip: React.CSSProperties = {
    padding: '3px 10px', fontSize: `calc(${fontSize} * 0.8)`,
    backgroundColor: `${purple}08`, color: purple,
    borderRadius: '3px', border: `1px solid ${purple}12`,
  }

  const chipCyan: React.CSSProperties = {
    ...chip, backgroundColor: `${cyan}08`, color: '#0891B2',
    borderColor: `${cyan}15`,
  }

  const artDivider: React.CSSProperties = {
    height: '1px', background: `linear-gradient(to right, ${purple}20, ${cyan}20, transparent)`,
    margin: `calc(${gap} * 1.5) 28mm`,
  }

  const skillBlock: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '20px',
  }

  const skillCat: React.CSSProperties = {
    flex: '1 1 180px',
  }

  const skillCatTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.85)`, fontWeight: 600,
    color: ink, marginBottom: '6px',
    borderBottom: `1px solid ${purple}10`, paddingBottom: '4px',
  }

  return (
    <div style={container}>
      <header style={headerSection}>
        <div style={artistSplash} />
        <div style={artistSplash2} />
        <h1 style={nameStyle}>
          <span style={displayBracket}>&#123;</span>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Creative Fresh'}
          <span style={displayBracket}>&#125;</span>
        </h1>
        {personal.headline && <p style={headlineStyle}>{personal.headline}</p>}
        <div style={contactStrip}>
          {personal.email && <span style={contactTag}>✉ {personal.email}</span>}
          {personal.phone && <span style={contactTag}>☎ {personal.phone}</span>}
          {personal.location && <span style={contactTag}>📍 {personal.location}</span>}
          {personal.linkedin && <span style={contactTag}>in {personal.linkedin}</span>}
          {personal.github && <span style={contactTag}>gh {personal.github}</span>}
          {personal.website && <span style={contactTag}>🌐 {personal.website}</span>}
        </div>
      </header>

      {sections
        .filter(s => s.visible)
        .sort((a, b) => a.order - b.order)
        .map(section => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Manifesto</h2>
                  <div style={card}>
                    <div style={cardDot} />
                    <div style={{ color: '#555', lineHeight }}
                      dangerouslySetInnerHTML={{ __html: renderRichText(data.summary) }}
                    />
                  </div>
                </section>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Experience</h2>
                  {experience.map((exp) => (
                    <div key={exp.id} style={card}>
                      <div style={cardDot} />
                      <h3 style={cardTitle}>{exp.position}</h3>
                      <p style={cardMeta}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                      <p style={cardDate}>{formatDateRange(exp.dateRange)}</p>
                      {exp.description && (
                        <div style={{ marginTop: '6px', color: '#555', lineHeight }}
                          dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                        />
                      )}
                    </div>
                  ))}
                </section>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} style={card}>
                      <div style={cardDot} />
                      <h3 style={cardTitle}>{edu.institution}</h3>
                      <p style={cardMeta}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</p>
                      <p style={cardDate}>{formatDateRange(edu.dateRange)}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                    </div>
                  ))}
                </section>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Projects</h2>
                  {projects.map((proj) => (
                    <div key={proj.id} style={card}>
                      <div style={cardDot} />
                      <h3 style={cardTitle}>
                        {proj.url ? <a href={proj.url} style={{ color: purple, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      </h3>
                      {proj.description && <p style={{ color: '#555', marginTop: '4px' }}>{proj.description}</p>}
                      <div style={chipRow}>
                        {proj.technologies.map((tech, i) => (
                          <span key={i} style={chipCyan}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Skills</h2>
                  <div style={card}>
                    <div style={cardDot} />
                    <div style={skillBlock}>
                      {skills.map((cat) => (
                        <div key={cat.id} style={skillCat}>
                          <p style={skillCatTitle}>{cat.name}</p>
                          <div style={chipRow}>
                            {cat.skills.map((s, i) => (
                              <span key={i} style={chip}>{s}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Certifications</h2>
                  <div style={chipRow}>
                    {certifications.map((cert) => (
                      <span key={cert.id} style={{ ...chip, backgroundColor: `${purple}12`, borderColor: `${purple}20`, padding: '6px 14px' }}>
                        {cert.name} — {cert.issuer}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Achievements</h2>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={{ ...card, backgroundColor: `${purple}03` }}>
                      <div style={cardDot} />
                      <h3 style={cardTitle}>{ach.title}</h3>
                      {ach.date && <p style={cardDate}>{formatMonthYear(ach.date)}</p>}
                      {ach.description && <p style={{ color: '#555' }}>{ach.description}</p>}
                    </div>
                  ))}
                </section>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Awards</h2>
                  {awards.map((award) => (
                    <div key={award.id} style={card}>
                      <div style={cardDot} />
                      <h3 style={cardTitle}>{award.title}</h3>
                      <p style={cardMeta}>{award.issuer}{award.date && ` · ${formatMonthYear(award.date)}`}</p>
                    </div>
                  ))}
                </section>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Volunteer</h2>
                  {volunteer.map((vol) => (
                    <div key={vol.id} style={card}>
                      <div style={cardDot} />
                      <h3 style={cardTitle}>{vol.role}</h3>
                      <p style={cardMeta}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                      <p style={cardDate}>{formatDateRange(vol.dateRange)}</p>
                    </div>
                  ))}
                </section>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Interests</h2>
                  <div style={chipRow}>
                    {interests.map((interest) => (
                      <span key={interest.id} style={chip}>{interest.name}</span>
                    ))}
                  </div>
                </section>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Languages</h2>
                  <div style={chipRow}>
                    {languages.map((lang) => (
                      <span key={lang.id} style={chipCyan}>{lang.language}</span>
                    ))}
                  </div>
                </section>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <section key={section.id} style={floatingSection}>
                  <div style={sectionBar} />
                  <h2 style={sectionTitle}>Publications</h2>
                  <div style={card}>
                    <div style={cardDot} />
                    {publications.map((pub) => (
                      <div key={pub.id} style={{ marginBottom: '8px' }}>
                        <p style={{ fontWeight: 600, color: ink }}>
                          {pub.url ? <a href={pub.url} style={{ color: purple, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                        </p>
                        <p style={cardDate}>{pub.publisher}{pub.date && ` · ${formatMonthYear(pub.date)}`}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null

            default:
              return null
          }
        })}

      <div style={artDivider} />

      <div style={{
        textAlign: 'center', padding: `0 28mm calc(${gap} * 2) 28mm`,
        fontSize: `calc(${fontSize} * 0.75)`, color: '#8B7BAB',
      }}>
        {personal.email && <span>{personal.email}</span>}
        {personal.email && personal.phone && <span> · </span>}
        {personal.phone && <span>{personal.phone}</span>}
      </div>
    </div>
  )
}
