/**
 * Business Template — Operations Director
 *
 * Design: Grid-based layout with a "leadership snapshot" panel at the top of the
 * body featuring a soft background. Sections are arranged in a balanced two-column
 * grid with subtle card-like containers. Experience entries use a structured
 * layout with a left accent border. The header has a clean, spacious feel with
 * a professional color block for the name.
 *
 * Target audience: COOs, operations directors, supply chain leaders, process
 * improvement managers, logistics executives.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10px', md: '11px', lg: '12px' }
const LINE_HEIGHT_MAP = { tight: 1.3, normal: 1.5, relaxed: 1.7 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function BusinessOperationsDirectorTemplate({ data, theme, sections }: TemplateProps) {
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

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const leftGridTypes = ['experience', 'projects', 'achievements', 'awards', 'volunteer']
  const rightGridTypes = ['education', 'skills', 'certifications', 'languages', 'interests', 'publications', 'references']
  const leftGridSections = visibleSections.filter((s) => leftGridTypes.includes(s.type))
  const rightGridSections = visibleSections.filter((s) => rightGridTypes.includes(s.type))
  const standaloneSections = visibleSections.filter(
    (s) => s.type === 'summary' || (!leftGridTypes.includes(s.type) && !rightGridTypes.includes(s.type)),
  )

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
      <div
        style={{
          padding: '9mm 12mm 7mm',
          borderBottom: `1px solid ${accent}25`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1
              style={{
                fontSize: `calc(${fontSize} * 2)`,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#0f172a',
                margin: 0,
              }}
            >
              {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
            </h1>
            {personal.headline && (
              <p
                style={{
                  fontSize: `calc(${fontSize} * 1.05)`,
                  fontWeight: 500,
                  color: accent,
                  marginTop: '3px',
                  marginBottom: 0,
                }}
              >
                {personal.headline}
              </p>
            )}
          </div>
          <div
            style={{
              textAlign: 'right',
              color: '#475569',
              fontSize: `calc(${fontSize} * 0.82)`,
              lineHeight: 1.6,
            }}
          >
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.website && <div>{personal.website}</div>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '7mm 12mm' }}>
        {/* Summary — standalone full width */}
        {standaloneSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <div
                  key={section.id}
                  style={{
                    marginBottom: gap,
                    backgroundColor: `${accent}06`,
                    border: `1px solid ${accent}15`,
                    borderRadius: '5px',
                    padding: '8px 14px',
                  }}
                >
                  <p style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.92)`, margin: 0 }}>
                    {data.summary}
                  </p>
                </div>
              ) : null

            default:
              return null
          }
        })}

        {/* Two-column grid layout */}
        <div style={{ display: 'flex', gap: '6mm', alignItems: 'flex-start' }}>
          {/* Left column */}
          <div style={{ flex: 1.3, minWidth: 0 }}>
            {leftGridSections.map((section) => {
              switch (section.type) {
                case 'experience':
                  return experience.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      {experience.map((exp, i) => (
                        <div
                          key={exp.id}
                          style={{
                            marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0,
                            paddingLeft: '10px',
                            borderLeft: `3px solid ${accent}25`,
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                            <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.98)`, color: '#0f172a', margin: 0 }}>
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
                  ) : null

                case 'projects':
                  return projects.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      {projects.map((proj, i) => (
                        <div
                          key={proj.id}
                          style={{
                            marginBottom: i < projects.length - 1 ? '6px' : 0,
                            padding: '5px 10px',
                            backgroundColor: `${accent}04`,
                            borderRadius: '4px',
                            borderLeft: `3px solid ${accent}20`,
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                            <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.9)`, margin: 0, color: accent }}>
                              {proj.url ? (
                                <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a>
                              ) : proj.name}
                            </h3>
                            {proj.dateRange && (
                              <span style={{ fontSize: `calc(${fontSize} * 0.75)`, color: '#94a3b8' }}>
                                {formatDateRange(proj.dateRange)}
                              </span>
                            )}
                          </div>
                          {proj.description && (
                            <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '2px', marginBottom: 0 }}>
                              {proj.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null

                case 'achievements':
                  return achievements.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      {achievements.map((ach, i) => (
                        <div
                          key={ach.id}
                          style={{
                            marginBottom: i < achievements.length - 1 ? '5px' : 0,
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'flex-start',
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: '18px',
                              height: '18px',
                              backgroundColor: accent,
                              color: '#ffffff',
                              fontSize: `calc(${fontSize} * 0.65)`,
                              fontWeight: 700,
                              borderRadius: '3px',
                              marginTop: '1px',
                            }}
                          >
                            {i + 1}
                          </span>
                          <div>
                            <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>
                              {ach.title}
                            </span>
                            {ach.description && (
                              <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)`, margin: '1px 0 0' }}>
                                {ach.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null

                case 'awards':
                  return awards.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      {awards.map((award, i) => (
                        <div
                          key={award.id}
                          style={{
                            marginBottom: i < awards.length - 1 ? '4px' : 0,
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '4px',
                            padding: '3px 8px',
                            backgroundColor: `${accent}04`,
                            borderRadius: '4px',
                          }}
                        >
                          <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a' }}>
                            {award.title}
                          </span>
                          <span style={{ fontSize: `calc(${fontSize} * 0.75)`, color: '#94a3b8' }}>
                            {award.issuer}{award.date ? ` \u00b7 ${formatMonthYear(award.date)}` : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null

                case 'volunteer':
                  return volunteer.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      {volunteer.map((vol, i) => (
                        <div
                          key={vol.id}
                          style={{
                            marginBottom: i < volunteer.length - 1 ? '6px' : 0,
                            padding: '4px 8px',
                            backgroundColor: `${accent}04`,
                            borderRadius: '4px',
                          }}
                        >
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.9)`, margin: 0, color: '#0f172a' }}>
                            {vol.role}
                          </h3>
                          <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
                            {vol.organization}{vol.location ? ` \u2014 ${vol.location}` : ''}
                          </p>
                          <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.75)`, marginTop: '1px', marginBottom: 0 }}>
                            {formatDateRange(vol.dateRange)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null

                default:
                  return null
              }
            })}
          </div>

          {/* Right column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {rightGridSections.map((section) => {
              switch (section.type) {
                case 'education':
                  return education.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      {education.map((edu, i) => (
                        <div
                          key={edu.id}
                          style={{
                            marginBottom: i < education.length - 1 ? '7px' : 0,
                            padding: '5px 10px',
                            backgroundColor: `${accent}04`,
                            borderRadius: '4px',
                            borderTop: `2px solid ${accent}20`,
                          }}
                        >
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.92)`, margin: 0, color: '#0f172a' }}>
                            {edu.institution}
                          </h3>
                          <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
                            {[edu.degree, edu.field].filter(Boolean).join(' in ')}
                            {edu.gpa ? ` \u2014 GPA: ${edu.gpa}` : ''}
                          </p>
                          <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.75)`, marginTop: '1px', marginBottom: 0 }}>
                            {formatDateRange(edu.dateRange)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null

                case 'skills':
                  return skills.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      {skills.map((cat, i) => (
                        <div
                          key={cat.id}
                          style={{
                            marginBottom: i < skills.length - 1 ? '6px' : 0,
                            padding: '5px 10px',
                            backgroundColor: `${accent}04`,
                            borderRadius: '4px',
                          }}
                        >
                          {cat.name && (
                            <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a', margin: 0, marginBottom: '3px' }}>
                              {cat.name}
                            </p>
                          )}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                            {cat.skills.map((skill) => (
                              <span
                                key={skill}
                                style={{
                                  fontSize: `calc(${fontSize} * 0.75)`,
                                  color: '#374151',
                                  backgroundColor: `${accent}08`,
                                  padding: '1px 7px',
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
                  ) : null

                case 'certifications':
                  return certifications.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      {certifications.map((cert, i) => (
                        <div
                          key={cert.id}
                          style={{
                            marginBottom: i < certifications.length - 1 ? '5px' : 0,
                            padding: '4px 10px',
                            backgroundColor: `${accent}04`,
                            borderRadius: '4px',
                            borderLeft: `3px solid ${accent}20`,
                          }}
                        >
                          <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, margin: 0, color: '#0f172a' }}>
                            {cert.name}
                          </p>
                          <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)`, margin: 0 }}>
                            {cert.issuer} &middot; {formatMonthYear(cert.date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null

                case 'languages':
                  return languages.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {languages.map((lang) => (
                          <div
                            key={lang.id}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              padding: '3px 10px',
                              backgroundColor: `${accent}04`,
                              borderRadius: '4px',
                            }}
                          >
                            <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a' }}>
                              {lang.language}
                            </span>
                            <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)` }}>
                              {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null

                case 'interests':
                  return interests.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {interests.map((interest) => (
                          <span
                            key={interest.id}
                            style={{
                              fontSize: `calc(${fontSize} * 0.78)`,
                              color: accent,
                              backgroundColor: `${accent}08`,
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

                case 'publications':
                  return publications.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      {publications.map((pub, i) => (
                        <div
                          key={pub.id}
                          style={{
                            marginBottom: i < publications.length - 1 ? '5px' : 0,
                            padding: '4px 10px',
                            backgroundColor: `${accent}04`,
                            borderRadius: '4px',
                          }}
                        >
                          <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, margin: 0, color: '#0f172a' }}>
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
                  ) : null

                case 'references':
                  return references.length > 0 ? (
                    <div key={section.id} style={{ marginBottom: gap }}>
                      <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                      {references.map((ref, i) => (
                        <div
                          key={ref.id}
                          style={{
                            marginBottom: i < references.length - 1 ? '5px' : 0,
                            padding: '4px 10px',
                            backgroundColor: `${accent}04`,
                            borderRadius: '4px',
                          }}
                        >
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.85)`, margin: 0, color: '#0f172a' }}>
                            {ref.name}
                          </h3>
                          <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.78)`, marginTop: '1px', marginBottom: 0 }}>
                            {[ref.position, ref.company].filter(Boolean).join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null

                default:
                  return null
              }
            })}
          </div>
        </div>

        {/* Custom sections — full width at bottom */}
        {visibleSections
          .filter((s) => s.type === 'custom' && s.visible)
          .map((section) => {
            const customId = section.customId
            const customData = customId ? custom[customId] : null
            if (!customData || customData.entries.length === 0) return null
            return (
              <div key={section.id} style={{ marginBottom: gap, marginTop: gap }}>
                <GridTitle label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {customData.entries.map((entry) => (
                    <div
                      key={entry.id}
                      style={{
                        border: `1px solid ${accent}15`,
                        borderRadius: '4px',
                        padding: '5px 10px',
                        flex: '1 1 45%',
                        minWidth: '160px',
                        boxSizing: 'border-box',
                        backgroundColor: `${accent}04`,
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>
                        {entry.title}
                      </span>
                      {entry.subtitle && (
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
                          {entry.subtitle}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

function GridTitle({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <h2
      style={{
        fontSize: `calc(${fontSize} * 0.8)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: accent,
        marginBottom: '8px',
        paddingBottom: '3px',
        borderBottom: `2px solid ${accent}15`,
      }}
    >
      {label}
    </h2>
  )
}
