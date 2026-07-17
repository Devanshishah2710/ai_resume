/**
 * Minimal Clean Template
 * Maximum whitespace, elegant typography, no decorations.
 * Let the content speak.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '11px', md: '12px', lg: '13px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.6, relaxed: 1.8 }
const SPACING_MAP = { compact: '12px', normal: '20px', spacious: '28px' }

export default function MinimalCleanTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages } = data
  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const muted: React.CSSProperties = { color: '#9ca3af', fontSize: `calc(${fontSize} * 0.9)` }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: '#1f2937', backgroundColor: '#fff', width: '210mm', minHeight: '297mm', padding: '16mm 16mm', boxSizing: 'border-box' }}>
      {/* Header — very minimal */}
      <header style={{ marginBottom: `calc(${gap} * 1.5)` }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2.2)`, fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#111827' }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ color: theme.primaryColor, fontWeight: 400, marginTop: '4px', fontSize: `calc(${fontSize} * 1.0)` }}>
            {personal.headline}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px', ...muted }}>
          {personal.email && <a href={`mailto:${personal.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{personal.email}</a>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} style={{ color: 'inherit', textDecoration: 'none' }}>{personal.linkedin}</a>}
          {personal.github && <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} style={{ color: 'inherit', textDecoration: 'none' }}>{personal.github}</a>}
        </div>
      </header>

      {/* Thin rule */}
      <hr style={{ border: 'none', borderTop: `1px solid #e5e7eb`, marginBottom: gap }} />

      {visibleSections.map((section) => {
        const titleStyle: React.CSSProperties = {
          fontSize: `calc(${fontSize} * 0.8)`,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#9ca3af',
          marginBottom: `calc(${gap} * 0.6)`,
        }

        const rowLayout: React.CSSProperties = {
          display: 'grid',
          gridTemplateColumns: '130px 1fr',
          gap: '0 20px',
          marginBottom: `calc(${gap} * 0.75)`,
        }

        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <section key={section.id} style={{ marginBottom: gap }}>
                <div style={rowLayout}>
                  <h2 style={titleStyle}>About</h2>
                  <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
                </div>
              </section>
            ) : null

          case 'experience':
            return experience.length > 0 ? (
              <section key={section.id} style={{ marginBottom: gap }}>
                {experience.map((exp, i) => (
                  <div key={exp.id} style={{ ...rowLayout, marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.75)` : 0 }}>
                    <div>
                      {i === 0 && <h2 style={titleStyle}>Experience</h2>}
                      <p style={{ ...muted, lineHeight: 1.4 }}>{formatDateRange(exp.dateRange)}</p>
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 600, color: '#111827' }}>{exp.position}</h3>
                      <p style={{ color: theme.primaryColor, fontSize: `calc(${fontSize} * 0.95)` }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                      {exp.description && (
                        <div style={{ color: '#374151', lineHeight, marginTop: '5px' }}
                          dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                      )}
                    </div>
                  </div>
                ))}
              </section>
            ) : null

          case 'education':
            return education.length > 0 ? (
              <section key={section.id} style={{ marginBottom: gap }}>
                {education.map((edu, i) => (
                  <div key={edu.id} style={{ ...rowLayout, marginBottom: '8px' }}>
                    <div>
                      {i === 0 && <h2 style={titleStyle}>Education</h2>}
                      <p style={muted}>{formatDateRange(edu.dateRange)}</p>
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 600, color: '#111827' }}>{edu.institution}</h3>
                      <p style={{ color: '#6b7280' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}</p>
                    </div>
                  </div>
                ))}
              </section>
            ) : null

          case 'skills':
            return skills.length > 0 ? (
              <section key={section.id} style={{ marginBottom: gap }}>
                <div style={rowLayout}>
                  <h2 style={titleStyle}>Skills</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {skills.map((cat) => (
                      <div key={cat.id}>
                        {cat.name && <span style={{ color: '#6b7280', fontWeight: 500 }}>{cat.name}: </span>}
                        <span style={{ color: '#374151' }}>{cat.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null

          case 'projects':
            return projects.length > 0 ? (
              <section key={section.id} style={{ marginBottom: gap }}>
                {projects.map((proj, i) => (
                  <div key={proj.id} style={{ ...rowLayout, marginBottom: '8px' }}>
                    <div>{i === 0 && <h2 style={titleStyle}>Projects</h2>}</div>
                    <div>
                      <h3 style={{ fontWeight: 600, color: '#111827' }}>{proj.name}</h3>
                      {proj.technologies.length > 0 && <p style={muted}>{proj.technologies.join(', ')}</p>}
                      {proj.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
                    </div>
                  </div>
                ))}
              </section>
            ) : null

          case 'certifications':
            return certifications.length > 0 ? (
              <section key={section.id} style={{ marginBottom: gap }}>
                <div style={rowLayout}>
                  <h2 style={titleStyle}>Certifications</h2>
                  <div>
                    {certifications.map((cert) => (
                      <div key={cert.id} style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <span><strong>{cert.name}</strong> · {cert.issuer}</span>
                        <span style={muted}>{formatMonthYear(cert.date)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null

          case 'languages':
            return languages.length > 0 ? (
              <section key={section.id} style={{ marginBottom: gap }}>
                <div style={rowLayout}>
                  <h2 style={titleStyle}>Languages</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {languages.map((lang) => (
                      <span key={lang.id}>{lang.language} <span style={muted}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
                    ))}
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
