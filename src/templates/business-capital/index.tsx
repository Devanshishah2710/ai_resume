/**
 * Business Template — Capital
 *
 * Concept: Editorial drop-cap initials. Each section heading is introduced by
 * a large accent-colored initial letter (the first character of the section
 * label), with the remaining letters rendered in small uppercase beside it.
 * The header uses a two-end layout — bold name on the left, contact compact
 * on the right. The body is a clean single column with generous line height.
 *
 * Target: VPs of strategy, directors of communications, editorial directors.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10.5px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.6, relaxed: 1.8 }
const SPACING_MAP = { compact: '12px', normal: '16px', spacious: '22px' }

export default function BusinessCapitalTemplate({ data, theme, sections }: TemplateProps) {
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
        padding: '10mm 12mm',
        boxSizing: 'border-box',
      }}
    >
      {/* Two-end header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: `calc(${gap} * 1.4)`,
          paddingBottom: '10px',
          borderBottom: `1px solid ${accent}20`,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: `calc(${fontSize} * 2.2)`,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#0f172a',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
          </h1>
          {personal.headline && (
            <p style={{ fontSize: `calc(${fontSize} * 1)`, fontWeight: 400, color: accent, marginTop: '4px', marginBottom: 0, fontStyle: 'italic' }}>
              {personal.headline}
            </p>
          )}
        </div>
        <div
          style={{
            textAlign: 'right',
            color: '#64748b',
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

      {/* Body */}
      {visibleSections.map((section) => {
        const firstLetter = section.label.charAt(0).toUpperCase()
        const restLabel = section.label.slice(1).toUpperCase()

        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                <p
                  style={{
                    lineHeight,
                    color: '#374151',
                    fontSize: `calc(${fontSize} * 0.95)`,
                    margin: 0,
                    borderLeft: `2px solid ${accent}25`,
                    paddingLeft: '12px',
                  }}
                >
                  {data.summary}
                </p>
              </div>
            ) : null

          case 'experience':
            return experience.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                {experience.map((exp, i) => (
                  <div
                    key={exp.id}
                    style={{
                      marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0,
                      paddingLeft: '14px',
                      borderLeft: `1px solid ${accent}15`,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.08)`, color: '#0f172a', margin: 0 }}>
                        {exp.position}
                      </h3>
                      <span style={{ fontSize: `calc(${fontSize} * 0.78)`, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                        {formatDateRange(exp.dateRange)}
                      </span>
                    </div>
                    <p style={{ fontStyle: 'italic', fontWeight: 500, fontSize: `calc(${fontSize} * 0.88)`, color: accent, marginTop: '1px', marginBottom: '3px' }}>
                      {exp.company}{exp.location ? `, ${exp.location}` : ''}
                    </p>
                    {exp.description && (
                      <div
                        style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.9)` }}
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
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                {education.map((edu, i) => (
                  <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '7px' : 0 }}>
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
            ) : null

          case 'projects':
            return projects.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                {projects.map((proj, i) => (
                  <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '7px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.92)`, margin: 0, color: accent }}>
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
                      <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.85)`, marginTop: '2px', marginBottom: 0 }}>
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : null

          case 'skills':
            return skills.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {cat.name && (
                        <span style={{ fontWeight: 700, minWidth: '110px', color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)` }}>
                          {cat.name}:
                        </span>
                      )}
                      <span style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.85)` }}>
                        {cat.skills.join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'certifications':
            return certifications.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                {certifications.map((cert, i) => (
                  <div key={cert.id} style={{ marginBottom: i < certifications.length - 1 ? '4px' : 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>{cert.name}</span>
                    <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)` }}>
                      {cert.issuer} &middot; {formatMonthYear(cert.date)}
                    </span>
                  </div>
                ))}
              </div>
            ) : null

          case 'languages':
            return languages.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px' }}>
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
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {interests.map((interest) => (
                    <span
                      key={interest.id}
                      style={{
                        fontSize: `calc(${fontSize} * 0.82)`,
                        color: accent,
                        border: `1px solid ${accent}25`,
                        padding: '2px 12px',
                        borderRadius: '2px',
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
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
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
            ) : null

          case 'awards':
            return awards.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                {awards.map((award, i) => (
                  <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '4px' : 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>{award.title}</span>
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
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
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
            ) : null

          case 'volunteer':
            return volunteer.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                {volunteer.map((vol, i) => (
                  <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '5px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.92)`, margin: 0, color: '#0f172a' }}>
                        {vol.role}
                      </h3>
                      <span style={{ fontSize: `calc(${fontSize} * 0.75)`, color: '#94a3b8' }}>
                        {formatDateRange(vol.dateRange)}
                      </span>
                    </div>
                    <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0, fontStyle: 'italic' }}>
                      {vol.organization}{vol.location ? `, ${vol.location}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            ) : null

          case 'references':
            return references.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
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
              <div key={section.id} style={{ marginBottom: gap }}>
                <div style={{ marginBottom: '8px' }}>
                  <DropCap initial={firstLetter} rest={restLabel} accent={accent} fontSize={fontSize} />
                </div>
                {customData.entries.map((entry, i) => (
                  <div key={entry.id} style={{ marginBottom: i < customData.entries.length - 1 ? '4px' : 0 }}>
                    <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>{entry.title}</span>
                    {entry.subtitle && <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}> — {entry.subtitle}</span>}
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
  )
}

function DropCap({ initial, rest, accent, fontSize }: { initial: string; rest: string; accent: string; fontSize: string }) {
  return (
    <h2 style={{ margin: 0, lineHeight: 1 }}>
      <span
        style={{
          fontSize: `calc(${fontSize} * 2.4)`,
          fontWeight: 700,
          color: accent,
          float: 'left',
          lineHeight: 0.85,
          marginRight: '4px',
          marginTop: '2px',
        }}
      >
        {initial}
      </span>
      <span
        style={{
          fontSize: `calc(${fontSize} * 0.82)`,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#0f172a',
          display: 'inline',
          verticalAlign: 'bottom',
          lineHeight: 1.8,
        }}
      >
        {rest}
      </span>
    </h2>
  )
}
