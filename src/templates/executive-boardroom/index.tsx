/**
 * Executive Boardroom Template
 *
 * Identity: Boardroom Modern. A centered executive header sits beneath a fine
 * top rule and above an elegant hairline divider. The body is arranged in a
 * balanced two-column grid — leadership content leading, supporting
 * credentials paired beside it — for a composed, symmetrical board-pack feel.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10.5px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.6, relaxed: 1.8 }
const SPACING_MAP = { compact: '12px', normal: '20px', spacious: '28px' }

export default function ExecutiveBoardroomTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, references, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Playfair Display", Georgia, serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor
  const ink = '#1c2430'
  const muted = '#5b6675'

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  // Order: leadership columns first (left), supporting columns second (right).
  const leadTypes = new Set(['summary', 'experience', 'projects', 'achievements'])
  const leftSections = visibleSections.filter((s) => leadTypes.has(s.type))
  const rightSections = visibleSections.filter((s) => !leadTypes.has(s.type))

  const titleStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.95)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: accent,
    textAlign: 'center',
    marginBottom: `calc(${gap} * 0.6)`,
  }

  const renderSection = (section: (typeof visibleSections)[number]) => {
    switch (section.type) {
      case 'summary':
        return data.summary ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Executive Summary</h2>
            <p style={{ color: '#374151', textAlign: 'center', fontStyle: 'italic', lineHeight }}>{data.summary}</p>
          </section>
        ) : null

      case 'experience':
        return experience.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Leadership Experience</h2>
            {experience.map((exp, i) => (
              <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.1)`, color: ink }}>{exp.position}</h3>
                  <span style={{ color: muted, fontSize: `calc(${fontSize} * 0.88)`, whiteSpace: 'nowrap' }}>{formatDateRange(exp.dateRange)}</span>
                </div>
                <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.95)` }}>
                  {exp.company}{exp.location && `  ·  ${exp.location}`}
                </p>
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                )}
              </div>
            ))}
          </section>
        ) : null

      case 'projects':
        return projects.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Strategic Initiatives</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '8px' }}>
                <h3 style={{ fontWeight: 700, color: ink }}>{proj.name}</h3>
                {proj.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
              </div>
            ))}
          </section>
        ) : null

      case 'achievements':
        return achievements.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Key Achievements</h2>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#374151' }}>
              {achievements.map((ach) => (
                <li key={ach.id} style={{ marginBottom: '5px' }}>
                  <span style={{ fontWeight: 600, color: ink }}>{ach.title}</span>
                  {ach.description && <span> — {ach.description}</span>}
                </li>
              ))}
            </ul>
          </section>
        ) : null

      case 'education':
        return education.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <h3 style={{ fontWeight: 700, color: ink, textAlign: 'center' }}>{edu.institution}</h3>
                <p style={{ color: muted, textAlign: 'center' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && `  ·  GPA ${edu.gpa}`}</p>
                <p style={{ color: muted, textAlign: 'center', fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(edu.dateRange)}</p>
              </div>
            ))}
          </section>
        ) : null

      case 'skills':
        return skills.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Core Competencies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', justifyContent: 'center' }}>
              {skills.flatMap((cat) => cat.skills).map((skill, i) => (
                <span key={i} style={{ color: '#374151' }}>{skill}</span>
              )).reduce((acc: React.ReactNode[], node, i, arr) => {
                acc.push(node)
                if (i < arr.length - 1) acc.push(<span key={`s${i}`} style={{ color: accent }}>·</span>)
                return acc
              }, [])}
            </div>
          </section>
        ) : null

      case 'certifications':
        return certifications.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '5px' }}>
                <span style={{ fontWeight: 600, color: ink }}>{cert.name}</span>
                <span style={{ color: muted }}>{cert.issuer}  ·  {formatMonthYear(cert.date)}</span>
              </div>
            ))}
          </section>
        ) : null

      case 'languages':
        return languages.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', justifyContent: 'center' }}>
              {languages.map((lang) => (
                <span key={lang.id}><strong style={{ color: ink }}>{lang.language}</strong> <span style={{ color: muted }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
              ))}
            </div>
          </section>
        ) : null

      case 'interests':
        return interests.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Interests</h2>
            <p style={{ color: '#374151', textAlign: 'center' }}>{interests.map((i) => i.name).join('  ·  ')}</p>
          </section>
        ) : null

      case 'awards':
        return awards.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Awards & Honors</h2>
            {awards.map((award) => (
              <div key={award.id} style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: ink }}>{award.title}</span>
                <span style={{ color: muted }}>  ·  {award.issuer}</span>
                {award.date && <span style={{ color: muted }}>  ·  {formatMonthYear(award.date)}</span>}
              </div>
            ))}
          </section>
        ) : null

      case 'publications':
        return publications.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Publications</h2>
            {publications.map((pub) => (
              <div key={pub.id} style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: ink }}>
                  {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                </span>
                <span style={{ color: muted }}>  ·  {pub.publisher}</span>
              </div>
            ))}
          </section>
        ) : null

      case 'references':
        return references.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>References</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: `calc(${gap}) 24px` }}>
              {references.map((ref) => (
                <div key={ref.id} style={{ minWidth: '180px' }}>
                  <h3 style={{ fontWeight: 700, color: ink }}>{ref.name}</h3>
                  <p style={{ color: muted }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null

      case 'volunteer':
        return volunteer.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Board & Service</h2>
            {volunteer.map((vol) => (
              <div key={vol.id} style={{ marginBottom: '8px' }}>
                <h3 style={{ fontWeight: 700, color: ink }}>{vol.role}</h3>
                <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.95)` }}>{vol.organization}</p>
              </div>
            ))}
          </section>
        ) : null

      default:
        return null
    }
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '18mm 18mm', boxSizing: 'border-box' }}>
      {/* ── Centered header ── */}
      <header style={{ textAlign: 'center', borderTop: `2px solid ${accent}`, paddingTop: '14px', marginBottom: '10px' }}>
        <h1 style={{ fontFamily: displayStack, fontSize: `calc(${fontSize} * 3)`, fontWeight: 600, letterSpacing: '0.02em', lineHeight: 1, color: ink }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.1)`, color: accent, marginTop: '6px', fontWeight: 500, letterSpacing: '0.05em' }}>
            {personal.headline}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 20px', marginTop: '10px', color: muted, fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </header>
      <div style={{ height: '1px', backgroundColor: accent, margin: '0 auto 16px', width: '60%' }} />

      {/* ── Balanced two-column body ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20mm', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>{leftSections.map(renderSection)}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>{rightSections.map(renderSection)}</div>
      </div>
    </div>
  )
}
