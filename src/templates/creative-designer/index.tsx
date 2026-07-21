/**
 * Creative Designer — Elegant Designer
 *
 * Identity: compact header followed by a left side panel (skills,
 * languages, certifications, interests) separated from the main content
 * by a thin vertical divider. The main content area has full-width
 * experience entries with generous whitespace. Serif-appropriate for the
 * name, clean sans-serif for body. Premium editorial feel with a quiet
 * accent panel background.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'


export default function CreativeDesignerTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const panelSections = ['skills', 'languages', 'certifications', 'interests']
  const panelItems = visibleSections.filter((s) => panelSections.includes(s.type))
  const mainItems = visibleSections.filter((s) => !panelSections.includes(s.type))

  const panelTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.78)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: theme.backgroundColor,
    marginBottom: '5px',
    borderBottom: `1px solid ${theme.backgroundColor}40`,
    paddingBottom: '3px',
  }

  const mainTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.85)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: accent,
    marginBottom: '8px',
    borderBottom: `1px solid ${accent}25`,
    paddingBottom: '4px',
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '12mm 14mm 8mm', borderBottom: `1px solid ${accent}30` }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2.3)`, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, color: '#0f172a', margin: 0 }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.1)`, color: accent, fontWeight: 400, marginTop: '4px' }}>
            {personal.headline}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px 16px', marginTop: '7px', color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '62mm', padding: '10mm 8mm', backgroundColor: accent, color: theme.backgroundColor, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {panelItems.map((section) => {
            switch (section.type) {
              case 'skills':
                return skills.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={panelTitle}>{section.label}</h2>
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ marginBottom: '5px' }}>
                        {cat.name && <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, margin: 0 }}>{cat.name}</p>}
                        <p style={{ opacity: 0.85 }}>{cat.skills.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'languages':
                return languages.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={panelTitle}>{section.label}</h2>
                    {languages.map((lang) => (
                      <div key={lang.id} style={{ marginBottom: '3px' }}>
                        <strong>{lang.language}</strong>
                        <span style={{ opacity: 0.8, fontSize: `calc(${fontSize} * 0.82)` }}> — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'certifications':
                return certifications.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={panelTitle}>{section.label}</h2>
                    {certifications.map((cert) => (
                      <div key={cert.id} style={{ marginBottom: '5px' }}>
                        <p style={{ fontWeight: 600, margin: 0, lineHeight: 1.3, fontSize: `calc(${fontSize} * 0.88)` }}>{cert.name}</p>
                        <p style={{ opacity: 0.8, fontSize: `calc(${fontSize} * 0.82)` }}>{cert.issuer}</p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={panelTitle}>{section.label}</h2>
                    <p style={{ opacity: 0.9 }}>{interests.map((i) => i.name).join(' · ')}</p>
                  </div>
                ) : null

              default:
                return null
            }
          })}
        </aside>

        <main style={{ flex: 1, padding: '10mm 12mm', display: 'flex', flexDirection: 'column', gap }}>
          {mainItems.map((section) => {
            switch (section.type) {
              case 'summary':
                return data.summary ? (
                  <div key={section.id}>
                    <h2 style={mainTitle}>{section.label}</h2>
                    <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
                  </div>
                ) : null

              case 'experience':
                return experience.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={mainTitle}>{section.label}</h2>
                    {experience.map((exp, i) => (
                      <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', alignItems: 'baseline' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.02)`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                          <span style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(exp.dateRange)}</span>
                        </div>
                        <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.9)`, marginTop: '1px' }}>
                          {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                        </p>
                        {exp.description && (
                          <div style={{ marginTop: '3px', color: '#374151' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                        )}
                      </div>
                    ))}
                  </div>
                ) : null

              case 'education':
                return education.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={mainTitle}>{section.label}</h2>
                    {education.map((edu, i) => (
                      <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '7px' : 0 }}>
                        <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{edu.institution}</h3>
                        <p style={{ color: '#475569' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</p>
                        <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(edu.dateRange)}</p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'projects':
                return projects.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={mainTitle}>{section.label}</h2>
                    {projects.map((proj, i) => (
                      <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '6px' : 0 }}>
                        <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>
                          {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                        </h3>
                        {proj.description && <p style={{ color: '#374151', marginTop: '2px' }}>{proj.description}</p>}
                        {proj.technologies.length > 0 && (
                          <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{proj.technologies.join(', ')}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={mainTitle}>{section.label}</h2>
                    {achievements.map((ach) => (
                      <div key={ach.id} style={{ marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{ach.title}</span>
                        {ach.date && <span style={{ color: '#94a3b8' }}> · {formatMonthYear(ach.date)}</span>}
                      </div>
                    ))}
                  </div>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={mainTitle}>{section.label}</h2>
                    {awards.map((award) => (
                      <div key={award.id} style={{ marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{award.title}</span>
                        <span style={{ color: '#64748b' }}> · {award.issuer}</span>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'publications':
                return publications.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={mainTitle}>{section.label}</h2>
                    {publications.map((pub) => (
                      <div key={pub.id} style={{ marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>
                          {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                        </span>
                        <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={mainTitle}>{section.label}</h2>
                    {volunteer.map((vol, i) => (
                      <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '6px' : 0 }}>
                        <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{vol.role}</h3>
                        <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.9)` }}>{vol.organization}{vol.location ? ` · ${vol.location}` : ''}</p>
                        <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(vol.dateRange)}</p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'references':
                return references.length > 0 ? (
                  <div key={section.id}>
                    <h2 style={mainTitle}>{section.label}</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${gap} 24px` }}>
                      {references.map((ref) => (
                        <div key={ref.id}>
                          <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{ref.name}</h3>
                          <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.85)` }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null

              default:
                return null
            }
          })}
        </main>
      </div>
    </div>
  )
}
