/**
 * Modern Minimal Template
 *
 * Two-column layout:
 *   Left sidebar (30%): contact, skills, languages, certifications
 *   Right main (70%): summary, experience, education, projects
 *
 * Uses accent color for the sidebar background.
 * ATS note: Two-column HTML layouts are readable by modern ATS systems
 * when implemented as flexbox (not tables or CSS columns).
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'

const FONT_SIZE_MAP = { sm: '11px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.3, normal: 1.5, relaxed: 1.65 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function ModernMinimalTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  // Sections that go in the sidebar
  const SIDEBAR_TYPES = new Set(['skills', 'languages', 'certifications', 'interests'])
  const sidebarSections = visibleSections.filter((s) => SIDEBAR_TYPES.has(s.type))
  const mainSections = visibleSections.filter((s) => !SIDEBAR_TYPES.has(s.type))

  const sidebarBg = theme.primaryColor
  const sidebarText = '#ffffff'
  const sidebarMuted = 'rgba(255,255,255,0.75)'

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

  const sectionTitle = (color: string, borderColor: string): React.CSSProperties => ({
    fontSize: `calc(${fontSize} * 1.0)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color,
    borderBottom: `1px solid ${borderColor}`,
    paddingBottom: '4px',
    marginBottom: gap,
  })

  return (
    <div style={container}>
      {/* ── Sidebar ── */}
      <aside style={{ width: '32%', backgroundColor: sidebarBg, padding: '14mm 10mm', color: sidebarText, boxSizing: 'border-box' }}>
        {/* Avatar placeholder */}
        {theme.showAvatar && (
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: '12px', border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', color: 'rgba(255,255,255,0.7)',
          }}>
            {personal.firstName?.[0]?.toUpperCase() ?? '?'}
          </div>
        )}

        {/* Name in sidebar */}
        <h1 style={{ fontSize: `calc(${fontSize} * 1.6)`, fontWeight: 700, lineHeight: 1.2, color: sidebarText, marginBottom: '2px' }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 0.95)`, color: sidebarMuted, marginBottom: '14px', lineHeight: 1.3 }}>
            {personal.headline}
          </p>
        )}

        {/* Contact */}
        <div style={{ marginBottom: gap }}>
          <h2 style={sectionTitle(sidebarText, 'rgba(255,255,255,0.3)')}>Contact</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {personal.email && <SidebarContact icon="✉" value={personal.email} muted={sidebarMuted} text={sidebarText} />}
            {personal.phone && <SidebarContact icon="☏" value={personal.phone} muted={sidebarMuted} text={sidebarText} />}
            {personal.location && <SidebarContact icon="⌖" value={personal.location} muted={sidebarMuted} text={sidebarText} />}
            {personal.linkedin && <SidebarContact icon="in" value={personal.linkedin} href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} muted={sidebarMuted} text={sidebarText} />}
            {personal.github && <SidebarContact icon="gh" value={personal.github} href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} muted={sidebarMuted} text={sidebarText} />}
            {personal.website && <SidebarContact icon="⬡" value={personal.website} href={personal.website} muted={sidebarMuted} text={sidebarText} />}
          </div>
        </div>

        {/* Dynamic sidebar sections */}
        {sidebarSections.map((section) => {
          switch (section.type) {
            case 'skills':
              return skills.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={sectionTitle(sidebarText, 'rgba(255,255,255,0.3)')}>Skills</h2>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ marginBottom: '8px' }}>
                      {cat.name && <p style={{ fontWeight: 600, color: sidebarText, fontSize: `calc(${fontSize} * 0.9)`, marginBottom: '3px' }}>{cat.name}</p>}
                      <p style={{ color: sidebarMuted, lineHeight: 1.5 }}>{cat.skills.join(' · ')}</p>
                    </div>
                  ))}
                </div>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={sectionTitle(sidebarText, 'rgba(255,255,255,0.3)')}>Languages</h2>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: sidebarText }}>{lang.language}</span>
                      <br />
                      <span style={{ color: sidebarMuted, fontSize: `calc(${fontSize} * 0.88)` }}>
                        {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <div key={section.id} style={{ marginBottom: gap }}>
                  <h2 style={sectionTitle(sidebarText, 'rgba(255,255,255,0.3)')}>Certifications</h2>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ marginBottom: '6px' }}>
                      <p style={{ fontWeight: 600, color: sidebarText, lineHeight: 1.3 }}>{cert.name}</p>
                      <p style={{ color: sidebarMuted, fontSize: `calc(${fontSize} * 0.88)` }}>{cert.issuer}</p>
                      <p style={{ color: sidebarMuted, fontSize: `calc(${fontSize} * 0.85)` }}>{formatMonthYear(cert.date)}</p>
                    </div>
                  ))}
                </div>
              ) : null

            default:
              return null
          }
        })}
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, padding: '14mm 12mm', boxSizing: 'border-box' }}>
        {mainSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <MainSection key={section.id} title="Profile" titleStyle={sectionTitle(theme.primaryColor, theme.primaryColor)} gap={gap}>
                  <p style={{ lineHeight, color: '#475569' }}>{data.summary}</p>
                </MainSection>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <MainSection key={section.id} title="Experience" titleStyle={sectionTitle(theme.primaryColor, theme.primaryColor)} gap={gap}>
                  {experience.map((exp, i) => (
                    <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.05)`, color: theme.textColor }}>{exp.position || 'Position'}</h3>
                        <span style={{ color: theme.primaryColor, fontSize: `calc(${fontSize} * 0.9)`, fontWeight: 500 }}>{formatDateRange(exp.dateRange)}</span>
                      </div>
                      <p style={{ color: '#64748b', fontWeight: 500, fontSize: `calc(${fontSize} * 0.95)` }}>
                        {exp.company}{exp.location && ` · ${exp.location}`}
                      </p>
                      {exp.description && (
                        <div style={{ marginTop: '5px', color: '#475569', lineHeight }}
                          dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }}
                        />
                      )}
                    </div>
                  ))}
                </MainSection>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <MainSection key={section.id} title="Education" titleStyle={sectionTitle(theme.primaryColor, theme.primaryColor)} gap={gap}>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 700, color: theme.textColor }}>{edu.institution}</h3>
                        <span style={{ color: theme.primaryColor, fontSize: `calc(${fontSize} * 0.9)`, fontWeight: 500 }}>{formatDateRange(edu.dateRange)}</span>
                      </div>
                      <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                    </div>
                  ))}
                </MainSection>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <MainSection key={section.id} title="Projects" titleStyle={sectionTitle(theme.primaryColor, theme.primaryColor)} gap={gap}>
                  {projects.map((proj) => (
                    <div key={proj.id} style={{ marginBottom: '10px' }}>
                      <h3 style={{ fontWeight: 700, color: theme.textColor }}>
                        {proj.url ? <a href={proj.url} style={{ color: theme.primaryColor, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                        {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
                      </h3>
                      {proj.description && <p style={{ color: '#475569', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
                    </div>
                  ))}
                </MainSection>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <MainSection key={section.id} title="Achievements" titleStyle={sectionTitle(theme.primaryColor, theme.primaryColor)} gap={gap}>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={{ marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600 }}>{ach.title}</span>
                      {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
                      {ach.description && <p style={{ color: '#475569', marginTop: '2px' }}>{ach.description}</p>}
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

function SidebarContact({ icon, value, href, muted, text }: { icon: string; value: string; href?: string; muted: string; text: string }) {
  const inner = (
    <span style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', fontSize: 'inherit' }}>
      <span style={{ color: muted, fontSize: '10px', marginTop: '1px', flexShrink: 0 }}>{icon}</span>
      <span style={{ color: text, wordBreak: 'break-all', lineHeight: 1.3 }}>{value}</span>
    </span>
  )
  if (href) return <a href={href} style={{ textDecoration: 'none' }}>{inner}</a>
  return inner
}

function MainSection({ title, children, titleStyle, gap }: { title: string; children: React.ReactNode; titleStyle: React.CSSProperties; gap: string }) {
  return (
    <section style={{ marginBottom: gap }}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  )
}
