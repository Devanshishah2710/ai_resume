/**
 * Modern Grid Template
 *
 * Card-less grid layout: a top name band, then content arranged in a clean
 * aligned grid where section blocks sit in a two-column rhythm. Modern
 * lowercase-spaced headings, crisp alignment, and a single calm accent.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '11px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.7 }
const SPACING_MAP = { compact: '12px', normal: '18px', spacious: '24px' }

export default function ModernGridTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const PRIMARY = new Set(['summary', 'experience', 'education', 'projects'])
  const primarySections = visibleSections.filter((s) => PRIMARY.has(s.type))
  const secondarySections = visibleSections.filter((s) => !PRIMARY.has(s.type))

  const bandStyle: React.CSSProperties = {
    borderLeft: `5px solid ${accent}`,
    paddingLeft: '12px',
    marginBottom: `calc(${gap} * 0.7)`,
  }

  const headingStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.9)`,
    fontWeight: 700,
    textTransform: 'lowercase',
    letterSpacing: '0.15em',
    color: accent,
    marginBottom: `calc(${gap} * 0.4)`,
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '14mm 15mm', boxSizing: 'border-box' }}>
      {/* Name band */}
      <header style={{ marginBottom: `calc(${gap} * 1.3)` }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2)`, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1.05 }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: '#475569', marginTop: '4px' }}>{personal.headline}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '3px 16px', marginTop: '10px', color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>☏ {personal.phone}</span>}
          {personal.location && <span>⌖ {personal.location}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.github && <span>gh {personal.github}</span>}
          {personal.website && <a href={personal.website} style={{ color: '#64748b', textDecoration: 'none' }}>⬡ {personal.website}</a>}
        </div>
      </header>

      {/* Primary grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: '14mm', rowGap: gap }}>
        {primarySections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <Cell key={section.id} title="summary" headingStyle={headingStyle} bandStyle={bandStyle} span>
                  <p style={{ lineHeight, color: '#374151' }}>{data.summary}</p>
                </Cell>
              ) : null
            case 'experience':
              return experience.length > 0 ? (
                <Cell key={section.id} title="experience" headingStyle={headingStyle} bandStyle={bandStyle} span>
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
                </Cell>
              ) : null
            case 'education':
              return education.length > 0 ? (
                <Cell key={section.id} title="education" headingStyle={headingStyle} bandStyle={bandStyle}>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: '8px' }}>
                      <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
                      <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                      <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.85)` }}>{formatDateRange(edu.dateRange)}</p>
                    </div>
                  ))}
                </Cell>
              ) : null
            case 'projects':
              return projects.length > 0 ? (
                <Cell key={section.id} title="projects" headingStyle={headingStyle} bandStyle={bandStyle}>
                  {projects.map((proj) => (
                    <div key={proj.id} style={{ marginBottom: '8px' }}>
                      <h3 style={{ fontWeight: 700 }}>
                        {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                        {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.85)` }}> · {proj.technologies.join(', ')}</span>}
                      </h3>
                      {proj.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
                    </div>
                  ))}
                </Cell>
              ) : null
            default:
              return null
          }
        })}
      </div>

      {/* Secondary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', columnGap: '10mm', rowGap: gap, marginTop: gap }}>
        {secondarySections.map((section) => {
          switch (section.type) {
            case 'skills':
              return skills.length > 0 ? (
                <Cell key={section.id} title="skills" headingStyle={headingStyle} bandStyle={bandStyle}>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ marginBottom: '7px' }}>
                      {cat.name && <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, marginBottom: '3px' }}>{cat.name}</p>}
                      <p style={{ color: '#475569' }}>{cat.skills.join(', ')}</p>
                    </div>
                  ))}
                </Cell>
              ) : null
            case 'certifications':
              return certifications.length > 0 ? (
                <Cell key={section.id} title="certifications" headingStyle={headingStyle} bandStyle={bandStyle}>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ marginBottom: '5px' }}>
                      <p style={{ fontWeight: 600, lineHeight: 1.3 }}>{cert.name}</p>
                      <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.83)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
                    </div>
                  ))}
                </Cell>
              ) : null
            case 'languages':
              return languages.length > 0 ? (
                <Cell key={section.id} title="languages" headingStyle={headingStyle} bandStyle={bandStyle}>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ marginBottom: '4px' }}>
                      <strong>{lang.language}</strong> <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.83)` }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                    </div>
                  ))}
                </Cell>
              ) : null
            case 'achievements':
              return achievements.length > 0 ? (
                <Cell key={section.id} title="achievements" headingStyle={headingStyle} bandStyle={bandStyle}>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600 }}>{ach.title}</span>
                      {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
                    </div>
                  ))}
                </Cell>
              ) : null
            case 'interests':
              return interests.length > 0 ? (
                <Cell key={section.id} title="interests" headingStyle={headingStyle} bandStyle={bandStyle}>
                  <p style={{ color: '#475569' }}>{interests.map((i) => i.name).join(' · ')}</p>
                </Cell>
              ) : null
            case 'awards':
              return awards.length > 0 ? (
                <Cell key={section.id} title="awards" headingStyle={headingStyle} bandStyle={bandStyle}>
                  {awards.map((award) => (
                    <div key={award.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600 }}>{award.title}</span>
                      <span style={{ color: '#64748b' }}> · {award.issuer}</span>
                    </div>
                  ))}
                </Cell>
              ) : null
            case 'publications':
              return publications.length > 0 ? (
                <Cell key={section.id} title="publications" headingStyle={headingStyle} bandStyle={bandStyle}>
                  {publications.map((pub) => (
                    <div key={pub.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600 }}>
                        {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                      </span>
                      <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
                    </div>
                  ))}
                </Cell>
              ) : null
            case 'volunteer':
              return volunteer.length > 0 ? (
                <Cell key={section.id} title="volunteer" headingStyle={headingStyle} bandStyle={bandStyle}>
                  {volunteer.map((vol) => (
                    <div key={vol.id} style={{ marginBottom: '6px' }}>
                      <h3 style={{ fontWeight: 700 }}>{vol.role}</h3>
                      <p style={{ color: '#475569' }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                      <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.85)` }}>{formatDateRange(vol.dateRange)}</p>
                    </div>
                  ))}
                </Cell>
              ) : null
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}

function Cell({
  title,
  headingStyle,
  bandStyle,
  span,
  children,
}: {
  title: string
  headingStyle: React.CSSProperties
  bandStyle: React.CSSProperties
  span?: boolean
  children: React.ReactNode
}) {
  return (
    <div style={span ? { gridColumn: '1 / -1' } : undefined}>
      <div style={bandStyle}>
        <h2 style={headingStyle}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
