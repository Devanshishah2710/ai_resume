/**
 * Finance Template — Ledger
 *
 * Concept: A balance-sheet-inspired layout dividing the page into three
 * horizontal bands. The top band is a thin, dark-accented header strip with
 * name and contact floated opposite. The middle band is a 2:1 left-heavy
 * column split (experience/education/projects on the left, skills/certs/
 * languages on the right). The bottom band is a footer with achievements
 * and awards presented as compact line items — like footnotes to a
 * financial statement. Skill categories are visualized as proportional
 * "asset allocation" bars.
 *
 * Target: CFOs, finance directors, FP&A leaders, accounting executives.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'


export default function FinanceLedgerTemplate({ data, theme, sections }: TemplateProps) {
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

  const rightTypes = new Set(['skills', 'certifications', 'languages', 'interests'])
  const leftSections = visibleSections.filter((s) => !rightTypes.has(s.type) && s.type !== 'achievements' && s.type !== 'awards' && s.type !== 'references')
  const rightSections = visibleSections.filter((s) => rightTypes.has(s.type))
  const footerSections = visibleSections.filter((s) => s.type === 'achievements' || s.type === 'awards' || s.type === 'references')

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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Top Band: Accent Header Strip ── */}
      <div
        style={{
          backgroundColor: accent,
          padding: '5mm 8mm',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '4px',
        }}
      >
        <h1
          style={{
            fontSize: `calc(${fontSize} * 2)`,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px 12px', color: 'rgba(255,255,255,0.75)', fontSize: `calc(${fontSize} * 0.78)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>
      {personal.headline && (
        <div style={{ padding: '2mm 8mm', backgroundColor: `${accent}08`, borderBottom: `1px solid ${accent}15` }}>
          <p style={{ fontSize: `calc(${fontSize} * 0.95)`, fontWeight: 400, color: accent, margin: 0, letterSpacing: '0.01em' }}>
            {personal.headline}
          </p>
        </div>
      )}

      {/* ── Middle Band: 2:1 Column Split ── */}
      <div style={{ display: 'flex', flex: 1, padding: '5mm 8mm', gap: '5mm' }}>
        {/* Left Column (2/3) */}
        <div style={{ flex: 2, minWidth: 0 }}>
          {data.summary && (
            <div style={{ marginBottom: gap, borderBottom: `1px solid ${accent}10`, paddingBottom: '4px' }}>
              <p style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.92)`, margin: 0 }}>
                {data.summary}
              </p>
            </div>
          )}

          {leftSections.map((section) => {
            switch (section.type) {
              case 'experience':
                return experience.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <LedgerSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {experience.map((exp, i) => (
                      <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.7)` : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                          <div>
                            <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1)`, color: '#0f172a', margin: 0 }}>
                              {exp.position}
                            </h3>
                            <p style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 0.85)`, color: accent, marginTop: '1px', marginBottom: '3px' }}>
                              {exp.company}{exp.location ? ` \u2014 ${exp.location}` : ''}
                            </p>
                          </div>
                          <span style={{ fontSize: `calc(${fontSize} * 0.76)`, color: '#94a3b8', whiteSpace: 'nowrap', backgroundColor: `${accent}08`, padding: '1px 6px', borderRadius: '2px' }}>
                            {formatDateRange(exp.dateRange)}
                          </span>
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
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <LedgerSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {education.map((edu, i) => (
                      <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '5px' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.92)`, margin: 0, color: '#0f172a' }}>
                            {edu.institution}
                          </h3>
                          <span style={{ fontSize: `calc(${fontSize} * 0.74)`, color: '#94a3b8' }}>
                            {formatDateRange(edu.dateRange)}
                          </span>
                        </div>
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
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
                    <LedgerSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {projects.map((proj, i) => (
                      <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '5px' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.88)`, margin: 0, color: accent }}>
                            {proj.url ? (
                              <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a>
                            ) : proj.name}
                          </h3>
                          {proj.dateRange && (
                            <span style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#94a3b8' }}>
                              {formatDateRange(proj.dateRange)}
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.8)`, marginTop: '2px', marginBottom: 0 }}>
                            {proj.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null

              case 'publications':
                return publications.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <LedgerSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {publications.map((pub, i) => (
                      <div key={pub.id} style={{ marginBottom: i < publications.length - 1 ? '3px' : 0 }}>
                        <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, margin: 0, color: '#0f172a' }}>
                          {pub.url ? (
                            <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a>
                          ) : pub.title}
                        </p>
                        <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.75)`, marginTop: '1px', marginBottom: 0 }}>
                          {pub.publisher}{pub.date ? ` \u00b7 ${formatMonthYear(pub.date)}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <LedgerSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {volunteer.map((vol, i) => (
                      <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '4px' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.85)`, margin: 0, color: '#0f172a' }}>{vol.role}</h3>
                          <span style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#94a3b8' }}>{formatDateRange(vol.dateRange)}</span>
                        </div>
                        <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.78)`, marginTop: '1px', marginBottom: 0 }}>
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
                    <LedgerSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {customData.entries.map((entry, i) => (
                      <div key={entry.id} style={{ marginBottom: i < customData.entries.length - 1 ? '3px' : 0 }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a' }}>{entry.title}</span>
                        {entry.subtitle && <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.8)` }}> \u2014 {entry.subtitle}</span>}
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

        {/* Right Column (1/3) */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {rightSections.map((section) => {
            switch (section.type) {
              case 'skills':
                return skills.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <LedgerSideTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ marginBottom: '6px' }}>
                        {cat.name && (
                          <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.8)`, color: '#0f172a', margin: 0, marginBottom: '2px' }}>
                            {cat.name}
                          </p>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {cat.skills.map((skill, idx) => (
                            <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#374151', minWidth: '0', flex: 1 }}>
                                {skill}
                              </span>
                              <span
                                style={{
                                  height: '5px',
                                  flex: 1,
                                  maxWidth: '60px',
                                  backgroundColor: `${accent}12`,
                                  borderRadius: '2px',
                                  overflow: 'hidden',
                                }}
                              >
                                <span
                                  style={{
                                    display: 'block',
                                    height: '100%',
                                    width: `${Math.max(20, 100 - idx * 15)}%`,
                                    backgroundColor: accent,
                                    borderRadius: '2px',
                                  }}
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'certifications':
                return certifications.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <LedgerSideTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {certifications.map((cert) => (
                      <div key={cert.id} style={{ marginBottom: '4px', padding: '2px 6px', borderLeft: `2px solid ${accent}25` }}>
                        <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.78)`, margin: 0, color: '#0f172a' }}>
                          {cert.name}
                        </p>
                        <p style={{ fontSize: `calc(${fontSize} * 0.7)`, color: '#64748b', margin: 0 }}>
                          {cert.issuer} &middot; {formatMonthYear(cert.date)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'languages':
                return languages.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <LedgerSideTitle label={section.label} accent={accent} fontSize={fontSize} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {languages.map((lang) => (
                        <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: `calc(${fontSize} * 0.76)` }}>
                          <span style={{ fontWeight: 600, color: '#0f172a' }}>{lang.language}</span>
                          <span style={{ color: '#64748b' }}>{LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <LedgerSideTitle label={section.label} accent={accent} fontSize={fontSize} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                      {interests.map((interest) => (
                        <span
                          key={interest.id}
                          style={{
                            fontSize: `calc(${fontSize} * 0.7)`,
                            color: '#475569',
                            backgroundColor: `${accent}06`,
                            padding: '1px 6px',
                            borderRadius: '2px',
                          }}
                        >
                          {interest.name}
                        </span>
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

      {/* ── Footer Band: Compact Line Items ── */}
      {footerSections.length > 0 && (
        <div
          style={{
            padding: '3mm 8mm',
            borderTop: `1px solid ${accent}20`,
            backgroundColor: `${accent}04`,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px 8mm',
          }}
        >
          {footerSections.map((section) => {
            switch (section.type) {
              case 'achievements':
                return achievements.length > 0 ? (
                  <div key={section.id} style={{ flex: 1, minWidth: '120px' }}>
                    <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.68)`, textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, margin: 0, marginBottom: '2px' }}>
                      {section.label}
                    </p>
                    {achievements.map((ach, i) => (
                      <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '1px' : 0, fontSize: `calc(${fontSize} * 0.72)` }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{ach.title}</span>
                        {ach.description && <span style={{ color: '#64748b' }}> \u2014 {ach.description}</span>}
                      </div>
                    ))}
                  </div>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <div key={section.id} style={{ flex: 1, minWidth: '120px' }}>
                    <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.68)`, textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, margin: 0, marginBottom: '2px' }}>
                      {section.label}
                    </p>
                    {awards.map((award, i) => (
                      <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '1px' : 0, fontSize: `calc(${fontSize} * 0.72)` }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{award.title}</span>
                        <span style={{ color: '#64748b' }}> \u2014 {award.issuer}</span>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'references':
                return references.length > 0 ? (
                  <div key={section.id} style={{ flex: 1, minWidth: '120px' }}>
                    <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.68)`, textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, margin: 0, marginBottom: '2px' }}>
                      {section.label}
                    </p>
                    {references.map((ref, i) => (
                      <div key={ref.id} style={{ marginBottom: i < references.length - 1 ? '1px' : 0, fontSize: `calc(${fontSize} * 0.72)` }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{ref.name}</span>
                        <span style={{ color: '#64748b' }}> \u2014 {ref.position}, {ref.company}</span>
                      </div>
                    ))}
                  </div>
                ) : null

              default:
                return null
            }
          })}
        </div>
      )}
    </div>
  )
}

function LedgerSectionTitle({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '5px' }}>
      <h2 style={{ fontSize: `calc(${fontSize} * 0.78)`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, margin: 0 }}>
        {label}
      </h2>
      <span style={{ flex: 1, height: '1px', backgroundColor: `${accent}12` }} />
    </div>
  )
}

function LedgerSideTitle({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <h2 style={{ fontSize: `calc(${fontSize} * 0.68)`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent, margin: 0, marginBottom: '5px', paddingBottom: '2px', borderBottom: `1.5px solid ${accent}20` }}>
      {label}
    </h2>
  )
}
