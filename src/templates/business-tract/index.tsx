/**
 * Business Template — Tract
 *
 * Concept: Alternating section banners. Each section is rendered as a full-width
 * block with a background tint that alternates between white and a very subtle
 * cool gray. The section title is a floating accent-colored pill/badge at the
 * top-left corner of each block. Experience entries have a left accent "flag"
 * border. Skills appear as bordered tags. No sidebar, no cards, no grid — just
 * clean banner blocks with floating title badges.
 *
 * Target: Directors of operations, PMO leads, business analysts, program managers.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10.5px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.75 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function BusinessTractTemplate({ data, theme, sections }: TemplateProps) {
  const {
    personal, experience, education, projects, skills,
    certifications, languages, achievements, interests,
    awards, publications, volunteer, references, custom,
  } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor
  const tintAlt = '#f6f8fa'

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  return (
    <div
      style={{
        fontFamily: fontStack,
        fontSize,
        lineHeight,
        color: theme.textColor,
        backgroundColor: theme.backgroundColor,
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ padding: '8mm 12mm 6mm' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1
              style={{
                fontSize: `calc(${fontSize} * 2)`,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#0f172a',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
            </h1>
            {personal.headline && (
              <p style={{ fontSize: `calc(${fontSize} * 1)`, fontWeight: 400, color: accent, marginTop: '3px', marginBottom: 0 }}>
                {personal.headline}
              </p>
            )}
          </div>
          <div style={{ textAlign: 'right', color: '#64748b', fontSize: `calc(${fontSize} * 0.82)`, lineHeight: 1.6 }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </div>
      </div>

      {/* Banner blocks */}
      {visibleSections.map((section, idx) => {
        const isAlt = idx % 2 === 1

        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <p style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.92)`, margin: '8px 0 0' }}>
                  {data.summary}
                </p>
              </div>
            ) : null

          case 'experience':
            return experience.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px' }}>
                  {experience.map((exp, i) => (
                    <div
                      key={exp.id}
                      style={{
                        marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0,
                        borderLeft: `3px solid ${accent}25`,
                        paddingLeft: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1)`, color: '#0f172a', margin: 0 }}>
                          {exp.position}
                        </h3>
                        <span style={{ fontSize: `calc(${fontSize} * 0.78)`, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                          {formatDateRange(exp.dateRange)}
                        </span>
                      </div>
                      <p style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 0.85)`, color: accent, marginTop: '1px', marginBottom: '3px' }}>
                        {exp.company}{exp.location ? ` \u2014 ${exp.location}` : ''}
                      </p>
                      {exp.description && (
                        <div
                          style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.88)` }}
                          dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'education':
            return education.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px' }}>
                  {education.map((edu, i) => (
                    <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '6px' : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.95)`, margin: 0, color: '#0f172a' }}>
                          {edu.institution}
                        </h3>
                        <span style={{ fontSize: `calc(${fontSize} * 0.78)`, color: '#94a3b8' }}>
                          {formatDateRange(edu.dateRange)}
                        </span>
                      </div>
                      <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.85)`, marginTop: '1px', marginBottom: 0 }}>
                        {[edu.degree, edu.field].filter(Boolean).join(' in ')}
                        {edu.gpa ? ` \u2014 GPA: ${edu.gpa}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'projects':
            return projects.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      style={{
                        border: `1px solid ${accent}15`,
                        borderRadius: '4px',
                        padding: '5px 10px',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    >
                      <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.9)`, margin: 0, color: accent }}>
                        {proj.url ? (
                          <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a>
                        ) : proj.name}
                      </h3>
                      {proj.description && (
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '2px', marginBottom: 0 }}>
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'skills':
            return skills.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {cat.name && (
                        <span style={{ fontWeight: 700, minWidth: '100px', color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)` }}>
                          {cat.name}:
                        </span>
                      )}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            style={{
                              fontSize: `calc(${fontSize} * 0.78)`,
                              color: '#374151',
                              border: `1px solid ${accent}20`,
                              padding: '1px 8px',
                              borderRadius: '3px',
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'certifications':
            return certifications.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px' }}>
                  {certifications.map((cert, i) => (
                    <div key={cert.id} style={{ marginBottom: i < certifications.length - 1 ? '4px' : 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>{cert.name}</span>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)` }}>
                        {cert.issuer} &middot; {formatMonthYear(cert.date)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'languages':
            return languages.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
                  {languages.map((lang) => (
                    <span key={lang.id} style={{ fontSize: `calc(${fontSize} * 0.85)` }}>
                      <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                      <span style={{ color: '#64748b' }}> — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                    </span>
                  ))}
                </div>
              </div>
            ) : null

          case 'interests':
            return interests.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {interests.map((interest) => (
                    <span
                      key={interest.id}
                      style={{
                        fontSize: `calc(${fontSize} * 0.8)`,
                        color: accent,
                        border: `1px solid ${accent}25`,
                        padding: '2px 10px',
                        borderRadius: '3px',
                      }}
                    >
                      {interest.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null

          case 'achievements':
            return achievements.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px' }}>
                  {achievements.map((ach, i) => (
                    <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '4px' : 0 }}>
                      <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>{ach.title}</span>
                      {ach.description && (
                        <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>
                          {' \u2014 '}{ach.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'awards':
            return awards.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px' }}>
                  {awards.map((award, i) => (
                    <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '4px' : 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>{award.title}</span>
                      <span style={{ fontSize: `calc(${fontSize} * 0.75)`, color: '#94a3b8' }}>
                        {award.issuer}{award.date ? ` \u00b7 ${formatMonthYear(award.date)}` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'publications':
            return publications.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px' }}>
                  {publications.map((pub, i) => (
                    <div key={pub.id} style={{ marginBottom: i < publications.length - 1 ? '4px' : 0 }}>
                      <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, margin: 0, color: '#0f172a' }}>
                        {pub.url ? (
                          <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a>
                        ) : pub.title}
                      </p>
                      <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)`, marginTop: '1px', marginBottom: 0 }}>
                        {pub.publisher}{pub.date ? ` \u00b7 ${formatMonthYear(pub.date)}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'volunteer':
            return volunteer.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px' }}>
                  {volunteer.map((vol, i) => (
                    <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '5px' : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.9)`, margin: 0, color: '#0f172a' }}>
                          {vol.role}
                        </h3>
                        <span style={{ fontSize: `calc(${fontSize} * 0.75)`, color: '#94a3b8' }}>
                          {formatDateRange(vol.dateRange)}
                        </span>
                      </div>
                      <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
                        {vol.organization}{vol.location ? ` \u2014 ${vol.location}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'references':
            return references.length > 0 ? (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
                  {references.map((ref) => (
                    <div key={ref.id}>
                      <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.88)`, margin: 0, color: '#0f172a' }}>{ref.name}</p>
                      <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.78)`, margin: 0 }}>
                        {[ref.position, ref.company].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'custom': {
            const customId = section.customId
            const customData = customId ? custom[customId] : null
            if (!customData || customData.entries.length === 0) return null
            return (
              <div
                key={section.id}
                style={{
                  padding: isAlt ? '6mm 12mm' : '6mm 12mm',
                  backgroundColor: isAlt ? tintAlt : 'transparent',
                }}
              >
                <FloatingPill label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ marginTop: '8px' }}>
                  {customData.entries.map((entry, i) => (
                    <div key={entry.id} style={{ marginBottom: i < customData.entries.length - 1 ? '4px' : 0 }}>
                      <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>{entry.title}</span>
                      {entry.subtitle && <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}> — {entry.subtitle}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          default:
            return null
        }
      })}
    </div>
  )
}

function FloatingPill({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <h2
      style={{
        display: 'inline-block',
        fontSize: `calc(${fontSize} * 0.72)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#ffffff',
        backgroundColor: accent,
        padding: '2px 14px',
        borderRadius: '12px',
        margin: 0,
        lineHeight: 1.6,
      }}
    >
      {label}
    </h2>
  )
}
