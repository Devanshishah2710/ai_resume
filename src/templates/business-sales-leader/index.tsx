/**
 * Business Template — Sales Leader
 *
 * Design: Timeline-based layout with a vertical track on the left side.
 * Experience entries connect through dots and lines along the timeline.
 * Key KPIs, awards, and achievements are displayed in stat badges with
 * accent-colored backgrounds. Sections have a premium card feel with
 * subtle left border accents. The header includes a compact contact row.
 *
 * Target audience: Sales directors, account executives, revenue leaders, BDR managers.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10px', md: '11px', lg: '12px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.5, relaxed: 1.7 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function BusinessSalesLeaderTemplate({ data, theme, sections }: TemplateProps) {
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
      {/* Header with metrics-style contact */}
      <div
        style={{
          padding: '9mm 12mm',
          borderBottom: `3px solid ${accent}`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px' }}>
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
              <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, fontWeight: 500, marginTop: '3px', marginBottom: 0 }}>
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
      <div style={{ padding: '8mm 12mm' }}>
        {visibleSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <div
                  key={section.id}
                  style={{
                    marginBottom: gap,
                    border: `1px solid ${accent}20`,
                    borderRadius: '5px',
                    padding: '8px 12px',
                    backgroundColor: `${accent}04`,
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
                  <div style={{ position: 'relative', paddingLeft: '18px' }}>
                    {/* Vertical timeline line */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '4px',
                        top: '4px',
                        bottom: '4px',
                        width: '2px',
                        backgroundColor: `${accent}25`,
                      }}
                    />
                    {experience.map((exp, i) => (
                      <div
                        key={exp.id}
                        style={{
                          position: 'relative',
                          marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0,
                          paddingLeft: '12px',
                        }}
                      >
                        {/* Timeline dot */}
                        <div
                          style={{
                            position: 'absolute',
                            left: '-16px',
                            top: '5px',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: accent,
                            border: `2px solid ${theme.backgroundColor}`,
                            boxShadow: `0 0 0 1px ${accent}`,
                          }}
                        />
                        {/* Date badge */}
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: `calc(${fontSize} * 0.72)`,
                            fontWeight: 600,
                            color: accent,
                            backgroundColor: `${accent}10`,
                            padding: '1px 8px',
                            borderRadius: '3px',
                            marginBottom: '3px',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {formatDateRange(exp.dateRange)}
                        </span>
                        <h3
                          style={{
                            fontWeight: 700,
                            fontSize: `calc(${fontSize} * 1)`,
                            color: '#0f172a',
                            margin: '1px 0 0',
                          }}
                        >
                          {exp.position}
                        </h3>
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
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {education.map((edu) => (
                      <div
                        key={edu.id}
                        style={{
                          border: `1px solid ${accent}15`,
                          borderRadius: '5px',
                          padding: '6px 10px',
                          flex: '1 1 45%',
                          minWidth: '180px',
                          boxSizing: 'border-box',
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
                </div>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        style={{
                          border: `1px solid ${accent}15`,
                          borderRadius: '5px',
                          padding: '6px 10px',
                          flex: '1 1 45%',
                          minWidth: '180px',
                          boxSizing: 'border-box',
                          backgroundColor: `${accent}04`,
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
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skills.map((cat) => (
                      <div
                        key={cat.id}
                        style={{
                          border: `1px solid ${accent}15`,
                          borderRadius: '5px',
                          padding: '5px 10px',
                          flex: '1 1 30%',
                          minWidth: '130px',
                          boxSizing: 'border-box',
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
                                padding: '1px 6px',
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
                  <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {certifications.map((cert) => (
                      <div
                        key={cert.id}
                        style={{
                          border: `1px solid ${accent}15`,
                          borderRadius: '5px',
                          padding: '5px 10px',
                          flex: '1 1 45%',
                          minWidth: '180px',
                          boxSizing: 'border-box',
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
                </div>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {achievements.map((ach) => (
                      <div
                        key={ach.id}
                        style={{
                          border: `1px solid ${accent}20`,
                          borderRadius: '5px',
                          padding: '6px 10px',
                          flex: '1 1 45%',
                          minWidth: '180px',
                          boxSizing: 'border-box',
                          backgroundColor: `${accent}06`,
                          borderLeft: `3px solid ${accent}`,
                        }}
                      >
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>
                          {ach.title}
                        </span>
                        {ach.description && (
                          <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)`, margin: '2px 0 0' }}>
                            {ach.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
                    {languages.map((lang) => (
                      <span
                        key={lang.id}
                        style={{
                          fontSize: `calc(${fontSize} * 0.85)`,
                          color: '#374151',
                          backgroundColor: `${accent}06`,
                          padding: '2px 10px',
                          borderRadius: '3px',
                        }}
                      >
                        <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                        <span style={{ color: '#64748b' }}> — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                      </span>
                    ))}
                  </div>
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

            case 'awards':
              return awards.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {awards.map((award) => (
                      <div
                        key={award.id}
                        style={{
                          border: `1px solid ${accent}20`,
                          borderRadius: '5px',
                          padding: '5px 10px',
                          flex: '1 1 45%',
                          minWidth: '180px',
                          boxSizing: 'border-box',
                          borderLeft: `3px solid ${accent}`,
                        }}
                      >
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>
                          {award.title}
                        </span>
                        <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)`, margin: '1px 0 0' }}>
                          {award.issuer}{award.date ? ` \u00b7 ${formatMonthYear(award.date)}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  {publications.map((pub, i) => (
                    <div
                      key={pub.id}
                      style={{
                        marginBottom: i < publications.length - 1 ? '5px' : 0,
                        padding: '4px 8px',
                        backgroundColor: `${accent}04`,
                        borderRadius: '4px',
                      }}
                    >
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
                  {volunteer.map((vol, i) => (
                    <div
                      key={vol.id}
                      style={{
                        marginBottom: i < volunteer.length - 1 ? '6px' : 0,
                        padding: '4px 8px',
                        backgroundColor: `${accent}04`,
                        borderRadius: '4px',
                        borderLeft: `3px solid ${accent}30`,
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

            case 'references':
              return references.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {references.map((ref) => (
                      <div
                        key={ref.id}
                        style={{
                          border: `1px solid ${accent}15`,
                          borderRadius: '5px',
                          padding: '5px 10px',
                          flex: '1 1 45%',
                          minWidth: '160px',
                          boxSizing: 'border-box',
                        }}
                      >
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.88)`, margin: 0, color: '#0f172a' }}>
                          {ref.name}
                        </h3>
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.78)`, marginTop: '1px', marginBottom: 0 }}>
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
                  <SectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {customData.entries.map((entry) => (
                      <div
                        key={entry.id}
                        style={{
                          border: `1px solid ${accent}15`,
                          borderRadius: '5px',
                          padding: '5px 10px',
                          flex: '1 1 45%',
                          minWidth: '160px',
                          boxSizing: 'border-box',
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
            }

            default:
              return null
          }
        })}
      </div>
    </div>
  )
}

function SectionTitle({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <h2
      style={{
        fontSize: `calc(${fontSize} * 0.82)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#0f172a',
        marginBottom: '8px',
        paddingBottom: '4px',
        borderBottom: `2px solid ${accent}`,
        display: 'inline-block',
      }}
    >
      {label}
    </h2>
  )
}
