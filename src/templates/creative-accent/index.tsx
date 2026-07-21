/**
 * Creative Accent — Color Accent
 *
 * Identity: minimal white canvas with bold accent-colored section header
 * bands. Each section opens with a full-width coloured bar containing the
 * section title in white uppercase lettering — content below sits on the
 * clean white background. The header is a simple stacked name/headline
 * with a contact row below. Strong visual rhythm from the repeated accent
 * bars. Professional, clean, visually striking.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '12px', md: '13px', lg: '14px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.55, relaxed: 1.75 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function CreativeAccentTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const AccentBar = ({ label }: { label: string }) => (
    <div style={{ backgroundColor: accent, padding: '5px 10px', borderRadius: '3px', marginBottom: '8px' }}>
      <h2 style={{ fontSize: `calc(${fontSize} * 0.85)`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ffffff', margin: 0 }}>
        {label}
      </h2>
    </div>
  )

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '14mm 16mm', boxSizing: 'border-box' }}>
      <header style={{ textAlign: 'center', marginBottom: `calc(${gap} * 1.3)`, borderBottom: `1px solid ${accent}30`, paddingBottom: '14px' }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2.4)`, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, color: '#0f172a', margin: 0 }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.1)`, color: accent, fontWeight: 500, marginTop: '5px' }}>
            {personal.headline}
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 16px', marginTop: '8px', color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap }}>

        {visibleSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <p style={{ color: '#374151', lineHeight, padding: '0 10px' }}>{data.summary}</p>
                </div>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px' }}>
                    {experience.map((exp, i) => (
                      <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', alignItems: 'baseline' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.02)`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                          <span style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(exp.dateRange)}</span>
                        </div>
                        <p style={{ color: accent, fontWeight: 600, fontSize: `calc(${fontSize} * 0.9)`, marginTop: '1px' }}>
                          {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                        </p>
                        {exp.description && (
                          <div style={{ marginTop: '3px', color: '#374151' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px' }}>
                    {education.map((edu, i) => (
                      <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '7px' : 0 }}>
                        <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{edu.institution}</h3>
                        <p style={{ color: '#475569' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</p>
                        <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(edu.dateRange)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px', display: 'flex', flexWrap: 'wrap', gap: '4px 24px' }}>
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ minWidth: '140px' }}>
                        {cat.name && <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)`, margin: 0 }}>{cat.name}</p>}
                        <p style={{ color: '#475569' }}>{cat.skills.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px' }}>
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
                </div>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px' }}>
                    {certifications.map((cert, i) => (
                      <div key={cert.id} style={{ marginBottom: i < certifications.length - 1 ? '4px' : 0 }}>
                        <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)`, margin: 0, lineHeight: 1.3 }}>{cert.name}</p>
                        <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px', display: 'flex', flexWrap: 'wrap', gap: '2px 20px' }}>
                    {languages.map((lang) => (
                      <div key={lang.id}>
                        <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                        <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}> — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px' }}>
                    {achievements.map((ach, i) => (
                      <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '4px' : 0 }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{ach.title}</span>
                        {ach.date && <span style={{ color: '#94a3b8' }}> · {formatMonthYear(ach.date)}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <p style={{ color: '#374151', padding: '0 10px' }}>{interests.map((i) => i.name).join(' · ')}</p>
                </div>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px' }}>
                    {awards.map((award, i) => (
                      <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '4px' : 0 }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{award.title}</span>
                        <span style={{ color: '#64748b' }}> · {award.issuer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px' }}>
                    {publications.map((pub, i) => (
                      <div key={pub.id} style={{ marginBottom: i < publications.length - 1 ? '4px' : 0 }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>
                          {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                        </span>
                        <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px' }}>
                    {volunteer.map((vol, i) => (
                      <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '6px' : 0 }}>
                        <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{vol.role}</h3>
                        <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.9)` }}>{vol.organization}{vol.location ? ` · ${vol.location}` : ''}</p>
                        <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(vol.dateRange)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'references':
              return references.length > 0 ? (
                <div key={section.id}>
                  <AccentBar label={section.label} />
                  <div style={{ padding: '0 10px', display: 'flex', flexWrap: 'wrap', gap: `${gap} 24px` }}>
                    {references.map((ref) => (
                      <div key={ref.id} style={{ minWidth: '180px' }}>
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
