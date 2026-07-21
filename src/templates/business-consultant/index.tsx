/**
 * Business Template — Business Consultant
 *
 * Design: Slim dark sidebar (28%) containing contact, core competencies, and
 * certifications on a charcoal background with white text. The main content
 * area (72%) is clean white with section titles as thin uppercase labels with
 * a small colored dot. Summary rendered as a clean blockquote-style paragraph.
 *
 * Target audience: Management consultants, strategy advisors, analysts.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10px', md: '11px', lg: '12px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.75 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

const SIDEBAR_WIDTH = '28%'
const CONTENT_WIDTH = '72%'

export default function BusinessConsultantTemplate({ data, theme, sections }: TemplateProps) {
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
  const sidebarBg = theme.secondaryColor || '#1e293b'

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const sidebarSections = ['skills', 'certifications', 'languages', 'interests', 'references']
  const mainSections = visibleSections.filter((s) => !sidebarSections.includes(s.type))
  const sidebarVisible = visibleSections.filter((s) => sidebarSections.includes(s.type))

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
        display: 'flex',
        boxSizing: 'border-box',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: SIDEBAR_WIDTH,
          backgroundColor: sidebarBg,
          color: '#e2e8f0',
          padding: '8mm 5mm',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: gap,
        }}
      >
        {/* Avatar */}
        {theme.showAvatar && personal.avatarUrl && (
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <img
              src={personal.avatarUrl}
              alt="avatar"
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}` }}
            />
          </div>
        )}

        {/* Name in sidebar */}
        <div>
          <h1
            style={{
              fontSize: `calc(${fontSize} * 1.6)`,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            {personal.firstName}
          </h1>
          <h1
            style={{
              fontSize: `calc(${fontSize} * 1.6)`,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            {personal.lastName}
          </h1>
        </div>

        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 0.85)`, color: accent, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
            {personal.headline}
          </p>
        )}

        {/* Contact */}
        <div>
          <SidebarSectionTitle label="Contact" accent={accent} fontSize={fontSize} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: `calc(${fontSize} * 0.82)`, color: '#cbd5e1' }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.website && <div>{personal.website}</div>}
          </div>
        </div>

        {/* Sidebar sections */}
        {sidebarVisible.map((section) => {
          switch (section.type) {
            case 'skills':
              return skills.length > 0 ? (
                <div key={section.id}>
                  <SidebarSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ marginBottom: '5px' }}>
                      {cat.name && (
                        <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.82)`, color: '#ffffff', margin: 0, marginBottom: '2px' }}>
                          {cat.name}
                        </p>
                      )}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            style={{
                              fontSize: `calc(${fontSize} * 0.75)`,
                              color: '#e2e8f0',
                              backgroundColor: '#ffffff15',
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
                  <SidebarSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ marginBottom: '4px' }}>
                      <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.8)`, color: '#ffffff', margin: 0 }}>
                        {cert.name}
                      </p>
                      <p style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#94a3b8', margin: 0 }}>
                        {cert.issuer} &middot; {formatMonthYear(cert.date)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <div key={section.id}>
                  <SidebarSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ marginBottom: '3px' }}>
                      <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.8)`, color: '#ffffff' }}>
                        {lang.language}
                      </span>
                      <span style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#94a3b8' }}>
                        {' \u2014 '}{LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <div key={section.id}>
                  <SidebarSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {interests.map((interest) => (
                      <span
                        key={interest.id}
                        style={{
                          fontSize: `calc(${fontSize} * 0.75)`,
                          color: '#e2e8f0',
                          border: `1px solid #ffffff20`,
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

            case 'references':
              return references.length > 0 ? (
                <div key={section.id}>
                  <SidebarSectionTitle label={section.label} accent={accent} fontSize={fontSize} />
                  {references.map((ref) => (
                    <div key={ref.id} style={{ marginBottom: '5px' }}>
                      <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.8)`, color: '#ffffff', margin: 0 }}>
                        {ref.name}
                      </p>
                      <p style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#94a3b8', margin: 0 }}>
                        {ref.position}
                      </p>
                      <p style={{ fontSize: `calc(${fontSize} * 0.72)`, color: '#94a3b8', margin: 0 }}>
                        {ref.company}
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

      {/* Main content */}
      <div
        style={{
          width: CONTENT_WIDTH,
          padding: '8mm 8mm 8mm 6mm',
          boxSizing: 'border-box',
        }}
      >
        {mainSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <TitleDot label={section.label} accent={accent} fontSize={fontSize} />
                  <p
                    style={{
                      lineHeight,
                      color: '#374151',
                      fontSize: `calc(${fontSize} * 0.92)`,
                      fontStyle: 'normal',
                      borderLeft: `3px solid ${accent}30`,
                      paddingLeft: '10px',
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
                  <TitleDot label={section.label} accent={accent} fontSize={fontSize} />
                  {experience.map((exp, i) => (
                    <div
                      key={exp.id}
                      style={{
                        marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                        <div>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1)`, color: '#0f172a', margin: 0 }}>
                            {exp.position}
                          </h3>
                          <p style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 0.88)`, color: accent, marginTop: '1px', marginBottom: 0 }}>
                            {exp.company}{exp.location ? ` \u2014 ${exp.location}` : ''}
                          </p>
                        </div>
                        <span style={{ fontSize: `calc(${fontSize} * 0.78)`, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                          {formatDateRange(exp.dateRange)}
                        </span>
                      </div>
                      {exp.description && (
                        <div
                          style={{ marginTop: '4px', lineHeight, color: '#374151', fontSize: `calc(${fontSize} * 0.88)` }}
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
                  <TitleDot label={section.label} accent={accent} fontSize={fontSize} />
                  {education.map((edu, i) => (
                    <div
                      key={edu.id}
                      style={{
                        marginBottom: i < education.length - 1 ? '6px' : 0,
                      }}
                    >
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
                  <TitleDot label={section.label} accent={accent} fontSize={fontSize} />
                  {projects.map((proj, i) => (
                    <div
                      key={proj.id}
                      style={{
                        marginBottom: i < projects.length - 1 ? '7px' : 0,
                        padding: '5px 8px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '3px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.9)`, margin: 0, color: '#0f172a' }}>
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
                  <TitleDot label={section.label} accent={accent} fontSize={fontSize} />
                  {achievements.map((ach, i) => (
                    <div
                      key={ach.id}
                      style={{
                        marginBottom: i < achievements.length - 1 ? '5px' : 0,
                        display: 'flex',
                        gap: '6px',
                      }}
                    >
                      <span style={{ color: accent, fontSize: `calc(${fontSize} * 1)`, lineHeight: 1.2 }}>{'\u2022'}</span>
                      <div>
                        <span style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)`, color: '#0f172a' }}>
                          {ach.title}
                        </span>
                        {ach.description && (
                          <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>
                            {' \u2014 '}{ach.description}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <TitleDot label={section.label} accent={accent} fontSize={fontSize} />
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
                  <TitleDot label={section.label} accent={accent} fontSize={fontSize} />
                  {publications.map((pub, i) => (
                    <div key={pub.id} style={{ marginBottom: i < publications.length - 1 ? '5px' : 0 }}>
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
                  <TitleDot label={section.label} accent={accent} fontSize={fontSize} />
                  {volunteer.map((vol, i) => (
                    <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '6px' : 0 }}>
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
                  <TitleDot label={section.label} accent={accent} fontSize={fontSize} />
                  {customData.entries.map((entry, i) => (
                    <div key={entry.id} style={{ marginBottom: i < customData.entries.length - 1 ? '5px' : 0 }}>
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

function SidebarSectionTitle({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <h2
      style={{
        fontSize: `calc(${fontSize} * 0.72)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: accent,
        borderBottom: `1px solid ${accent}40`,
        paddingBottom: '4px',
        marginBottom: '6px',
        marginTop: 0,
      }}
    >
      {label}
    </h2>
  )
}

function TitleDot({ label, accent, fontSize }: { label: string; accent: string; fontSize: string }) {
  return (
    <h2
      style={{
        fontSize: `calc(${fontSize} * 0.82)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#0f172a',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: accent, borderRadius: '50%' }} />
      {label}
    </h2>
  )
}
