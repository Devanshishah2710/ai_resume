/**
 * Fresher Template — Dash
 *
 * Concept: A modern analytics-dashboard inspired resume. The top section
 * acts as a "profile widget" with quick-stat badges (projects completed,
 * certifications, languages). Below, sections are arranged as dashboard
 * panels with widget-style headers, progress-like accent bars, and a
 * clean technical aesthetic. Built for tech-savvy fresh graduates who
 * want to present themselves like a product dashboard.
 *
 * Target: CS/IT graduates, engineering interns, data-savvy entry-level
 * professionals, tech campus placement candidates.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'

export default function FresherDashTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const emerald = '#10B981'
  const sand = '#F59E0B'
  const charcoal = '#1F2937'
  const slate = '#F1F5F9'
  const darkSlate = '#334155'

  const container: React.CSSProperties = {
    fontFamily: fontStack, fontSize, lineHeight, color: charcoal,
    backgroundColor: slate, width: '210mm', minHeight: '297mm',
    boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
  }

  const topPanel: React.CSSProperties = {
    backgroundColor: charcoal, padding: '20mm 24mm 16mm 24mm',
    position: 'relative',
  }

  const gridOverlay: React.CSSProperties = {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.03) 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
    opacity: 0.5,
  }

  const nameStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 2.4)`,
    fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em',
    lineHeight: 1.15, position: 'relative', zIndex: 1,
  }

  const headlineStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 0.9)`,
    fontWeight: 400, color: sand, position: 'relative', zIndex: 1,
    marginTop: '4px', letterSpacing: '0.04em',
  }

  const contactRow: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '10px',
    marginTop: '12px', position: 'relative', zIndex: 1,
  }

  const contactChip: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: '3px 10px', borderRadius: '4px',
    color: 'rgba(255,255,255,0.75)', fontSize: `calc(${fontSize} * 0.78)`,
    border: '1px solid rgba(255,255,255,0.06)',
  }

  const metricBar: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '8px',
    marginTop: '14px', position: 'relative', zIndex: 1,
  }

  const metricBadge: React.CSSProperties = {
    backgroundColor: emerald, color: '#FFFFFF', padding: '4px 12px',
    borderRadius: '6px', fontSize: `calc(${fontSize} * 0.75)`,
    fontWeight: 600, letterSpacing: '0.02em',
    display: 'flex', alignItems: 'center', gap: '6px',
  }

  const bodyArea: React.CSSProperties = {
    padding: '18mm 24mm 24mm 24mm',
  }

  const panel: React.CSSProperties = {
    backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '16px',
    marginBottom: `calc(${gap} * 1.2)`,
    boxShadow: '0 1px 4px rgba(31,41,55,0.04)',
    border: '1px solid rgba(31,41,55,0.04)',
    pageBreakInside: 'avoid',
  }

  const panelHeader: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '8px',
    marginBottom: `calc(${gap} * 0.6)`,
    borderBottom: `1px solid ${emerald}15`,
    paddingBottom: '8px',
  }

  const panelDot: React.CSSProperties = {
    width: '8px', height: '8px', borderRadius: '2px',
    backgroundColor: emerald,
  }

  const panelTitle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 0.95)`,
    fontWeight: 700, color: charcoal, textTransform: 'uppercase',
    letterSpacing: '0.08em',
  }

  const dataRow: React.CSSProperties = {
    marginBottom: `calc(${gap} * 0.6)`,
    padding: '8px 0', borderBottom: '1px solid rgba(31,41,55,0.04)',
  }

  const dataRowTitle: React.CSSProperties = {
    fontWeight: 600, fontSize: `calc(${fontSize} * 0.95)`,
    color: charcoal, marginBottom: '2px',
  }

  const dataRowMeta: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.82)`, color: darkSlate,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  }

  const tagPill: React.CSSProperties = {
    display: 'inline-block', padding: '2px 8px', margin: '2px',
    backgroundColor: `${emerald}08`, color: '#047857',
    borderRadius: '4px', fontSize: `calc(${fontSize} * 0.78)`,
    fontWeight: 500, border: `1px solid ${emerald}15`,
  }

  const sandPill: React.CSSProperties = {
    ...tagPill, backgroundColor: `${sand}10`, color: '#92400E',
    borderColor: `${sand}20`,
  }

  const twoCol: React.CSSProperties = {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `calc(${gap} * 0.8)`,
  }

  return (
    <div style={container}>
      <div style={topPanel}>
        <div style={gridOverlay} />
        <h1 style={nameStyle}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Fresh Graduate'}
        </h1>
        {personal.headline && <p style={headlineStyle}>{personal.headline}</p>}
        <div style={contactRow}>
          {personal.email && <span style={contactChip}>✉ {personal.email}</span>}
          {personal.phone && <span style={contactChip}>☎ {personal.phone}</span>}
          {personal.location && <span style={contactChip}>📍 {personal.location}</span>}
          {personal.linkedin && <span style={contactChip}>in {personal.linkedin}</span>}
          {personal.github && <span style={contactChip}>gh {personal.github}</span>}
        </div>
        <div style={metricBar}>
          {projects.length > 0 && (
            <span style={metricBadge}>📦 {projects.length} Projects</span>
          )}
          {certifications.length > 0 && (
            <span style={{ ...metricBadge, backgroundColor: sand }}>🏅 {certifications.length} Certs</span>
          )}
          {languages.length > 0 && (
            <span style={{ ...metricBadge, backgroundColor: '#6366F1' }}>🌐 {languages.length} Languages</span>
          )}
        </div>
      </div>

      <div style={bodyArea}>
        {sections
          .filter(s => s.visible)
          .sort((a, b) => a.order - b.order)
          .map(section => {
            switch (section.type) {
              case 'summary':
                return data.summary ? (
                  <section key={section.id} style={panel}>
                    <div style={panelHeader}>
                      <div style={panelDot} />
                      <h2 style={panelTitle}>Objective</h2>
                    </div>
                    <div style={{ color: darkSlate, lineHeight }}
                      dangerouslySetInnerHTML={{ __html: renderRichText(data.summary) }}
                    />
                  </section>
                ) : null

              case 'experience':
                return experience.length > 0 ? (
                  <section key={section.id}>
                    <div style={{ ...panelHeader, paddingLeft: '4px' }}>
                      <div style={{ ...panelDot, backgroundColor: sand }} />
                      <h2 style={panelTitle}>Experience Log</h2>
                    </div>
                    {experience.map((exp) => (
                      <div key={exp.id} style={panel}>
                        <div style={dataRow}>
                          <h3 style={dataRowTitle}>{exp.position}</h3>
                          <div style={dataRowMeta}>
                            <span>{exp.company}{exp.location && ` · ${exp.location}`}</span>
                            <span style={{ color: sand, fontWeight: 600 }}>{formatDateRange(exp.dateRange)}</span>
                          </div>
                        </div>
                        {exp.description && (
                          <div style={{ color: darkSlate, lineHeight, fontSize: `calc(${fontSize} * 0.92)` }}
                            dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                          />
                        )}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'education':
                return education.length > 0 ? (
                  <section key={section.id}>
                    <div style={{ ...panelHeader, paddingLeft: '4px' }}>
                      <div style={{ ...panelDot, backgroundColor: '#6366F1' }} />
                      <h2 style={panelTitle}>Education</h2>
                    </div>
                    <div style={twoCol}>
                      {education.map((edu) => (
                        <div key={edu.id} style={panel}>
                          <h3 style={dataRowTitle}>{edu.institution}</h3>
                          <p style={dataRowMeta}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</p>
                          <p style={{ ...dataRowMeta, marginTop: '4px' }}>
                            <span>{formatDateRange(edu.dateRange)}</span>
                            {edu.gpa && <span style={{ color: emerald, fontWeight: 700 }}>GPA: {edu.gpa}</span>}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'projects':
                return projects.length > 0 ? (
                  <section key={section.id}>
                    <div style={{ ...panelHeader, paddingLeft: '4px' }}>
                      <div style={{ ...panelDot, backgroundColor: '#8B5CF6' }} />
                      <h2 style={panelTitle}>Projects</h2>
                    </div>
                    <div style={twoCol}>
                      {projects.map((proj) => (
                        <div key={proj.id} style={panel}>
                          <h3 style={dataRowTitle}>
                            {proj.url ? <a href={proj.url} style={{ color: '#6366F1', textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                          </h3>
                          <p style={{ color: darkSlate, fontSize: `calc(${fontSize} * 0.85)`, marginTop: '4px' }}>
                            {proj.description}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                            {proj.technologies.map((tech, i) => (
                              <span key={i} style={tagPill}>{tech}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'skills':
                return skills.length > 0 ? (
                  <section key={section.id} style={panel}>
                    <div style={panelHeader}>
                      <div style={{ ...panelDot, backgroundColor: sand }} />
                      <h2 style={panelTitle}>Skills Dashboard</h2>
                    </div>
                    <div style={twoCol}>
                      {skills.map((cat) => (
                        <div key={cat.id}>
                          <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: charcoal, marginBottom: '4px' }}>
                            {cat.name}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                            {cat.skills.map((s, i) => (
                              <span key={i} style={sandPill}>{s}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'certifications':
                return certifications.length > 0 ? (
                  <section key={section.id} style={panel}>
                    <div style={panelHeader}>
                      <div style={{ ...panelDot, backgroundColor: '#F59E0B' }} />
                      <h2 style={panelTitle}>Certifications</h2>
                    </div>
                    <div style={twoCol}>
                      {certifications.map((cert) => (
                        <div key={cert.id}>
                          <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)` }}>{cert.name}</p>
                          <p style={{ fontSize: `calc(${fontSize} * 0.78)`, color: darkSlate }}>{cert.issuer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <section key={section.id}>
                    <div style={{ ...panelHeader, paddingLeft: '4px' }}>
                      <div style={{ ...panelDot, backgroundColor: '#EC4899' }} />
                      <h2 style={panelTitle}>Achievements</h2>
                    </div>
                    {achievements.map((ach) => (
                      <div key={ach.id} style={panel}>
                        <div style={dataRowTitle}>{ach.title}</div>
                        {ach.date && <p style={dataRowMeta}>{formatMonthYear(ach.date)}</p>}
                        {ach.description && <p style={{ color: darkSlate, marginTop: '4px' }}>{ach.description}</p>}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <section key={section.id} style={panel}>
                    <div style={panelHeader}>
                      <div style={{ ...panelDot, backgroundColor: '#8B5CF6' }} />
                      <h2 style={panelTitle}>Awards</h2>
                    </div>
                    {awards.map((award) => (
                      <div key={award.id} style={{ padding: '4px 0', borderBottom: '1px solid rgba(31,41,55,0.04)' }}>
                        <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)` }}>{award.title}</p>
                        <p style={{ fontSize: `calc(${fontSize} * 0.78)`, color: darkSlate }}>
                          {award.issuer}{award.date && ` · ${formatMonthYear(award.date)}`}
                        </p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <section key={section.id}>
                    <div style={{ ...panelHeader, paddingLeft: '4px' }}>
                      <div style={{ ...panelDot, backgroundColor: '#10B981' }} />
                      <h2 style={panelTitle}>Volunteer</h2>
                    </div>
                    {volunteer.map((vol) => (
                      <div key={vol.id} style={panel}>
                        <h3 style={dataRowTitle}>{vol.role}</h3>
                        <p style={dataRowMeta}>
                          <span>{vol.organization}{vol.location && ` · ${vol.location}`}</span>
                          <span>{formatDateRange(vol.dateRange)}</span>
                        </p>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <section key={section.id} style={panel}>
                    <div style={panelHeader}>
                      <div style={{ ...panelDot, backgroundColor: sand }} />
                      <h2 style={panelTitle}>Interests</h2>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {interests.map((interest) => (
                        <span key={interest.id} style={tagPill}>{interest.name}</span>
                      ))}
                    </div>
                  </section>
                ) : null

              case 'languages':
                return languages.length > 0 ? (
                  <section key={section.id} style={panel}>
                    <div style={panelHeader}>
                      <div style={{ ...panelDot, backgroundColor: '#6366F1' }} />
                      <h2 style={panelTitle}>Languages</h2>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {languages.map((lang) => (
                        <span key={lang.id} style={sandPill}>{lang.language}</span>
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
