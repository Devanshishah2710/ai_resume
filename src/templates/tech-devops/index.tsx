/**
 * Tech DevOps — DevOps Professional
 *
 * Identity: minimal header followed by a timeline-style experience
 * section where each role is laid out with the date range on the left
 * and the role details on the right. Certifications and technical
 * stack are surfaced prominently as a grid. The overall feel is
 * corporate-minimal with an infrastructure focus — clean rules,
 * monospaced-friendly spacing, and a subdued accent.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10px', md: '10.5px', lg: '11.5px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.5, relaxed: 1.7 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function TechDevopsTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const sectionTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.8)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: accent,
    marginBottom: '8px',
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '12mm 14mm', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: `calc(${gap} * 1.3)`, paddingBottom: '10px', borderBottom: `2px solid ${accent}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1 style={{ fontSize: `calc(${fontSize} * 1.9)`, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1, color: '#0f172a', margin: 0 }}>
              {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
            </h1>
            {personal.headline && (
              <p style={{ fontSize: `calc(${fontSize} * 1.0)`, color: '#475569', fontWeight: 400, marginTop: '3px' }}>
                {personal.headline}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.github && <span>{personal.github}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '8mm', rowGap: `calc(${gap} * 1.2)` }}>
        {visibleSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <div key={section.id} style={{ gridColumn: '1 / -1' }}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
                </div>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <div key={section.id} style={{ gridColumn: '1 / -1' }}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {experience.map((exp) => (
                    <div key={exp.id} style={{ display: 'flex', gap: '6mm', marginBottom: `calc(${gap} * 0.7)` }}>
                      <div style={{ width: '42mm', flexShrink: 0, textAlign: 'right' }}>
                        <span style={{ color: accent, fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)` }}>
                          {formatDateRange(exp.dateRange)}
                        </span>
                      </div>
                      <div style={{ flex: 1, borderLeft: `1px solid ${accent}30`, paddingLeft: '6mm' }}>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', left: '-6.8mm', top: '5px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: accent, border: `2px solid ${theme.backgroundColor}` }} />
                        </div>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.02)`, color: '#0f172a', margin: 0 }}>
                          {exp.position} <span style={{ fontWeight: 400, color: '#64748b' }}>— {exp.company}{exp.location ? `, ${exp.location}` : ''}</span>
                        </h3>
                        {exp.description && (
                          <div style={{ marginTop: '3px', color: '#374151' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <div key={section.id} style={{ gridColumn: '1 / -1' }}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '6mm', rowGap: '4px' }}>
                    {skills.map((cat) => (
                      <div key={cat.id}>
                        {cat.name && <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)`, margin: 0 }}>{cat.name}</p>}
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.88)` }}>{cat.skills.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ marginBottom: '5px' }}>
                      <p style={{ fontWeight: 600, color: '#0f172a', margin: 0, lineHeight: 1.3, fontSize: `calc(${fontSize} * 0.88)` }}>{cert.name}</p>
                      <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
                    </div>
                  ))}
                </div>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
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
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {projects.map((proj, i) => (
                    <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '6px' : 0 }}>
                      <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>
                        {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      </h3>
                      {proj.description && <p style={{ color: '#374151', marginTop: '2px', fontSize: `calc(${fontSize} * 0.9)` }}>{proj.description}</p>}
                      {proj.technologies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
                          {proj.technologies.map((tech) => (
                            <span key={tech} style={{
                              padding: '1px 6px',
                              backgroundColor: `${accent}10`,
                              color: accent,
                              borderRadius: '3px',
                              fontSize: `calc(${fontSize} * 0.78)`,
                              fontWeight: 500,
                            }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ marginBottom: '2px' }}>
                      <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}> — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                    </div>
                  ))}
                </div>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{ach.title}</span>
                      {ach.date && <span style={{ color: '#94a3b8' }}> · {formatMonthYear(ach.date)}</span>}
                    </div>
                  ))}
                </div>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  <p style={{ color: '#374151' }}>{interests.map((i) => i.name).join(' · ')}</p>
                </div>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
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
                  <h2 style={sectionTitle}>{section.label}</h2>
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
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {volunteer.map((vol, i) => (
                    <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '6px' : 0 }}>
                      <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{vol.role}</h3>
                      <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.9)` }}>{vol.organization}</p>
                    </div>
                  ))}
                </div>
              ) : null

            case 'references':
              return references.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
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
      </div>
    </div>
  )
}
