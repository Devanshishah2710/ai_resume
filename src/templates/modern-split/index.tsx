/**
 * Modern Split Template
 *
 * Full-width accent header with name and contact, followed by a balanced
 * two-column content body (left: experience/education/projects, right:
 * skills/certs/languages). Strong visual hierarchy through whitespace and a
 * thin accent rule between columns.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '11px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.7 }
const SPACING_MAP = { compact: '12px', normal: '18px', spacious: '24px' }

export default function ModernSplitTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const LEFT_TYPES = new Set(['summary', 'experience', 'education', 'projects', 'volunteer', 'publications', 'achievements', 'awards'])
  const leftSections = visibleSections.filter((s) => LEFT_TYPES.has(s.type))
  const rightSections = visibleSections.filter((s) => !LEFT_TYPES.has(s.type))

  const headerStyle: React.CSSProperties = {
    backgroundColor: accent,
    color: '#fff',
    padding: '16mm 14mm',
  }

  const nameStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 2)`,
    fontWeight: 700,
    letterSpacing: '-0.01em',
    lineHeight: 1.1,
  }

  const sectionTitle = (color: string, border: string): React.CSSProperties => ({
    fontSize: `calc(${fontSize} * 0.95)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color,
    borderBottom: `2px solid ${border}`,
    paddingBottom: '5px',
    marginBottom: `calc(${gap} * 0.6)`,
  })

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}>
      {/* Full-width header */}
      <header style={headerStyle}>
        <h1 style={nameStyle}>{[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}</h1>
        {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.1)`, color: 'rgba(255,255,255,0.85)', marginTop: '4px' }}>{personal.headline}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px', marginTop: '12px', color: 'rgba(255,255,255,0.9)', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>☏ {personal.phone}</span>}
          {personal.location && <span>⌖ {personal.location}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.github && <span>gh {personal.github}</span>}
          {personal.website && <a href={personal.website} style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>⬡ {personal.website}</a>}
        </div>
      </header>

      {/* Two-column body */}
      <div style={{ display: 'flex', padding: '12mm 14mm', gap: '12mm' }}>
        <div style={{ flex: '3', minWidth: 0 }}>
          {leftSections.map((section) => {
            switch (section.type) {
              case 'summary':
                return data.summary ? (
                  <Block key={section.id} title="Summary" titleStyle={sectionTitle(accent, accent)} gap={gap}>
                    <p style={{ lineHeight, color: '#374151' }}>{data.summary}</p>
                  </Block>
                ) : null
              case 'experience':
                return experience.length > 0 ? (
                  <Block key={section.id} title="Experience" titleStyle={sectionTitle(accent, accent)} gap={gap}>
                    {experience.map((exp, i) => (
                      <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.05)` }}>{exp.position || 'Position'}</h3>
                          <span style={{ color: accent, fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(exp.dateRange)}</span>
                        </div>
                        <p style={{ color: '#475569', fontWeight: 500 }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                        {exp.description && <div style={{ marginTop: '5px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />}
                      </div>
                    ))}
                  </Block>
                ) : null
              case 'education':
                return education.length > 0 ? (
                  <Block key={section.id} title="Education" titleStyle={sectionTitle(accent, accent)} gap={gap}>
                    {education.map((edu) => (
                      <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        <div>
                          <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
                          <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                        </div>
                        <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(edu.dateRange)}</span>
                      </div>
                    ))}
                  </Block>
                ) : null
              case 'projects':
                return projects.length > 0 ? (
                  <Block key={section.id} title="Projects" titleStyle={sectionTitle(accent, accent)} gap={gap}>
                    {projects.map((proj) => (
                      <div key={proj.id} style={{ marginBottom: '8px' }}>
                        <h3 style={{ fontWeight: 700 }}>
                          {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                          {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
                        </h3>
                        {proj.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
                      </div>
                    ))}
                  </Block>
                ) : null
              case 'volunteer':
                return volunteer.length > 0 ? (
                  <Block key={section.id} title="Volunteer" titleStyle={sectionTitle(accent, accent)} gap={gap}>
                    {volunteer.map((vol) => (
                      <div key={vol.id} style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                          <h3 style={{ fontWeight: 700 }}>{vol.role}</h3>
                          <span style={{ color: accent, fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(vol.dateRange)}</span>
                        </div>
                        <p style={{ color: '#475569', fontWeight: 500 }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                        {vol.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{vol.description}</p>}
                      </div>
                    ))}
                  </Block>
                ) : null
              case 'publications':
                return publications.length > 0 ? (
                  <Block key={section.id} title="Publications" titleStyle={sectionTitle(accent, accent)} gap={gap}>
                    {publications.map((pub) => (
                      <div key={pub.id} style={{ marginBottom: '5px' }}>
                        <span style={{ fontWeight: 600 }}>
                          {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                        </span>
                        <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
                        {pub.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(pub.date)}</span>}
                      </div>
                    ))}
                  </Block>
                ) : null
              case 'achievements':
                return achievements.length > 0 ? (
                  <Block key={section.id} title="Achievements" titleStyle={sectionTitle(accent, accent)} gap={gap}>
                    {achievements.map((ach) => (
                      <div key={ach.id} style={{ marginBottom: '5px' }}>
                        <span style={{ fontWeight: 600 }}>{ach.title}</span>
                        {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
                        {ach.description && <p style={{ color: '#374151', marginTop: '2px' }}>{ach.description}</p>}
                      </div>
                    ))}
                  </Block>
                ) : null
              case 'awards':
                return awards.length > 0 ? (
                  <Block key={section.id} title="Awards" titleStyle={sectionTitle(accent, accent)} gap={gap}>
                    {awards.map((award) => (
                      <div key={award.id} style={{ marginBottom: '5px' }}>
                        <span style={{ fontWeight: 600 }}>{award.title}</span>
                        <span style={{ color: '#64748b' }}> · {award.issuer}</span>
                        {award.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(award.date)}</span>}
                      </div>
                    ))}
                  </Block>
                ) : null
              default:
                return null
            }
          })}
        </div>

        <div style={{ flex: '2', minWidth: 0, borderLeft: `1px solid #e2e8f0`, paddingLeft: '12mm' }}>
          {rightSections.map((section) => {
            switch (section.type) {
              case 'skills':
                return skills.length > 0 ? (
                  <Block key={section.id} title="Skills" titleStyle={sectionTitle('#334155', '#cbd5e1')} gap={gap}>
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ marginBottom: '8px' }}>
                        {cat.name && <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.9)`, marginBottom: '3px' }}>{cat.name}</p>}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {cat.skills.map((s, i) => (
                            <span key={i} style={{ fontSize: `calc(${fontSize} * 0.82)`, padding: '2px 9px', backgroundColor: '#f1f5f9', borderRadius: '4px', color: '#334155' }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </Block>
                ) : null
              case 'certifications':
                return certifications.length > 0 ? (
                  <Block key={section.id} title="Certifications" titleStyle={sectionTitle('#334155', '#cbd5e1')} gap={gap}>
                    {certifications.map((cert) => (
                      <div key={cert.id} style={{ marginBottom: '6px' }}>
                        <p style={{ fontWeight: 600, lineHeight: 1.3 }}>{cert.name}</p>
                        <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
                      </div>
                    ))}
                  </Block>
                ) : null
              case 'languages':
                return languages.length > 0 ? (
                  <Block key={section.id} title="Languages" titleStyle={sectionTitle('#334155', '#cbd5e1')} gap={gap}>
                    {languages.map((lang) => (
                      <div key={lang.id} style={{ marginBottom: '4px' }}>
                        <strong>{lang.language}</strong> <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                      </div>
                    ))}
                  </Block>
                ) : null
              case 'interests':
                return interests.length > 0 ? (
                  <Block key={section.id} title="Interests" titleStyle={sectionTitle('#334155', '#cbd5e1')} gap={gap}>
                    <p style={{ color: '#334155' }}>{interests.map((i) => i.name).join(' · ')}</p>
                  </Block>
                ) : null
              default:
                return null
            }
          })}
        </div>
      </div>
    </div>
  )
}

function Block({ title, titleStyle, gap, children }: { title: string; titleStyle: React.CSSProperties; gap: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: gap }}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  )
}
