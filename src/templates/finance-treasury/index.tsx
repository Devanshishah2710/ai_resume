/**
 * Finance Template — Treasury
 *
 * Concept: Inspired by a treasury bond document. The layout uses a narrow
 * (15%) left margin column acting as "covenant notes" or "coupon dates" —
 * it holds section labels, dates, and short context items. The main content
 * flows freely on the right. Hairline-thin dividers between sections mimic
 * the precision of a treasury term sheet. The header is a formal bond-style
 * title block with the name and role as issuer/obligor, followed by
 * "issue details" (contact) in a compact grid.
 *
 * Target: Treasurers, corporate finance directors, risk managers, capital
 * markets professionals, debt finance specialists.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '12px', md: '13px', lg: '14px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.75 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '18px' }

const MARGIN_WIDTH = '15%'

export default function FinanceTreasuryTemplate({ data, theme, sections }: TemplateProps) {
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
        padding: '7mm 8mm',
      }}
    >
      {/* ── Bond Title Block ── */}
      <div
        style={{
          borderBottom: `2px solid ${accent}`,
          paddingBottom: '4mm',
          marginBottom: '5mm',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '4px' }}>
          <div>
            <div style={{ fontSize: `calc(${fontSize} * 0.62)`, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: accent, marginBottom: '2px' }}>
              Issuer
            </div>
            <h1
              style={{
                fontSize: `calc(${fontSize} * 2.2)`,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: '#0f172a',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
            </h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            {personal.headline && (
              <p style={{ fontSize: `calc(${fontSize} * 1)`, fontWeight: 400, color: accent, margin: 0, letterSpacing: '0.01em' }}>
                {personal.headline}
              </p>
            )}
          </div>
        </div>
        {/* Issue Details (Contact) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2px 18px',
            marginTop: '3mm',
            fontSize: `calc(${fontSize} * 0.76)`,
            color: '#475569',
          }}
        >
          <span style={{ fontWeight: 600, color: '#64748b' }}>Issue Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
          {personal.email && <span>Email: {personal.email}</span>}
          {personal.phone && <span>Phone: {personal.phone}</span>}
          {personal.location && <span>Location: {personal.location}</span>}
          {personal.linkedin && <span>LinkedIn: {personal.linkedin}</span>}
          {personal.website && <span>Web: {personal.website}</span>}
        </div>
      </div>

      {/* ── Body: Margin-Content Layout ── */}
      <div style={{ display: 'flex', gap: '4mm' }}>
        {/* Left Margin Column — dates, section anchors */}
        <div style={{ width: MARGIN_WIDTH, minWidth: 0, display: 'flex', flexDirection: 'column', gap: gap }}>
          {/* Summary gets a margin label */}
          {data.summary && (
            <div style={{ borderTop: `1px solid ${accent}12`, paddingTop: '4px' }}>
              <MarginLabel label="Profile" accent={accent} fontSize={fontSize} />
            </div>
          )}
          {visibleSections.map((section) => {
            switch (section.type) {
              case 'experience':
                return (
                  <div key={section.id} style={{ borderTop: `1px solid ${accent}12`, paddingTop: '4px' }}>
                    <MarginLabel label={section.label} accent={accent} fontSize={fontSize} />
                  </div>
                )
              case 'education':
              case 'projects':
              case 'skills':
              case 'certifications':
              case 'languages':
              case 'achievements':
              case 'awards':
              case 'publications':
              case 'volunteer':
              case 'references':
              case 'interests':
                return (
                  <div key={section.id} style={{ borderTop: `1px solid ${accent}12`, paddingTop: '4px' }}>
                    <MarginLabel label={section.label} accent={accent} fontSize={fontSize} />
                  </div>
                )
              case 'custom':
                return (
                  <div key={section.id} style={{ borderTop: `1px solid ${accent}12`, paddingTop: '4px' }}>
                    <MarginLabel label={section.label} accent={accent} fontSize={fontSize} />
                  </div>
                )
              default:
                return null
            }
          })}
        </div>

        {/* Right Main Content Column */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: gap }}>
          {data.summary && (
            <p style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.92)`, margin: 0 }}>
              {data.summary}
            </p>
          )}

          {visibleSections.map((section) => {
            switch (section.type) {
              case 'experience':
                return experience.length > 0 ? (
                  <div key={section.id}>
                    {experience.map((exp, i) => (
                      <div
                        key={exp.id}
                        style={{
                          marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.7)` : 0,
                          borderBottom: i < experience.length - 1 ? `0.5px solid ${accent}10` : 'none',
                          paddingBottom: i < experience.length - 1 ? `calc(${gap} * 0.5)` : 0,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                          <div>
                            <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1)`, color: '#0f172a', margin: 0 }}>
                              {exp.position}
                            </h3>
                            <p style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 0.85)`, color: accent, marginTop: '1px', marginBottom: '3px' }}>
                              {exp.company}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: `calc(${fontSize} * 0.74)`, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                              {formatDateRange(exp.dateRange)}
                            </span>
                            {exp.location && (
                              <span style={{ display: 'block', fontSize: `calc(${fontSize} * 0.7)`, color: '#94a3b8' }}>
                                {exp.location}
                              </span>
                            )}
                          </div>
                        </div>
                        {exp.description && (
                          <div
                            style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.85)` }}
                            dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : null

              case 'education':
                return education.length > 0 ? (
                  <div key={section.id}>
                    {education.map((edu, i) => (
                      <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '5px' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.92)`, margin: 0, color: '#0f172a' }}>
                            {edu.institution}
                          </h3>
                          <span style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#94a3b8' }}>
                            {formatDateRange(edu.dateRange)}
                          </span>
                        </div>
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.8)`, marginTop: '1px', marginBottom: 0 }}>
                          {[edu.degree, edu.field].filter(Boolean).join(' in ')}
                          {edu.gpa ? ` \u2014 GPA: ${edu.gpa}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'projects':
                return projects.length > 0 ? (
                  <div key={section.id}>
                    {projects.map((proj, i) => (
                      <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '5px' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.88)`, margin: 0, color: accent }}>
                            {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                          </h3>
                          {proj.dateRange && <span style={{ fontSize: `calc(${fontSize} * 0.7)`, color: '#94a3b8' }}>{formatDateRange(proj.dateRange)}</span>}
                        </div>
                        {proj.description && <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.78)`, marginTop: '2px', marginBottom: 0 }}>{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                ) : null

              case 'skills':
                return skills.length > 0 ? (
                  <div key={section.id}>
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ marginBottom: '5px' }}>
                        {cat.name && (
                          <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.82)`, color: '#0f172a', margin: 0, marginBottom: '2px' }}>
                            {cat.name}
                          </p>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                          {cat.skills.map((skill) => (
                            <span key={skill} style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#475569', border: `0.5px solid ${accent}25`, padding: '1px 6px', borderRadius: '1px' }}>
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
                  <div key={section.id}>
                    {certifications.map((cert, i) => (
                      <div key={cert.id} style={{ marginBottom: i < certifications.length - 1 ? '3px' : 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a' }}>{cert.name}</span>
                        <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.72)` }}>
                          {cert.issuer} &middot; {formatMonthYear(cert.date)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'languages':
                return languages.length > 0 ? (
                  <div key={section.id}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 16px' }}>
                      {languages.map((lang) => (
                        <span key={lang.id} style={{ fontSize: `calc(${fontSize} * 0.78)` }}>
                          <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                          <span style={{ color: '#64748b' }}> \u2014 {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <div key={section.id}>
                    {achievements.map((ach, i) => (
                      <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '3px' : 0 }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a' }}>{ach.title}</span>
                        {ach.description && <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)` }}> \u2014 {ach.description}</span>}
                      </div>
                    ))}
                  </div>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <div key={section.id}>
                    {awards.map((award, i) => (
                      <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '3px' : 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.82)`, color: '#0f172a' }}>{award.title}</span>
                        <span style={{ fontSize: `calc(${fontSize} * 0.7)`, color: '#94a3b8' }}>{award.issuer}{award.date ? ` \u00b7 ${formatMonthYear(award.date)}` : ''}</span>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'publications':
                return publications.length > 0 ? (
                  <div key={section.id}>
                    {publications.map((pub, i) => (
                      <div key={pub.id} style={{ marginBottom: i < publications.length - 1 ? '3px' : 0 }}>
                        <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, margin: 0, color: '#0f172a' }}>
                          {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                        </p>
                        <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.72)`, marginTop: '1px', marginBottom: 0 }}>
                          {pub.publisher}{pub.date ? ` \u00b7 ${formatMonthYear(pub.date)}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <div key={section.id}>
                    {volunteer.map((vol, i) => (
                      <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '4px' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.85)`, margin: 0, color: '#0f172a' }}>{vol.role}</h3>
                          <span style={{ fontSize: `calc(${fontSize} * 0.7)`, color: '#94a3b8' }}>{formatDateRange(vol.dateRange)}</span>
                        </div>
                        <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.76)`, marginTop: '1px', marginBottom: 0 }}>
                          {vol.organization}{vol.location ? ` \u2014 ${vol.location}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'references':
                return references.length > 0 ? (
                  <div key={section.id}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
                      {references.map((ref) => (
                        <div key={ref.id}>
                          <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.82)`, margin: 0, color: '#0f172a' }}>{ref.name}</p>
                          <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.72)`, margin: 0 }}>
                            {[ref.position, ref.company].filter(Boolean).join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <div key={section.id}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {interests.map((interest) => (
                        <span key={interest.id} style={{ fontSize: `calc(${fontSize} * 0.72)`, color: accent, border: `0.5px solid ${accent}25`, padding: '1px 8px', borderRadius: '1px' }}>
                          {interest.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null

              case 'custom': {
                const customId = section.customId
                const customData = customId ? custom[customId] : null
                if (!customData || customData.entries.length === 0) return null
                return (
                  <div key={section.id}>
                    {customData.entries.map((entry, i) => (
                      <div key={entry.id} style={{ marginBottom: i < customData.entries.length - 1 ? '3px' : 0 }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a' }}>{entry.title}</span>
                        {entry.subtitle && <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)` }}> \u2014 {entry.subtitle}</span>}
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
    </div>
  )
}

function MarginLabel({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <h2
      style={{
        fontSize: `calc(${fontSize} * 0.62)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: accent,
        margin: 0,
        opacity: 0.8,
      }}
    >
      {label}
    </h2>
  )
}
