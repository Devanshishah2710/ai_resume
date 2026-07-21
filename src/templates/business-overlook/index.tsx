/**
 * Business Template — Overlook (Boardroom Profile)
 *
 * Concept: A top-dominant executive panel occupies ~30% of the page with a
 * dark accent background containing name, metric badges, and summary. The
 * panel features a subtle inset accent border at top. Below is a two-column
 * content area where left-column sections have a thick left accent bar and
 * right-column entries use subtle cards. A bottom accent band anchors the page.
 *
 * Target: CEOs, COOs, CFOs, executive directors, senior VPs.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'


export default function BusinessOverlookTemplate({ data, theme, sections }: TemplateProps) {
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

  const rightTypes = new Set(['education', 'skills', 'certifications', 'languages', 'interests', 'references'])
  const leftSections = visibleSections.filter((s) => !rightTypes.has(s.type) && s.type !== 'summary')
  const rightSections = visibleSections.filter((s) => rightTypes.has(s.type))

  // Compute metrics from data
  const totalYears = experience.reduce((acc, exp) => {
    const start = new Date(exp.dateRange.startDate)
    const end = exp.dateRange.current ? new Date() : exp.dateRange.endDate ? new Date(exp.dateRange.endDate) : new Date()
    return acc + (end.getFullYear() - start.getFullYear())
  }, 0)
  const metricExperiences = experience.length
  const metricCerts = certifications.length
  const metricAwards = awards.length
  const metrics = [
    { value: `${totalYears}+`, label: 'Years Exp' },
    ...(metricExperiences > 0 ? [{ value: metricExperiences.toString(), label: 'Roles' }] : []),
    ...(metricCerts > 0 ? [{ value: metricCerts.toString(), label: 'Certs' }] : []),
    ...(metricAwards > 0 ? [{ value: metricAwards.toString(), label: 'Awards' }] : []),
  ]

  return (
    <div
      style={{
        fontFamily: fontStack,
        fontSize,
        lineHeight,
        color: theme.textColor,
        backgroundColor: '#f7f5f2',
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
      }}
    >
      {/* Executive panel — dark accent background */}
      <div
        style={{
          backgroundColor: accent,
          color: '#ffffff',
          padding: '10mm 12mm 8mm',
          borderTop: '3px solid rgba(255,255,255,0.15)',
          position: 'relative',
        }}
      >
        {/* Corner accent square (top-right) */}
        <div style={{
          position: 'absolute',
          top: '6mm',
          right: '8mm',
          width: '12px',
          height: '12px',
          borderTop: '2px solid rgba(255,255,255,0.2)',
          borderRight: '2px solid rgba(255,255,255,0.2)',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1
              style={{
                fontSize: `calc(${fontSize} * 2.2)`,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#ffffff',
                margin: 0,
              }}
            >
              {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
            </h1>
            {personal.headline && (
              <p style={{ fontSize: `calc(${fontSize} * 1.05)`, fontWeight: 400, color: 'rgba(255,255,255,0.8)', marginTop: '3px', marginBottom: 0 }}>
                {personal.headline}
              </p>
            )}
          </div>
          <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.7)', fontSize: `calc(${fontSize} * 0.82)`, lineHeight: 1.6 }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </div>

        {/* Metric badges — filled style */}
        {metrics.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '7mm' }}>
            {metrics.map((m, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  padding: '3px 12px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <span style={{ display: 'block', fontWeight: 700, fontSize: `calc(${fontSize} * 1.2)`, lineHeight: 1.2, color: '#ffffff' }}>
                  {m.value}
                </span>
                <span style={{ display: 'block', fontSize: `calc(${fontSize} * 0.68)`, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Summary as highlighted callout */}
        {data.summary && (
          <div
            style={{
              marginTop: '6mm',
              borderLeft: '3px solid rgba(255,255,255,0.35)',
              paddingLeft: '10px',
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: `calc(${fontSize} * 0.9)`, lineHeight, margin: 0, fontStyle: 'italic' }}>
              {data.summary}
            </p>
          </div>
        )}
      </div>

      {/* Bottom two-column content */}
      <div style={{ padding: '7mm 12mm 8mm', display: 'flex', gap: '6mm', alignItems: 'flex-start' }}>
        {/* Left column — narrative */}
        <div style={{ flex: 1.3, minWidth: 0 }}>
          {leftSections.map((section) => {
            switch (section.type) {
              case 'experience':
                return experience.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {experience.map((exp, i) => (
                      <div key={exp.id} style={{
                        marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0,
                        borderLeft: `3px solid ${accent}20`,
                        paddingLeft: '10px',
                      }}>
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
                ) : null

              case 'projects':
                return projects.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {projects.map((proj, i) => (
                      <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '6px' : 0, padding: '4px 8px', backgroundColor: `${accent}04`, borderRadius: '4px', borderLeft: `3px solid ${accent}20` }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.9)`, margin: 0, color: accent }}>
                          {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                        </h3>
                        {proj.description && <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '2px', marginBottom: 0 }}>{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {achievements.map((ach, i) => (
                      <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '4px' : 0 }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>{ach.title}</span>
                        {ach.description && <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}> — {ach.description}</span>}
                      </div>
                    ))}
                  </div>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {awards.map((award, i) => (
                      <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '3px' : 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a' }}>{award.title}</span>
                        <span style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#94a3b8' }}>{award.issuer}{award.date ? ` \u00b7 ${formatMonthYear(award.date)}` : ''}</span>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'publications':
                return publications.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {publications.map((pub, i) => (
                      <div key={pub.id} style={{ marginBottom: i < publications.length - 1 ? '4px' : 0 }}>
                        <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, margin: 0, color: '#0f172a' }}>
                          {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
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
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {volunteer.map((vol, i) => (
                      <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '5px' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.9)`, margin: 0, color: '#0f172a' }}>{vol.role}</h3>
                          <span style={{ fontSize: `calc(${fontSize} * 0.75)`, color: '#94a3b8' }}>{formatDateRange(vol.dateRange)}</span>
                        </div>
                        <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
                          {vol.organization}{vol.location ? ` \u2014 ${vol.location}` : ''}
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

        {/* Right column — supporting */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {rightSections.map((section) => {
            switch (section.type) {
              case 'education':
                return education.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {education.map((edu, i) => (
                      <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '6px' : 0, padding: '4px 8px', backgroundColor: `${accent}04`, borderRadius: '4px', borderLeft: `3px solid ${accent}15` }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.92)`, margin: 0, color: '#0f172a' }}>{edu.institution}</h3>
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px', marginBottom: 0 }}>
                          {[edu.degree, edu.field].filter(Boolean).join(' in ')}{edu.gpa ? ` \u2014 GPA: ${edu.gpa}` : ''}
                        </p>
                        <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.72)`, marginTop: '1px', marginBottom: 0 }}>{formatDateRange(edu.dateRange)}</p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'skills':
                return skills.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ marginBottom: '5px', padding: '3px 8px', backgroundColor: `${accent}04`, borderRadius: '4px' }}>
                        {cat.name && <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a', margin: 0, marginBottom: '2px' }}>{cat.name}</p>}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                          {cat.skills.map((skill) => (
                            <span key={skill} style={{ fontSize: `calc(${fontSize} * 0.75)`, color: '#374151', border: `1px solid ${accent}15`, padding: '1px 7px', borderRadius: '3px', backgroundColor: '#ffffff' }}>
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
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {certifications.map((cert, i) => (
                      <div key={cert.id} style={{ marginBottom: i < certifications.length - 1 ? '4px' : 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', padding: '3px 8px', backgroundColor: `${accent}04`, borderRadius: '4px', borderLeft: `3px solid ${accent}15` }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.82)`, color: '#0f172a' }}>{cert.name}</span>
                        <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.75)` }}>{cert.issuer} &middot; {formatMonthYear(cert.date)}</span>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'languages':
                return languages.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {languages.map((lang) => (
                        <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 8px', backgroundColor: `${accent}04`, borderRadius: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.82)`, color: '#0f172a' }}>{lang.language}</span>
                          <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.75)` }}>{LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {interests.map((interest) => (
                        <span key={interest.id} style={{ fontSize: `calc(${fontSize} * 0.75)`, color: accent, border: `1px solid ${accent}20`, padding: '2px 8px', borderRadius: '3px' }}>
                          {interest.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null

              case 'references':
                return references.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {references.map((ref, i) => (
                      <div key={ref.id} style={{ marginBottom: i < references.length - 1 ? '4px' : 0, padding: '3px 8px', backgroundColor: `${accent}04`, borderRadius: '4px' }}>
                        <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.82)`, margin: 0, color: '#0f172a' }}>{ref.name}</p>
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.75)`, margin: 0 }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
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

      {/* Custom sections */}
      {visibleSections
        .filter((s) => s.type === 'custom')
        .map((section) => {
          const customId = section.customId
          const customData = customId ? custom[customId] : null
          if (!customData || customData.entries.length === 0) return null
          return (
            <div key={section.id} style={{ padding: '0 12mm 8mm' }}>
              <PanelTitle label={section.label} accent={accent} fontSize={fontSize} />
              {customData.entries.map((entry, i) => (
                <div key={entry.id} style={{ marginBottom: i < customData.entries.length - 1 ? '4px' : 0 }}>
                  <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>{entry.title}</span>
                  {entry.subtitle && <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}> — {entry.subtitle}</span>}
                </div>
              ))}
            </div>
          )
        })}

      {/* Bottom accent band */}
      <div style={{ height: '3px', backgroundColor: accent }} />
    </div>
  )
}

function PanelTitle({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <h2
      style={{
        fontSize: `calc(${fontSize} * 0.78)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: accent,
        marginBottom: '6px',
        paddingBottom: '3px',
        borderBottom: `2px solid ${accent}15`,
      }}
    >
      {label}
    </h2>
  )
}
