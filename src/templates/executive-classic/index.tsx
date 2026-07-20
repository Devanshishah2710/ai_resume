/**
 * Executive Classic Template
 *
 * Identity: CEO Classic. A premium full-width header carries a large serif
 * executive name above an elegant, letter-spaced contact row. The body is a
 * refined single column where each section title is introduced by a slim
 * accent bar — a calm, authoritative hierarchy suited to C-level candidates.
 *
 * Distinct from the existing Executive template via its serif display name,
 * accent-bar section markers, and restrained neutral palette (no color block).
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10.5px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.6, relaxed: 1.8 }
const SPACING_MAP = { compact: '12px', normal: '20px', spacious: '28px' }

export default function ExecutiveClassicTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, references, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Playfair Display", Georgia, "Times New Roman", serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor
  const ink = '#1c2430'
  const muted = '#5b6675'

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const titleStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.92)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: ink,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: `calc(${gap} * 0.6)`,
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '0', boxSizing: 'border-box' }}>
      {/* ── Premium full-width header ── */}
      <header style={{ padding: '20mm 20mm 14mm', borderBottom: `3px solid ${accent}` }}>
        <h1 style={{ fontFamily: displayStack, fontSize: `calc(${fontSize} * 3.4)`, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1, color: ink }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.15)`, color: accent, marginTop: '8px', fontWeight: 500, letterSpacing: '0.04em' }}>
            {personal.headline}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 22px', marginTop: '14px', color: muted, fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && (
            <a href={personal.website} style={{ color: muted, textDecoration: 'none' }}>{personal.website}</a>
          )}
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ padding: '16mm 20mm 20mm' }}>
        {visibleSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Executive Summary</h2>
                  <p style={{ color: '#374151', fontStyle: 'italic', lineHeight }}>{data.summary}</p>
                </section>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Leadership Experience</h2>
                  {experience.map((exp, i) => (
                    <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.12)`, color: ink }}>{exp.position}</h3>
                        <span style={{ color: muted, fontSize: `calc(${fontSize} * 0.88)`, whiteSpace: 'nowrap' }}>{formatDateRange(exp.dateRange)}</span>
                      </div>
                      <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.96)` }}>
                        {exp.company}{exp.location && `  ·  ${exp.location}`}
                      </p>
                      {exp.description && (
                        <div style={{ marginTop: '5px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                      )}
                    </div>
                  ))}
                </section>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                      <div>
                        <h3 style={{ fontWeight: 700, color: ink }}>{edu.institution}</h3>
                        <p style={{ color: muted }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && `  ·  GPA ${edu.gpa}`}</p>
                      </div>
                      <span style={{ color: muted, fontSize: `calc(${fontSize} * 0.88)`, whiteSpace: 'nowrap' }}>{formatDateRange(edu.dateRange)}</span>
                    </div>
                  ))}
                </section>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Core Competencies</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 28px' }}>
                    {skills.map((cat) => (
                      <div key={cat.id}>
                        <span style={{ fontWeight: 700, color: ink, fontSize: `calc(${fontSize} * 0.92)` }}>{cat.name}</span>
                        <span style={{ color: '#374151' }}>: {cat.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Strategic Initiatives</h2>
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
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Key Achievements</h2>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#374151' }}>
                    {achievements.map((ach) => (
                      <li key={ach.id} style={{ marginBottom: '5px' }}>
                        <span style={{ fontWeight: 600, color: ink }}>{ach.title}</span>
                        {ach.date && <span style={{ color: muted }}>  ·  {formatMonthYear(ach.date)}</span>}
                        {ach.description && <span> — {ach.description}</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Certifications</h2>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '5px' }}>
                      <span style={{ fontWeight: 600, color: ink }}>{cert.name} <span style={{ color: muted, fontWeight: 400 }}>· {cert.issuer}</span></span>
                      <span style={{ color: muted }}>{formatMonthYear(cert.date)}</span>
                    </div>
                  ))}
                </section>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Languages</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 24px' }}>
                    {languages.map((lang) => (
                      <span key={lang.id}><strong style={{ color: ink }}>{lang.language}</strong> <span style={{ color: muted }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
                    ))}
                  </div>
                </section>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Interests</h2>
                  <p style={{ color: '#374151' }}>{interests.map((i) => i.name).join('  ·  ')}</p>
                </section>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Awards & Honors</h2>
                  {awards.map((award) => (
                    <div key={award.id} style={{ marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600, color: ink }}>{award.title}</span>
                      <span style={{ color: muted }}>  ·  {award.issuer}</span>
                      {award.date && <span style={{ color: muted }}>  ·  {formatMonthYear(award.date)}</span>}
                      {award.description && <p style={{ color: '#374151', marginTop: '2px' }}>{award.description}</p>}
                    </div>
                  ))}
                </section>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Publications</h2>
                  {publications.map((pub) => (
                    <div key={pub.id} style={{ marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600, color: ink }}>
                        {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                      </span>
                      <span style={{ color: muted }}>  ·  {pub.publisher}</span>
                      {pub.date && <span style={{ color: muted }}>  ·  {formatMonthYear(pub.date)}</span>}
                    </div>
                  ))}
                </section>
              ) : null

            case 'references':
              return references.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />References</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: `calc(${gap}) 28px` }}>
                    {references.map((ref) => (
                      <div key={ref.id} style={{ minWidth: '200px' }}>
                        <h3 style={{ fontWeight: 700, color: ink }}>{ref.name}</h3>
                        <p style={{ color: muted }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                        {ref.email && <p style={{ color: muted, fontSize: `calc(${fontSize} * 0.88)` }}>{ref.email}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}><span style={{ width: '26px', height: '2px', backgroundColor: accent, display: 'inline-block' }} />Board Memberships & Service</h2>
                  {volunteer.map((vol) => (
                    <div key={vol.id} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, color: ink }}>{vol.role}</h3>
                        <span style={{ color: muted, fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(vol.dateRange)}</span>
                      </div>
                      <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.95)` }}>{vol.organization}{vol.location && `  ·  ${vol.location}`}</p>
                      {vol.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{vol.description}</p>}
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
