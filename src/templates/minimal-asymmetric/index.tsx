/**
 * Minimal Asymmetric Template
 *
 * Identity: balanced asymmetric two-column. A compact header anchors the top,
 * then the body splits with experience + projects on the wider left and the
 * supporting sections (education, skills, certifications, languages, etc.) on
 * a narrower right rail divided by a single hairline. No fills, no boxes.
 *
 * Distinct via its narrow right rail with uppercase tracked mini-headings and
 * the left/right weighting (1.6 : 1).
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10px', md: '11px', lg: '12px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.55, relaxed: 1.7 }
const SPACING_MAP = { compact: '10px', normal: '15px', spacious: '20px' }

export default function MinimalAsymmetricTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const RIGHT_TYPES = new Set(['education', 'skills', 'certifications', 'languages', 'interests', 'awards', 'publications', 'achievements', 'volunteer', 'references'])
  const leftSections = visibleSections.filter((s) => !RIGHT_TYPES.has(s.type))
  const rightSections = visibleSections.filter((s) => RIGHT_TYPES.has(s.type))

  const leftTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.84)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: accent,
    marginBottom: '10px',
  }
  const rightTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.8)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.13em',
    color: '#0f172a',
    marginBottom: '7px',
  }

  const contactItems = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean) as string[]

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '16mm 18mm', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: `calc(${gap} * 1.3)` }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2.5)`, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, color: '#0f172a' }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.0)`, color: accent, marginTop: '4px', fontWeight: 400 }}>{personal.headline}</p>}
        {contactItems.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: '8px', color: '#6b7280', fontSize: `calc(${fontSize} * 0.88)` }}>
            {contactItems.map((item, i) => <span key={i}>{item}</span>)}
          </div>
        )}
      </header>

      <div style={{ display: 'flex', gap: '11mm' }}>
        {/* Left — narrative */}
        <div style={{ flex: '1.6', minWidth: 0 }}>
          {leftSections.map((section) => {
            switch (section.type) {
              case 'summary':
                return data.summary ? (
                  <Section key={section.id} title={section.label} titleStyle={leftTitle} gap={gap}>
                    <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
                  </Section>
                ) : null
              case 'experience':
                return experience.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={leftTitle} gap={gap}>
                    {experience.map((exp, i) => (
                      <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.95)` : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                          <h3 style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 1.05)`, color: '#0f172a' }}>{exp.position || 'Position'}</h3>
                          <span style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.85)` }}>{formatDateRange(exp.dateRange)}</span>
                        </div>
                        <p style={{ color: accent, fontWeight: 400, fontSize: `calc(${fontSize} * 0.95)` }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                        {exp.description && <div style={{ marginTop: '4px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />}
                      </div>
                    ))}
                  </Section>
                ) : null
              case 'projects':
                return projects.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={leftTitle} gap={gap}>
                    {projects.map((proj, i) => (
                      <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '9px' : 0 }}>
                        <h3 style={{ fontWeight: 600, color: '#0f172a' }}>
                          {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                          {proj.technologies.length > 0 && <span style={{ color: '#6b7280', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
                        </h3>
                        {proj.description && <p style={{ color: '#374151', marginTop: '3px', lineHeight }}>{proj.description}</p>}
                      </div>
                    ))}
                  </Section>
                ) : null
              default:
                return null
            }
          })}
        </div>

        {/* Right — supporting rail */}
        <div style={{ flex: '1', minWidth: 0, borderLeft: `1px solid #e5e7eb`, paddingLeft: '9mm' }}>
          {rightSections.map((section) => {
            switch (section.type) {
              case 'education':
                return education.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={rightTitle} gap={gap}>
                    {education.map((edu, i) => (
                      <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '7px' : 0 }}>
                        <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{edu.institution}</h3>
                        <p style={{ color: '#6b7280' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
                        <p style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(edu.dateRange)}</p>
                      </div>
                    ))}
                  </Section>
                ) : null
              case 'skills':
                return skills.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={rightTitle} gap={gap}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {skills.map((cat) => (
                        <div key={cat.id}>
                          {cat.name && <span style={{ fontWeight: 600, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)` }}>{cat.name}: </span>}
                          <span style={{ color: '#374151' }}>{cat.skills.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  </Section>
                ) : null
              case 'certifications':
                return certifications.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={rightTitle} gap={gap}>
                    {certifications.map((cert, i) => (
                      <div key={cert.id} style={{ marginBottom: i < certifications.length - 1 ? '4px' : 0 }}>
                        <p style={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.3 }}>{cert.name}</p>
                        <p style={{ color: '#6b7280', fontSize: `calc(${fontSize} * 0.82)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
                      </div>
                    ))}
                  </Section>
                ) : null
              case 'languages':
                return languages.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={rightTitle} gap={gap}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {languages.map((lang) => (
                        <div key={lang.id} style={{ color: '#374151', fontSize: `calc(${fontSize} * 0.88)` }}>
                          <span style={{ fontWeight: 600, color: '#0f172a' }}>{lang.language}</span> <span style={{ color: '#9ca3af' }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                        </div>
                      ))}
                    </div>
                  </Section>
                ) : null
              case 'achievements':
                return achievements.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={rightTitle} gap={gap}>
                    {achievements.map((ach, i) => (
                      <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '4px' : 0 }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{ach.title}</span>
                        {ach.date && <span style={{ color: '#9ca3af' }}> · {formatMonthYear(ach.date)}</span>}
                      </div>
                    ))}
                  </Section>
                ) : null
              case 'awards':
                return awards.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={rightTitle} gap={gap}>
                    {awards.map((award, i) => (
                      <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '4px' : 0 }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{award.title}</span>
                        <span style={{ color: '#6b7280' }}> · {award.issuer}</span>
                      </div>
                    ))}
                  </Section>
                ) : null
              case 'publications':
                return publications.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={rightTitle} gap={gap}>
                    {publications.map((pub, i) => (
                      <div key={pub.id} style={{ marginBottom: i < publications.length - 1 ? '4px' : 0 }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>
                          {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                        </span>
                        <span style={{ color: '#6b7280' }}> · {pub.publisher}</span>
                      </div>
                    ))}
                  </Section>
                ) : null
              case 'volunteer':
                return volunteer.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={rightTitle} gap={gap}>
                    {volunteer.map((vol, i) => (
                      <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '7px' : 0 }}>
                        <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{vol.role || 'Volunteer'}</h3>
                        <p style={{ color: accent, fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}>{vol.organization}</p>
                      </div>
                    ))}
                  </Section>
                ) : null
              case 'interests':
                return interests.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={rightTitle} gap={gap}>
                    <p style={{ color: '#374151' }}>{interests.map((i) => i.name).join(' · ')}</p>
                  </Section>
                ) : null
              case 'references':
                return references.length > 0 ? (
                  <Section key={section.id} title={section.label} titleStyle={rightTitle} gap={gap}>
                    {references.map((ref, i) => (
                      <div key={ref.id} style={{ marginBottom: i < references.length - 1 ? '6px' : 0 }}>
                        <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{ref.name}</h3>
                        <p style={{ color: '#6b7280', fontSize: `calc(${fontSize} * 0.85)` }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                      </div>
                    ))}
                  </Section>
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

function Section({ title, titleStyle, gap, children }: { title: string; titleStyle: React.CSSProperties; gap: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: `calc(${gap} * 1.4)` }}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  )
}
