/**
 * Modern Sidebar Template
 *
 * Compact left sidebar (contact, skills, languages, certifications) on a muted
 * accent background, with a spacious single-column content area on the right.
 * Modern tight spacing, professional accent, high readability.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '11px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.3, normal: 1.5, relaxed: 1.65 }
const SPACING_MAP = { compact: '10px', normal: '16px', spacious: '22px' }

export default function ModernSidebarTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor
  const accentSoft = `${accent}0f`

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const SIDEBAR_TYPES = new Set(['skills', 'languages', 'certifications', 'interests'])
  const sidebarSections = visibleSections.filter((s) => SIDEBAR_TYPES.has(s.type))
  const mainSections = visibleSections.filter((s) => !SIDEBAR_TYPES.has(s.type))

  const container: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize,
    lineHeight,
    color: theme.textColor,
    backgroundColor: theme.backgroundColor,
    width: '210mm',
    minHeight: '297mm',
    display: 'flex',
    boxSizing: 'border-box',
  }

  const sectionTitle = (color: string): React.CSSProperties => ({
    fontSize: `calc(${fontSize} * 0.95)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color,
    marginBottom: `calc(${gap} * 0.6)`,
  })

  return (
    <div style={container}>
      {/* Sidebar */}
      <aside style={{ width: '33%', backgroundColor: accentSoft, padding: '14mm 9mm', boxSizing: 'border-box', color: theme.textColor }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 1.5)`, fontWeight: 700, lineHeight: 1.15, color: accent }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 0.95)`, color: '#475569', marginTop: '4px', marginBottom: '14px' }}>{personal.headline}</p>
        )}

        <h2 style={sectionTitle(accent)}>Contact</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: gap }}>
          {personal.email && <SidebarLine icon="✉" value={personal.email} />}
          {personal.phone && <SidebarLine icon="☏" value={personal.phone} />}
          {personal.location && <SidebarLine icon="⌖" value={personal.location} />}
          {personal.linkedin && <SidebarLine icon="in" value={personal.linkedin} href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} />}
          {personal.github && <SidebarLine icon="gh" value={personal.github} href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} />}
          {personal.website && <SidebarLine icon="⬡" value={personal.website} href={personal.website} />}
        </div>

        {sidebarSections.map((section) => {
          switch (section.type) {
            case 'skills':
              return skills.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={sectionTitle(accent)}>Skills</h2>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ marginBottom: '8px' }}>
                      {cat.name && <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.9)`, marginBottom: '3px' }}>{cat.name}</p>}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {cat.skills.map((s, i) => (
                          <span key={i} style={{ fontSize: `calc(${fontSize} * 0.82)`, padding: '2px 8px', backgroundColor: '#fff', borderRadius: '4px', color: '#334155' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={sectionTitle(accent)}>Languages</h2>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ marginBottom: '4px' }}>
                      <strong>{lang.language}</strong> <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                    </div>
                  ))}
                </div>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={sectionTitle(accent)}>Certifications</h2>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ marginBottom: '6px' }}>
                      <p style={{ fontWeight: 600, lineHeight: 1.3 }}>{cert.name}</p>
                      <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
                    </div>
                  ))}
                </div>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={sectionTitle(accent)}>Interests</h2>
                  <p style={{ color: '#334155' }}>{interests.map((i) => i.name).join(' · ')}</p>
                </div>
              ) : null

            default:
              return null
          }
        })}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '14mm 13mm', boxSizing: 'border-box' }}>
        {mainSections.map((section) => {
          const titleStyle = sectionTitle(accent)
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <MainSection key={section.id} title="Profile" titleStyle={titleStyle} gap={gap}>
                  <p style={{ lineHeight, color: '#374151' }}>{data.summary}</p>
                </MainSection>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <MainSection key={section.id} title="Experience" titleStyle={titleStyle} gap={gap}>
                  {experience.map((exp, i) => (
                    <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.05)` }}>{exp.position || 'Position'}</h3>
                        <span style={{ color: accent, fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(exp.dateRange)}</span>
                      </div>
                      <p style={{ color: '#475569', fontWeight: 500, fontSize: `calc(${fontSize} * 0.95)` }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                      {exp.description && (
                        <div style={{ marginTop: '5px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                      )}
                    </div>
                  ))}
                </MainSection>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <MainSection key={section.id} title="Education" titleStyle={titleStyle} gap={gap}>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                      <div>
                        <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
                        <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                      </div>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(edu.dateRange)}</span>
                    </div>
                  ))}
                </MainSection>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <MainSection key={section.id} title="Projects" titleStyle={titleStyle} gap={gap}>
                  {projects.map((proj) => (
                    <div key={proj.id} style={{ marginBottom: '8px' }}>
                      <h3 style={{ fontWeight: 700 }}>
                        {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                        {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
                      </h3>
                      {proj.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
                    </div>
                  ))}
                </MainSection>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <MainSection key={section.id} title="Achievements" titleStyle={titleStyle} gap={gap}>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={{ marginBottom: '5px' }}>
                      <span style={{ fontWeight: 600 }}>{ach.title}</span>
                      {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
                      {ach.description && <p style={{ color: '#374151', marginTop: '2px' }}>{ach.description}</p>}
                    </div>
                  ))}
                </MainSection>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <MainSection key={section.id} title="Awards" titleStyle={titleStyle} gap={gap}>
                  {awards.map((award) => (
                    <div key={award.id} style={{ marginBottom: '5px' }}>
                      <span style={{ fontWeight: 600 }}>{award.title}</span>
                      <span style={{ color: '#64748b' }}> · {award.issuer}</span>
                      {award.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(award.date)}</span>}
                    </div>
                  ))}
                </MainSection>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <MainSection key={section.id} title="Publications" titleStyle={titleStyle} gap={gap}>
                  {publications.map((pub) => (
                    <div key={pub.id} style={{ marginBottom: '5px' }}>
                      <span style={{ fontWeight: 600 }}>
                        {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                      </span>
                      <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
                      {pub.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(pub.date)}</span>}
                    </div>
                  ))}
                </MainSection>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <MainSection key={section.id} title="Volunteer" titleStyle={titleStyle} gap={gap}>
                  {volunteer.map((vol) => (
                    <div key={vol.id} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700 }}>{vol.role}</h3>
                        <span style={{ color: accent, fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(vol.dateRange)}</span>
                      </div>
                      <p style={{ color: '#475569', fontWeight: 500 }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                      {vol.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{vol.description}</p>}
                    </div>
                  ))}
                </MainSection>
              ) : null

            default:
              return null
          }
        })}
      </main>
    </div>
  )
}

function MainSection({ title, titleStyle, gap, children }: { title: string; titleStyle: React.CSSProperties; gap: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: gap }}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  )
}

function SidebarLine({ icon, value, href }: { icon: string; value: string; href?: string }) {
  const inner = (
    <span style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', fontSize: 'inherit' }}>
      <span style={{ opacity: 0.55, fontSize: '10px', marginTop: '1px' }}>{icon}</span>
      <span style={{ wordBreak: 'break-all', lineHeight: 1.3 }}>{value}</span>
    </span>
  )
  if (href) return <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>{inner}</a>
  return inner
}
