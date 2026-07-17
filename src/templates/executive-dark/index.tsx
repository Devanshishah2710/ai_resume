/**
 * Executive Template
 * Bold full-width colored header, clean body with ruled sections.
 * Ideal for senior/leadership roles.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '11px', md: '12px', lg: '13px' }
const LINE_HEIGHT_MAP = { tight: 1.3, normal: 1.5, relaxed: 1.7 }
const SPACING_MAP = { compact: '10px', normal: '16px', spacious: '22px' }

export default function ExecutiveDarkTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements } = data
  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const muted: React.CSSProperties = { color: '#64748b', fontSize: `calc(${fontSize} * 0.92)` }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: '#fff', width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}>
      {/* ── Full-width header ── */}
      <header style={{ backgroundColor: theme.primaryColor, padding: '14mm 14mm 10mm', color: '#fff' }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2)`, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff' }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.1)`, color: 'rgba(255,255,255,0.8)', marginTop: '4px', fontWeight: 300, letterSpacing: '0.02em' }}>
            {personal.headline}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '10px', color: 'rgba(255,255,255,0.85)', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>☏ {personal.phone}</span>}
          {personal.location && <span>⌖ {personal.location}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.github && <span>gh {personal.github}</span>}
          {personal.website && <a href={personal.website} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>⬡ {personal.website}</a>}
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ padding: '10mm 14mm' }}>
        {visibleSections.map((section) => {
          const titleStyle: React.CSSProperties = {
            fontSize: `calc(${fontSize} * 1.0)`,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: theme.primaryColor,
            borderBottom: `2px solid ${theme.primaryColor}`,
            paddingBottom: '4px',
            marginBottom: gap,
          }

          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}>Executive Summary</h2>
                  <p style={{ lineHeight, color: '#374151', fontStyle: 'italic' }}>{data.summary}</p>
                </section>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}>Professional Experience</h2>
                  {experience.map((exp, i) => (
                    <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.08)` }}>{exp.position}</h3>
                        <span style={muted}>{formatDateRange(exp.dateRange)}</span>
                      </div>
                      <p style={{ fontWeight: 600, color: theme.primaryColor, fontSize: `calc(${fontSize} * 0.95)` }}>
                        {exp.company}{exp.location && ` · ${exp.location}`}
                      </p>
                      {exp.description && (
                        <div style={{ marginTop: '5px', color: '#374151', lineHeight }}
                          dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                      )}
                    </div>
                  ))}
                </section>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}>Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                      <div>
                        <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
                        <p style={muted}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                      </div>
                      <span style={muted}>{formatDateRange(edu.dateRange)}</span>
                    </div>
                  ))}
                </section>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}>Core Competencies</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skills.flatMap((cat) => cat.skills).map((skill, i) => (
                      <span key={i} style={{ padding: '2px 10px', border: `1px solid ${theme.primaryColor}`, borderRadius: '3px', fontSize: `calc(${fontSize} * 0.9)`, color: theme.primaryColor }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}>Projects</h2>
                  {projects.map((proj) => (
                    <div key={proj.id} style={{ marginBottom: '8px' }}>
                      <h3 style={{ fontWeight: 700 }}>{proj.name}</h3>
                      {proj.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
                    </div>
                  ))}
                </section>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}>Achievements</h2>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={{ marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600 }}>{ach.title}</span>
                      {ach.date && <span style={muted}> · {formatMonthYear(ach.date)}</span>}
                      {ach.description && <p style={{ color: '#374151', marginTop: '2px' }}>{ach.description}</p>}
                    </div>
                  ))}
                </section>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}>Certifications</h2>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontWeight: 600 }}>{cert.name} <span style={muted}>· {cert.issuer}</span></span>
                      <span style={muted}>{formatMonthYear(cert.date)}</span>
                    </div>
                  ))}
                </section>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <section key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={titleStyle}>Languages</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {languages.map((lang) => (
                      <span key={lang.id}><strong>{lang.language}</strong> <span style={muted}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
                    ))}
                  </div>
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
