/**
 * Business Template — Marketing Executive
 *
 * Design: Centered name/headline header with a thin divider. Two-column body
 * with a 1.4:1 ratio. Summary, experience, and achievements live in the wider
 * left column. Education, skills, certifications, languages in the right column.
 * Section backgrounds alternate between white and very subtle warm beige/gray.
 * The accent color is used sparingly in thin top borders on section containers.
 *
 * Target audience: CMOs, brand directors, marketing managers, communications leads.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10px', md: '11px', lg: '12px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.75 }
const SPACING_MAP = { compact: '10px', normal: '13px', spacious: '18px' }

export default function BusinessMarketingExecutiveTemplate({ data, theme, sections }: TemplateProps) {
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
  const bgAlt = `${accent}06`

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const rightColumnTypes = ['education', 'skills', 'certifications', 'languages', 'interests', 'references']
  const leftSections = visibleSections.filter((s) => !rightColumnTypes.includes(s.type))
  const rightSections = visibleSections.filter((s) => rightColumnTypes.includes(s.type))

  const ExpCard = ({ children }: { children: React.ReactNode }) => (
    <div style={{ marginBottom: `calc(${gap} * 0.8)` }}>{children}</div>
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
      {/* Centered header */}
      <div style={{ textAlign: 'center', padding: '9mm 14mm 6mm' }}>
        <h1
          style={{
            fontSize: `calc(${fontSize} * 2.2)`,
            fontWeight: 300,
            letterSpacing: '0.06em',
            lineHeight: 1.15,
            color: '#0f172a',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p
            style={{
              fontSize: `calc(${fontSize} * 1)`,
              fontWeight: 400,
              color: accent,
              marginTop: '5px',
              marginBottom: '8px',
              letterSpacing: '0.04em',
              fontStyle: 'italic',
            }}
          >
            {personal.headline}
          </p>
        )}
        <div
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: accent,
            margin: '6px auto 8px',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '5px 16px',
            color: '#64748b',
            fontSize: `calc(${fontSize} * 0.85)`,
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {/* Two-column body */}
      <div
        style={{
          display: 'flex',
          gap: '6mm',
          padding: '0 14mm 8mm',
          boxSizing: 'border-box',
        }}
      >
        {/* Left column — narrative sections */}
        <div style={{ flex: 1.4, minWidth: 0 }}>
          {leftSections.map((section) => {
            switch (section.type) {
              case 'summary':
                return data.summary ? (
                  <div
                    key={section.id}
                    style={{
                      marginBottom: gap,
                      padding: '8px 12px',
                      backgroundColor: bgAlt,
                      borderTop: `3px solid ${accent}`,
                      borderRadius: '0 0 4px 4px',
                    }}
                  >
                    <p style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.92)`, margin: 0 }}>
                      {data.summary}
                    </p>
                  </div>
                ) : null

              case 'experience':
                return experience.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {experience.map((exp) => (
                      <ExpCard key={exp.id}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            gap: '4px',
                          }}
                        >
                          <h3
                            style={{
                              fontWeight: 700,
                              fontSize: `calc(${fontSize} * 0.98)`,
                              color: '#0f172a',
                              margin: 0,
                            }}
                          >
                            {exp.position}
                          </h3>
                          <span
                            style={{
                              fontSize: `calc(${fontSize} * 0.78)`,
                              color: '#94a3b8',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {formatDateRange(exp.dateRange)}
                          </span>
                        </div>
                        <p
                          style={{
                            fontWeight: 500,
                            fontSize: `calc(${fontSize} * 0.85)`,
                            color: accent,
                            marginTop: '1px',
                            marginBottom: '3px',
                          }}
                        >
                          {exp.company}{exp.location ? ` \u2014 ${exp.location}` : ''}
                        </p>
                        {exp.description && (
                          <div
                            style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.88)` }}
                            dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                          />
                        )}
                      </ExpCard>
                    ))}
                  </div>
                ) : null

              case 'projects':
                return projects.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        style={{
                          marginBottom: '7px',
                          padding: '6px 10px',
                          backgroundColor: bgAlt,
                          borderRadius: '4px',
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
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {achievements.map((ach) => (
                      <div
                        key={ach.id}
                        style={{
                          marginBottom: '5px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '6px',
                        }}
                      >
                        <span
                          style={{
                            color: accent,
                            fontSize: `calc(${fontSize} * 0.7)`,
                            lineHeight: 1.5,
                            minWidth: '12px',
                            textAlign: 'center',
                          }}
                        >
                          {'\u25B8'}
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
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {awards.map((award) => (
                      <div
                        key={award.id}
                        style={{
                          marginBottom: '5px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '4px',
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

              case 'publications':
                return publications.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {publications.map((pub) => (
                      <div key={pub.id} style={{ marginBottom: '5px' }}>
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
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {volunteer.map((vol) => (
                      <div key={vol.id} style={{ marginBottom: '6px' }}>
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
                ) : null

              case 'custom': {
                const customId = section.customId
                const customData = customId ? custom[customId] : null
                if (!customData || customData.entries.length === 0) return null
                return (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {customData.entries.map((entry) => (
                      <div key={entry.id} style={{ marginBottom: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>
                            {entry.title}
                          </span>
                          {entry.date && (
                            <span style={{ fontSize: `calc(${fontSize} * 0.75)`, color: '#94a3b8' }}>
                              {formatMonthYear(entry.date)}
                            </span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
                            {entry.subtitle}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )
              }

              default:
                return null
            }
          })}
        </div>

        {/* Right column — supporting sections */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {rightSections.map((section) => {
            switch (section.type) {
              case 'education':
                return education.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {education.map((edu) => (
                      <div
                        key={edu.id}
                        style={{
                          marginBottom: '7px',
                          padding: '6px 8px',
                          backgroundColor: bgAlt,
                          borderRadius: '4px',
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
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ marginBottom: '6px' }}>
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
                                fontSize: `calc(${fontSize} * 0.78)`,
                                color: '#374151',
                                backgroundColor: bgAlt,
                                padding: '2px 8px',
                                borderRadius: '3px',
                                border: `1px solid ${accent}15`,
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
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {certifications.map((cert) => (
                      <div
                        key={cert.id}
                        style={{
                          marginBottom: '5px',
                          padding: '4px 8px',
                          backgroundColor: bgAlt,
                          borderRadius: '4px',
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
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {languages.map((lang) => (
                      <div
                        key={lang.id}
                        style={{
                          marginBottom: '3px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '2px 8px',
                          backgroundColor: bgAlt,
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
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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
                            border: `1px solid ${accent}20`,
                          }}
                        >
                          {interest.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null

              case 'references':
                return references.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {references.map((ref) => (
                      <div
                        key={ref.id}
                        style={{
                          marginBottom: '5px',
                          padding: '4px 8px',
                          backgroundColor: bgAlt,
                          borderRadius: '4px',
                        }}
                      >
                        <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, margin: 0, color: '#0f172a' }}>
                          {ref.name}
                        </p>
                        <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)`, margin: 0 }}>
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
    </div>
  )
}

function SectionTitle({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <h2
      style={{
        fontSize: `calc(${fontSize} * 0.78)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: accent,
        marginBottom: '7px',
        paddingBottom: '4px',
        borderBottom: `1px solid ${accent}30`,
      }}
    >
      {label}
    </h2>
  )
}
