/**
 * Finance Template — Vault
 *
 * Concept: Inspired by the security and solidity of a bank vault. The
 * layout features masonry-style section blocks, each with a thick (4px)
 * solid accent top border, creating a bulletproof, institutional feel.
 * The header is compact and confident with a large bold name. A dark
 * accent footer strip anchors the bottom of the page with a compact
 * contact strip. The overall impression is one of strength, security,
 * and permanence.
 *
 * Target: Chief risk officers, audit partners, compliance directors,
 * governance professionals, financial controllers, insurance executives.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10px', md: '11px', lg: '12px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.75 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '18px' }

export default function FinanceVaultTemplate({ data, theme, sections }: TemplateProps) {
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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Vault Header ── */}
      <div
        style={{
          padding: '7mm 8mm 5mm',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          <div>
            <h1
              style={{
                fontSize: `calc(${fontSize} * 2.4)`,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#0f172a',
                margin: 0,
                lineHeight: 1,
              }}
            >
              {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
            </h1>
            {personal.headline && (
              <p style={{ fontSize: `calc(${fontSize} * 1)`, fontWeight: 500, color: accent, marginTop: '3px', marginBottom: 0, letterSpacing: '0.01em' }}>
                {personal.headline}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Summary Block ── */}
      {data.summary && (
        <div style={{ padding: '0 8mm 4mm' }}>
          <VaultBlock accent={accent} fontSize={fontSize}>
            <p style={{ lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.92)`, margin: 0 }}>
              {data.summary}
            </p>
          </VaultBlock>
        </div>
      )}

      {/* ── Body: Full-Width Vault Blocks ── */}
      <div style={{ padding: '0 8mm', flex: 1, display: 'flex', flexDirection: 'column', gap: gap }}>
        {visibleSections.map((section) => {
          switch (section.type) {
            case 'experience':
              return experience.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
                  {experience.map((exp, i) => (
                    <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.75)` : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                        <div>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.02)`, color: '#0f172a', margin: 0 }}>
                            {exp.position}
                          </h3>
                          <p style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 0.85)`, color: accent, marginTop: '1px', marginBottom: '3px' }}>
                            {exp.company}{exp.location ? ` \u2014 ${exp.location}` : ''}
                          </p>
                        </div>
                        <span style={{ fontSize: `calc(${fontSize} * 0.76)`, color: '#94a3b8', whiteSpace: 'nowrap' }}>
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
                </VaultBlock>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
                  {education.map((edu, i) => (
                    <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '5px' : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.95)`, margin: 0, color: '#0f172a' }}>
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
                </VaultBlock>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ minWidth: '160px', flex: 1 }}>
                        {cat.name && (
                          <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.82)`, color: '#0f172a', margin: 0, marginBottom: '2px' }}>
                            {cat.name}
                          </p>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                          {cat.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                fontSize: `calc(${fontSize} * 0.72)`,
                                color: '#475569',
                                border: `1px solid ${accent}20`,
                                padding: '1px 7px',
                                borderRadius: '2px',
                                backgroundColor: `${accent}04`,
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </VaultBlock>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {certifications.map((cert) => (
                      <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a' }}>{cert.name}</span>
                        <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.74)` }}>
                          {cert.issuer} &middot; {formatMonthYear(cert.date)}
                        </span>
                      </div>
                    ))}
                  </div>
                </VaultBlock>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
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
                </VaultBlock>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 16px' }}>
                    {languages.map((lang) => (
                      <span key={lang.id} style={{ fontSize: `calc(${fontSize} * 0.8)` }}>
                        <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                        <span style={{ color: '#64748b' }}> \u2014 {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                      </span>
                    ))}
                  </div>
                </VaultBlock>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
                  {achievements.map((ach, i) => (
                    <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '3px' : 0 }}>
                      <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a' }}>{ach.title}</span>
                      {ach.description && <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)` }}> \u2014 {ach.description}</span>}
                    </div>
                  ))}
                </VaultBlock>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
                  {awards.map((award, i) => (
                    <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '3px' : 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3px' }}>
                      <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.82)`, color: '#0f172a' }}>{award.title}</span>
                      <span style={{ fontSize: `calc(${fontSize} * 0.7)`, color: '#94a3b8' }}>{award.issuer}{award.date ? ` \u00b7 ${formatMonthYear(award.date)}` : ''}</span>
                    </div>
                  ))}
                </VaultBlock>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
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
                </VaultBlock>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
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
                </VaultBlock>
              ) : null

            case 'references':
              return references.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
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
                </VaultBlock>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {interests.map((interest) => (
                      <span key={interest.id} style={{ fontSize: `calc(${fontSize} * 0.72)`, color: accent, border: `1px solid ${accent}20`, padding: '1px 8px', borderRadius: '2px' }}>
                        {interest.name}
                      </span>
                    ))}
                  </div>
                </VaultBlock>
              ) : null

            case 'custom': {
              const customId = section.customId
              const customData = customId ? custom[customId] : null
              if (!customData || customData.entries.length === 0) return null
              return (
                <VaultBlock key={section.id} accent={accent} fontSize={fontSize} label={section.label}>
                  {customData.entries.map((entry, i) => (
                    <div key={entry.id} style={{ marginBottom: i < customData.entries.length - 1 ? '3px' : 0 }}>
                      <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#0f172a' }}>{entry.title}</span>
                      {entry.subtitle && <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)` }}> \u2014 {entry.subtitle}</span>}
                    </div>
                  ))}
                </VaultBlock>
              )
            }

            default:
              return null
          }
        })}
      </div>

      {/* ── Footer Strip ── */}
      <div
        style={{
          backgroundColor: accent,
          padding: '3mm 8mm',
          marginTop: '5mm',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3px 16px',
          color: 'rgba(255,255,255,0.8)',
          fontSize: `calc(${fontSize} * 0.76)`,
          alignItems: 'center',
        }}
      >
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.location && <span>{personal.location}</span>}
        {personal.linkedin && <span>{personal.linkedin}</span>}
        {personal.website && <span>{personal.website}</span>}
      </div>
    </div>
  )
}

function VaultBlock({
  label,
  accent,
  fontSize,
  children,
}: {
  label?: string
  accent: string
  fontSize: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        borderTop: `4px solid ${accent}`,
        paddingTop: '4mm',
      }}
    >
      {label && (
        <h2
          style={{
            fontSize: `calc(${fontSize} * 0.75)`,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: accent,
            margin: 0,
            marginBottom: '4mm',
          }}
        >
          {label}
        </h2>
      )}
      {children}
    </div>
  )
}
