/**
 * Finance Template — Equity
 *
 * Concept: Models the resume after an equity research report. The header
 * acts as a research note header — the name is the "company ticker", the
 * headline is the "rating" with a badge, and contact is the "price target"
 * data. Experience entries are presented as "company snapshots" with a
 * left accent border and the date as a bold "price" label. Section titles
 * use small caps with a subtle double-line divider, resembling the
 * headings on research reports.
 *
 * Target: Equity research analysts, investment analysts, asset managers,
 * hedge fund professionals, sell-side and buy-side analysts.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '12.5px', md: '13.5px', lg: '14.5px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.75 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '18px' }

export default function FinanceEquityTemplate({ data, theme, sections }: TemplateProps) {
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

  const initials = [personal.firstName, personal.lastName]
    .filter(Boolean)
    .map((n) => n.charAt(0).toUpperCase())
    .join('')

  return (
    <div
      style={{
        fontFamily: fontStack,
        fontSize,
        lineHeight,
        color: theme.textColor,
        backgroundColor: '#fcfaf7',
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        padding: '7mm 9mm',
      }}
    >
      {/* ── Research Header ── */}
      <div
        style={{
          borderBottom: `2px solid ${accent}`,
          paddingBottom: '3mm',
          marginBottom: '5mm',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Ticker symbol (initials) */}
            <span
              style={{
                backgroundColor: accent,
                color: '#ffffff',
                fontWeight: 700,
                fontSize: `calc(${fontSize} * 0.75)`,
                padding: '2px 5px',
                borderRadius: '2px',
                letterSpacing: '0.05em',
              }}
            >
              {initials || 'NA'}
            </span>
            <h1
              style={{
                fontSize: `calc(${fontSize} * 2)`,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#0f172a',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
            </h1>
          </div>
          {/* Rating Badge */}
          {personal.headline && (
            <span
              style={{
                backgroundColor: `${accent}12`,
                color: accent,
                fontWeight: 700,
                fontSize: `calc(${fontSize} * 0.7)`,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '2px 8px',
                borderRadius: '2px',
                border: `1px solid ${accent}25`,
              }}
            >
              {personal.headline.split(' ').slice(0, 3).join(' ')}
            </span>
          )}
        </div>

        {/* Price Target / Metrics row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2px 16px',
            marginTop: '2.5mm',
            fontSize: `calc(${fontSize} * 0.74)`,
            color: '#64748b',
            borderTop: `1px solid ${accent}10`,
            paddingTop: '2mm',
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {/* ── Summary as "Investment Thesis" ── */}
      {data.summary && (
        <div
          style={{
            marginBottom: gap,
            padding: '3mm 4mm',
            backgroundColor: `${accent}04`,
            borderLeft: `3px solid ${accent}30`,
          }}
        >
          <p style={{ fontSize: `calc(${fontSize} * 0.72)`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent, margin: 0, marginBottom: '2px' }}>
            Investment Thesis
          </p>
          <p style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.92)`, margin: 0, fontStyle: 'italic' }}>
            {data.summary}
          </p>
        </div>
      )}

      {/* ── Body ── */}
      {visibleSections.map((section) => {
        switch (section.type) {
          case 'experience':
            return experience.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                {experience.map((exp, i) => (
                  <div
                    key={exp.id}
                    style={{
                      marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.6)` : 0,
                      borderLeft: `3px solid ${accent}20`,
                      paddingLeft: '4mm',
                      paddingBottom: i < experience.length - 1 ? `calc(${gap} * 0.5)` : 0,
                      borderBottom: i < experience.length - 1 ? `0.5px solid ${accent}08` : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.02)`, color: '#0f172a', margin: 0 }}>
                          {exp.position}
                        </h3>
                        <p style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 0.85)`, color: accent, marginTop: '1px', marginBottom: '3px' }}>
                          {exp.company}{exp.location ? ` \u2014 ${exp.location}` : ''}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: `calc(${fontSize} * 0.72)`,
                          fontWeight: 600,
                          color: accent,
                          whiteSpace: 'nowrap',
                          backgroundColor: `${accent}06`,
                          padding: '1px 8px',
                          borderRadius: '2px',
                        }}
                      >
                        {formatDateRange(exp.dateRange)}
                      </span>
                    </div>
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

          case 'education':
            return education.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                {education.map((edu, i) => (
                  <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '5px' : 0, paddingLeft: '2px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.95)`, margin: 0, color: '#0f172a' }}>
                        {edu.institution}
                      </h3>
                      <span style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#94a3b8' }}>
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

          case 'skills':
            return skills.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                {skills.map((cat) => (
                  <div key={cat.id} style={{ marginBottom: '4px', display: 'flex', gap: '6px' }}>
                    {cat.name && (
                      <span style={{ fontWeight: 700, minWidth: '90px', fontSize: `calc(${fontSize} * 0.82)`, color: '#0f172a' }}>
                        {cat.name}:
                      </span>
                    )}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: `calc(${fontSize} * 0.74)`,
                            color: '#475569',
                            backgroundColor: `${accent}06`,
                            padding: '1px 7px',
                            borderRadius: '2px',
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
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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

          case 'projects':
            return projects.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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

          case 'languages':
            return languages.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 16px' }}>
                  {languages.map((lang) => (
                    <span key={lang.id} style={{ fontSize: `calc(${fontSize} * 0.8)` }}>
                      <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                      <span style={{ color: '#64748b' }}> \u2014 {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                    </span>
                  ))}
                </div>
              </div>
            ) : null

          case 'achievements':
            return achievements.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {interests.map((interest) => (
                    <span key={interest.id} style={{ fontSize: `calc(${fontSize} * 0.72)`, color: accent, border: `1px solid ${accent}20`, padding: '1px 8px', borderRadius: '2px' }}>
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
              <div key={section.id} style={{ marginBottom: gap }}>
                <EquitySectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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
  )
}

function EquitySectionTitle({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
      <h2
        style={{
          fontSize: `calc(${fontSize} * 0.7)`,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: accent,
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </h2>
      <span style={{ flex: 1, height: '0.5px', backgroundColor: `${accent}15` }} />
      <span style={{ flex: 1, height: '0.5px', backgroundColor: `${accent}08` }} />
    </div>
  )
}
