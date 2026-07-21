/**
 * Business Template — Executive Suite (Luxury Corporate)
 *
 * Concept: Right-aligned sidebar (28%) on a dark accent background. The page
 * rests on a warm ivory canvas with double-line executive framing, top/bottom
 * accent bars, and refined contact dividers. Section titles use a thick accent
 * left-border bar.
 *
 * Target: C-suite executives, presidents, board members.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '12px', md: '13px', lg: '14px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.75 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

const SIDEBAR_WIDTH = '28%'
const MAIN_WIDTH = '72%'

export default function BusinessExecutiveSuiteTemplate({ data, theme, sections }: TemplateProps) {
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

  const sidebarTypes = new Set(['skills', 'certifications', 'languages', 'interests'])
  const sidebarSections = visibleSections.filter((s) => sidebarTypes.has(s.type))
  const mainSections = visibleSections.filter((s) => !sidebarTypes.has(s.type))

  return (
    <div
      style={{
        fontFamily: fontStack,
        fontSize,
        lineHeight,
        color: theme.textColor,
        backgroundColor: '#faf7f2',
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        padding: '4mm',
      }}
    >
      {/* Top decorative accent bar */}
      <div style={{ height: '4px', backgroundColor: accent, borderRadius: '2px 2px 0 0' }} />

      {/* Double-line framed document */}
      <div
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'row-reverse',
          boxSizing: 'border-box',
          border: `1px solid ${accent}28`,
          outline: `1px solid ${accent}10`,
          outlineOffset: '-4px',
        }}
      >
        {/* Right sidebar */}
        <div
          style={{
            width: SIDEBAR_WIDTH,
            backgroundColor: accent,
            color: '#e2e8f0',
            padding: '8mm 5mm',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Decorative sidebar ribbon */}
          <div style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.18)', marginBottom: '2px', borderRadius: '1px' }} />

          {theme.showAvatar && personal.avatarUrl && (
            <div style={{ textAlign: 'center', marginBottom: '2px' }}>
              <img
                src={personal.avatarUrl}
                alt="avatar"
                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: `2px solid rgba(255,255,255,0.3)` }}
              />
            </div>
          )}

          {/* Contact in sidebar */}
          <div>
            <SidebarTitle label="Contact" fontSize={fontSize} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', fontSize: `calc(${fontSize} * 0.8)`, color: '#cbd5e1' }}>
              {personal.email && <ContactItem text={personal.email} />}
              {personal.phone && <ContactItem text={personal.phone} />}
              {personal.location && <ContactItem text={personal.location} />}
              {personal.linkedin && <ContactItem text={personal.linkedin} />}
              {personal.website && <ContactItem text={personal.website} />}
            </div>
          </div>

          {sidebarSections.map((section) => {
            switch (section.type) {
              case 'skills':
                return skills.length > 0 ? (
                  <div key={section.id}>
                    <SidebarTitle label={section.label} fontSize={fontSize} />
                    {skills.map((cat) => (
                      <div key={cat.id} style={{ marginBottom: '5px' }}>
                        {cat.name && (
                          <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.8)`, color: '#ffffff', margin: 0, marginBottom: '2px' }}>
                            {cat.name}
                          </p>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                          {cat.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                fontSize: `calc(${fontSize} * 0.72)`,
                                color: '#e2e8f0',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                padding: '1px 6px',
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
                  <div key={section.id}>
                    <SidebarTitle label={section.label} fontSize={fontSize} />
                    {certifications.map((cert) => (
                      <div key={cert.id} style={{ marginBottom: '4px' }}>
                        <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.78)`, color: '#ffffff', margin: 0 }}>
                          {cert.name}
                        </p>
                        <p style={{ fontSize: `calc(${fontSize} * 0.7)`, color: '#94a3b8', margin: 0 }}>
                          {cert.issuer} &middot; {formatMonthYear(cert.date)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'languages':
                return languages.length > 0 ? (
                  <div key={section.id}>
                    <SidebarTitle label={section.label} fontSize={fontSize} />
                    {languages.map((lang) => (
                      <div key={lang.id} style={{ marginBottom: '2px', fontSize: `calc(${fontSize} * 0.78)` }}>
                        <span style={{ fontWeight: 600, color: '#ffffff' }}>{lang.language}</span>
                        <span style={{ color: '#94a3b8' }}> — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                      </div>
                    ))}
                  </div>
                ) : null

              case 'interests':
                return interests.length > 0 ? (
                  <div key={section.id}>
                    <SidebarTitle label={section.label} fontSize={fontSize} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {interests.map((interest) => (
                        <span
                          key={interest.id}
                          style={{
                            fontSize: `calc(${fontSize} * 0.72)`,
                            color: '#e2e8f0',
                            border: '1px solid rgba(255,255,255,0.15)',
                            padding: '1px 7px',
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

        {/* Main content (left side) */}
        <div
          style={{
            width: MAIN_WIDTH,
            padding: '8mm 6mm 8mm 8mm',
            boxSizing: 'border-box',
          }}
        >
          {/* Name in main content */}
          <div style={{ marginBottom: `calc(${gap} * 0.6)` }}>
            <h1 style={{ fontSize: `calc(${fontSize} * 2.2)`, fontWeight: 700, color: '#0f172a', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
            </h1>
            {personal.headline && (
              <p style={{ fontSize: `calc(${fontSize} * 1)`, color: accent, fontWeight: 400, marginTop: '3px', marginBottom: 0 }}>
                {personal.headline}
              </p>
            )}
          </div>

          {mainSections.map((section) => {
            switch (section.type) {
              case 'summary':
                return data.summary ? (
                  <div
                    key={section.id}
                    style={{
                      marginBottom: gap,
                      backgroundColor: `${accent}06`,
                      borderLeft: `4px solid ${accent}`,
                      padding: '7px 12px',
                      borderRadius: '0 4px 4px 0',
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
                    <MainSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {experience.map((exp, i) => (
                      <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0 }}>
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

              case 'education':
                return education.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <MainSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {education.map((edu, i) => (
                      <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '6px' : 0 }}>
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
                    <MainSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          style={{
                            border: `1px solid ${accent}15`,
                            borderRadius: '4px',
                            padding: '5px 10px',
                            width: '100%',
                            boxSizing: 'border-box',
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
                  </div>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <MainSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {achievements.map((ach, i) => (
                      <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '4px' : 0 }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>
                          {ach.title}
                        </span>
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
                    <MainSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {awards.map((award, i) => (
                      <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '4px' : 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>
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
                    <MainSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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
                    <MainSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    {volunteer.map((vol, i) => (
                      <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '5px' : 0 }}>
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

              case 'references':
                return references.length > 0 ? (
                  <div key={section.id} style={{ marginBottom: gap }}>
                    <MainSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
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
                    <MainSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
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
      </div>

      {/* Bottom decorative accent bar */}
      <div style={{ height: '4px', backgroundColor: accent, borderRadius: '0 0 2px 2px' }} />
    </div>
  )
}

function ContactItem({ text }: { text: string }) {
  return (
    <div style={{ padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      {text}
    </div>
  )
}

function SidebarTitle({ label, fontSize }: { label: string; fontSize: string }) {
  return (
    <h2
      style={{
        fontSize: `calc(${fontSize} * 0.72)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.7)',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        paddingBottom: '3px',
        marginBottom: '5px',
        marginTop: 0,
      }}
    >
      {label}
    </h2>
  )
}

function MainSectionTitle({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '7px' }}>
      <span style={{ display: 'inline-block', width: '4px', height: '16px', backgroundColor: accent, borderRadius: '1px' }} />
      <h2 style={{ fontSize: `calc(${fontSize} * 0.82)`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent, margin: 0 }}>
        {label}
      </h2>
    </div>
  )
}
