/**
 * Business Template — Corporate Manager
 *
 * Design: Premium single-column with a dark navy header band spanning the full
 * width. The executive summary is presented in a subtle call-out box with a left
 * accent border. Section titles sit inside small colored bands. Experience
 * entries use a structured company-title-date row with thin dividers.
 *
 * Target audience: Corporate managers, directors, VPs, executives.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10.5px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.3, normal: 1.5, relaxed: 1.7 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function BusinessCorporateManagerTemplate({ data, theme, sections }: TemplateProps) {
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
      {/* Dark header band */}
      <div
        style={{
          backgroundColor: accent,
          color: '#ffffff',
          padding: '10mm 12mm',
        }}
      >
        <h1
          style={{
            fontSize: `calc(${fontSize} * 2.4)`,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: 0,
            color: '#ffffff',
          }}
        >
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p
            style={{
              fontSize: `calc(${fontSize} * 1.1)`,
              fontWeight: 400,
              marginTop: '4px',
              marginBottom: '8px',
              opacity: 0.85,
              color: '#ffffff',
            }}
          >
            {personal.headline}
          </p>
        )}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 20px',
            fontSize: `calc(${fontSize} * 0.88)`,
            opacity: 0.8,
            color: '#ffffff',
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '8mm 12mm' }}>
        {visibleSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <div
                  key={section.id}
                  style={{
                    marginBottom: gap,
                    backgroundColor: `${accent}08`,
                    borderLeft: `4px solid ${accent}`,
                    padding: '8px 12px',
                    borderRadius: '0 4px 4px 0',
                  }}
                >
                  <p
                    style={{
                      lineHeight,
                      color: theme.textColor,
                      fontSize: `calc(${fontSize} * 0.95)`,
                      fontStyle: 'normal',
                      margin: 0,
                    }}
                  >
                    {data.summary}
                  </p>
                </div>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  {experience.map((exp, i) => (
                    <div
                      key={exp.id}
                      style={{
                        marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0,
                        paddingBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0,
                        borderBottom: i < experience.length - 1 ? `1px solid ${accent}20` : 'none',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          flexWrap: 'wrap',
                          gap: '4px',
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontWeight: 700,
                              fontSize: `calc(${fontSize} * 1.02)`,
                              color: accent,
                              margin: 0,
                            }}
                          >
                            {exp.position}
                          </h3>
                          <p
                            style={{
                              fontWeight: 600,
                              color: theme.textColor,
                              fontSize: `calc(${fontSize} * 0.92)`,
                              marginTop: '1px',
                              marginBottom: 0,
                            }}
                          >
                            {exp.company}{exp.location ? ` \u2014 ${exp.location}` : ''}
                          </p>
                        </div>
                        <span
                          style={{
                            fontSize: `calc(${fontSize} * 0.82)`,
                            color: '#64748b',
                            whiteSpace: 'nowrap',
                            fontWeight: 500,
                          }}
                        >
                          {formatDateRange(exp.dateRange)}
                        </span>
                      </div>
                      {exp.description && (
                        <div
                          style={{ marginTop: '4px', lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.9)` }}
                          dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  {education.map((edu, i) => (
                    <div
                      key={edu.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '4px',
                        marginBottom: i < education.length - 1 ? '6px' : 0,
                      }}
                    >
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.95)`, margin: 0, color: '#0f172a' }}>
                          {edu.institution}
                        </h3>
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.88)`, marginTop: '1px', marginBottom: 0 }}>
                          {[edu.degree, edu.field].filter(Boolean).join(' in ')}
                          {edu.gpa ? ` \u2014 GPA: ${edu.gpa}` : ''}
                        </p>
                      </div>
                      <span style={{ fontSize: `calc(${fontSize} * 0.82)`, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                        {formatDateRange(edu.dateRange)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        style={{
                          border: `1px solid ${accent}20`,
                          borderRadius: '4px',
                          padding: '6px 10px',
                          width: '100%',
                          boxSizing: 'border-box',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.92)`, margin: 0, color: accent }}>
                            {proj.url ? (
                              <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a>
                            ) : proj.name}
                          </h3>
                          {proj.dateRange && (
                            <span style={{ fontSize: `calc(${fontSize} * 0.78)`, color: '#94a3b8' }}>
                              {formatDateRange(proj.dateRange)}
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.85)`, marginTop: '3px', marginBottom: 0 }}>
                            {proj.description}
                          </p>
                        )}
                        {proj.technologies.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                            {proj.technologies.map((tech) => (
                              <span
                                key={tech}
                                style={{
                                  fontSize: `calc(${fontSize} * 0.75)`,
                                  color: accent,
                                  backgroundColor: `${accent}10`,
                                  padding: '1px 6px',
                                  borderRadius: '3px',
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {cat.name && (
                          <span style={{ fontWeight: 700, minWidth: '110px', color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)` }}>
                            {cat.name}:
                          </span>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {cat.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                fontSize: `calc(${fontSize} * 0.82)`,
                                color: '#374151',
                                backgroundColor: '#f1f5f9',
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
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  {certifications.map((cert, i) => (
                    <div
                      key={cert.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '4px',
                        marginBottom: i < certifications.length - 1 ? '5px' : 0,
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.9)`, color: '#0f172a' }}>
                          {cert.name}
                        </span>
                        {cert.issuer && (
                          <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>
                            {' \u2014 '}{cert.issuer}
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: `calc(${fontSize} * 0.78)`, color: '#94a3b8' }}>
                        {formatMonthYear(cert.date)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
                    {languages.map((lang) => (
                      <div key={lang.id}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>
                          {lang.language}
                        </span>
                        <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>
                          {' \u2014 '}{LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {interests.map((interest) => (
                      <span
                        key={interest.id}
                        style={{
                          fontSize: `calc(${fontSize} * 0.82)`,
                          color: accent,
                          border: `1px solid ${accent}30`,
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
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  {achievements.map((ach, i) => (
                    <div
                      key={ach.id}
                      style={{
                        marginBottom: i < achievements.length - 1 ? '6px' : 0,
                        paddingLeft: '10px',
                        borderLeft: `2px solid ${accent}30`,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.9)`, color: '#0f172a' }}>
                          {ach.title}
                        </span>
                        {ach.date && (
                          <span style={{ fontSize: `calc(${fontSize} * 0.78)`, color: '#94a3b8' }}>
                            {formatMonthYear(ach.date)}
                          </span>
                        )}
                      </div>
                      {ach.description && (
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.85)`, marginTop: '1px', marginBottom: 0 }}>
                          {ach.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  {awards.map((award, i) => (
                    <div
                      key={award.id}
                      style={{
                        marginBottom: i < awards.length - 1 ? '5px' : 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '4px',
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.9)`, color: '#0f172a' }}>
                          {award.title}
                        </span>
                        <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>
                          {' \u2014 '}{award.issuer}
                        </span>
                      </div>
                      {award.date && (
                        <span style={{ fontSize: `calc(${fontSize} * 0.78)`, color: '#94a3b8' }}>
                          {formatMonthYear(award.date)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  {publications.map((pub, i) => (
                    <div
                      key={pub.id}
                      style={{
                        marginBottom: i < publications.length - 1 ? '6px' : 0,
                      }}
                    >
                      <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.9)`, margin: 0, color: '#0f172a' }}>
                        {pub.url ? (
                          <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a>
                        ) : pub.title}
                      </p>
                      <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
                        {pub.publisher}{pub.date ? ` \u00b7 ${formatMonthYear(pub.date)}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  {volunteer.map((vol, i) => (
                    <div
                      key={vol.id}
                      style={{
                        marginBottom: i < volunteer.length - 1 ? '6px' : 0,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.95)`, margin: 0, color: '#0f172a' }}>
                          {vol.role}
                        </h3>
                        <span style={{ fontSize: `calc(${fontSize} * 0.78)`, color: '#94a3b8' }}>
                          {formatDateRange(vol.dateRange)}
                        </span>
                      </div>
                      <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.85)`, marginTop: '1px', marginBottom: 0 }}>
                        {vol.organization}{vol.location ? ` \u2014 ${vol.location}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null

            case 'references':
              return references.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
                    {references.map((ref) => (
                      <div key={ref.id}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.9)`, margin: 0, color: '#0f172a' }}>
                          {ref.name}
                        </h3>
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
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
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionLabel label={section.label} accent={accent} fontSize={fontSize} />
                  {customData.entries.map((entry, i) => (
                    <div key={entry.id} style={{ marginBottom: i < customData.entries.length - 1 ? '6px' : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.9)`, color: '#0f172a' }}>
                          {entry.title}
                        </span>
                        {entry.date && (
                          <span style={{ fontSize: `calc(${fontSize} * 0.78)`, color: '#94a3b8' }}>
                            {formatMonthYear(entry.date)}
                          </span>
                        )}
                      </div>
                      {entry.subtitle && (
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
                          {entry.subtitle}
                        </p>
                      )}
                      {entry.description && (
                        <p style={{ color: '#374151', fontSize: `calc(${fontSize} * 0.85)`, marginTop: '2px', lineHeight }}>
                          {entry.description}
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
    </div>
  )
}

function SectionLabel({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <h2
      style={{
        fontSize: `calc(${fontSize} * 0.78)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: '#ffffff',
        backgroundColor: accent,
        display: 'inline-block',
        padding: '3px 12px 3px 12px',
        marginBottom: '10px',
        borderRadius: '0 3px 3px 0',
        marginLeft: '-12px',
      }}
    >
      {label}
    </h2>
  )
}
