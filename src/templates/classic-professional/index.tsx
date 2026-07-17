/**
 * Classic Professional Template
 *
 * Design principles:
 *   - Single column — maximizes ATS parse-ability
 *   - Semantic HTML — h1/h2/h3/p/ul for screen readers and ATS parsers
 *   - No tables, no columns via CSS that break copy-paste
 *   - System-safe fonts with web fallbacks
 *   - Precise A4 sizing (210mm wide, min 297mm tall)
 *   - All content flows naturally — multi-page safe
 *
 * Theme variables consumed:
 *   primaryColor, fontFamily, fontSize, lineHeight, spacing, showIcons
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

// ─── Typography scale maps ────────────────────────────────────────────────────

const FONT_SIZE_MAP = { sm: '11px', md: '12px', lg: '13px' }
const LINE_HEIGHT_MAP = { tight: 1.3, normal: 1.5, relaxed: 1.7 }
const SPACING_MAP = { compact: '10px', normal: '16px', spacious: '22px' }

export default function ClassicProfessionalTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, custom } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const sectionGap = SPACING_MAP[theme.spacing]

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const containerStyle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize,
    lineHeight,
    color: theme.textColor,
    backgroundColor: theme.backgroundColor,
    width: '210mm',
    minHeight: '297mm',
    padding: '12mm 14mm',
    boxSizing: 'border-box',
  }

  const headingStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 1.75)`,
    fontWeight: 700,
    color: theme.primaryColor,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 1.05)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: theme.primaryColor,
    borderBottom: `2px solid ${theme.primaryColor}`,
    paddingBottom: '3px',
    marginBottom: sectionGap,
  }

  const entryTitleStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: `calc(${fontSize} * 1.05)`,
    color: theme.textColor,
  }

  const mutedStyle: React.CSSProperties = {
    color: '#64748b',
    fontSize: `calc(${fontSize} * 0.92)`,
  }

  return (
    <div style={containerStyle}>
      {/* ── Header ── */}
      <header style={{ marginBottom: sectionGap, textAlign: 'left' }}>
        <h1 style={headingStyle}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>

        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.08)`, color: theme.primaryColor, fontWeight: 500, marginTop: '3px' }}>
            {personal.headline}
          </p>
        )}

        {/* Contact row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px', ...mutedStyle }}>
          {personal.email && <ContactItem icon="✉" value={personal.email} href={`mailto:${personal.email}`} showIcon={theme.showIcons} />}
          {personal.phone && <ContactItem icon="☏" value={personal.phone} showIcon={theme.showIcons} />}
          {personal.location && <ContactItem icon="⌖" value={personal.location} showIcon={theme.showIcons} />}
          {personal.linkedin && <ContactItem icon="in" value={personal.linkedin} href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} showIcon={theme.showIcons} />}
          {personal.github && <ContactItem icon="gh" value={personal.github} href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} showIcon={theme.showIcons} />}
          {personal.website && <ContactItem icon="⬡" value={personal.website} href={personal.website} showIcon={theme.showIcons} />}
        </div>
      </header>

      {/* ── Dynamic sections ── */}
      {visibleSections.map((section) => {
        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <Section key={section.id} title="Summary" titleStyle={sectionTitleStyle} gap={sectionGap}>
                <p style={{ lineHeight }}>{data.summary}</p>
              </Section>
            ) : null

          case 'experience':
            return experience.length > 0 ? (
              <Section key={section.id} title="Experience" titleStyle={sectionTitleStyle} gap={sectionGap}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: `calc(${sectionGap} * 0.8)` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={entryTitleStyle}>{exp.position || 'Position'}</h3>
                      <span style={mutedStyle}>{formatDateRange(exp.dateRange)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', ...mutedStyle, marginTop: '1px' }}>
                      <span style={{ fontWeight: 500, color: theme.textColor }}>{exp.company}</span>
                      {exp.location && <><span>·</span><span>{exp.location}</span></>}
                    </div>
                    {exp.description && (
                      <div
                        style={{ marginTop: '5px', lineHeight }}
                        dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }}
                      />
                    )}
                  </div>
                ))}
              </Section>
            ) : null

          case 'education':
            return education.length > 0 ? (
              <Section key={section.id} title="Education" titleStyle={sectionTitleStyle} gap={sectionGap}>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: `calc(${sectionGap} * 0.7)` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={entryTitleStyle}>{edu.institution}</h3>
                      <span style={mutedStyle}>{formatDateRange(edu.dateRange)}</span>
                    </div>
                    <p style={mutedStyle}>
                      {[edu.degree, edu.field].filter(Boolean).join(' · ')}
                      {edu.gpa && ` · GPA: ${edu.gpa}`}
                    </p>
                    {edu.description && <p style={{ marginTop: '4px', lineHeight }}>{edu.description}</p>}
                  </div>
                ))}
              </Section>
            ) : null

          case 'projects':
            return projects.length > 0 ? (
              <Section key={section.id} title="Projects" titleStyle={sectionTitleStyle} gap={sectionGap}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: `calc(${sectionGap} * 0.8)` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                      <h3 style={entryTitleStyle}>
                        {proj.url ? (
                          <a href={proj.url} style={{ color: theme.primaryColor, textDecoration: 'none' }}>{proj.name}</a>
                        ) : proj.name}
                      </h3>
                      {proj.technologies.length > 0 && (
                        <span style={mutedStyle}>{proj.technologies.join(' · ')}</span>
                      )}
                    </div>
                    {proj.description && <p style={{ marginTop: '4px', lineHeight }}>{proj.description}</p>}
                  </div>
                ))}
              </Section>
            ) : null

          case 'skills':
            return skills.length > 0 ? (
              <Section key={section.id} title="Skills" titleStyle={sectionTitleStyle} gap={sectionGap}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {cat.name && (
                        <span style={{ fontWeight: 600, minWidth: '100px', color: theme.textColor }}>{cat.name}:</span>
                      )}
                      <span style={{ color: '#475569' }}>{cat.skills.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </Section>
            ) : null

          case 'certifications':
            return certifications.length > 0 ? (
              <Section key={section.id} title="Certifications" titleStyle={sectionTitleStyle} gap={sectionGap}>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                    <div>
                      <span style={{ fontWeight: 600 }}>{cert.name}</span>
                      {cert.issuer && <span style={mutedStyle}> · {cert.issuer}</span>}
                    </div>
                    <span style={mutedStyle}>{formatMonthYear(cert.date)}</span>
                  </div>
                ))}
              </Section>
            ) : null

          case 'languages':
            return languages.length > 0 ? (
              <Section key={section.id} title="Languages" titleStyle={sectionTitleStyle} gap={sectionGap}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  {languages.map((lang) => (
                    <div key={lang.id}>
                      <span style={{ fontWeight: 600 }}>{lang.language}</span>
                      <span style={mutedStyle}> — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                    </div>
                  ))}
                </div>
              </Section>
            ) : null

          case 'achievements':
            return achievements.length > 0 ? (
              <Section key={section.id} title="Achievements" titleStyle={sectionTitleStyle} gap={sectionGap}>
                {achievements.map((ach) => (
                  <div key={ach.id} style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontWeight: 600 }}>{ach.title}</span>
                      {ach.date && <span style={mutedStyle}>{formatMonthYear(ach.date)}</span>}
                    </div>
                    {ach.description && <p style={{ ...mutedStyle, marginTop: '2px' }}>{ach.description}</p>}
                  </div>
                ))}
              </Section>
            ) : null

          case 'custom': {
            const customId = section.customId
            const customData = customId ? custom[customId] : null
            if (!customData || customData.entries.length === 0) return null
            return (
              <Section key={section.id} title={section.label} titleStyle={sectionTitleStyle} gap={sectionGap}>
                {customData.entries.map((entry) => (
                  <div key={entry.id} style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontWeight: 600 }}>{entry.title}</span>
                      {entry.date && <span style={mutedStyle}>{formatMonthYear(entry.date)}</span>}
                    </div>
                    {entry.subtitle && <p style={mutedStyle}>{entry.subtitle}</p>}
                    {entry.description && <p style={{ marginTop: '3px', lineHeight }}>{entry.description}</p>}
                  </div>
                ))}
              </Section>
            )
          }

          default:
            return null
        }
      })}
    </div>
  )
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function Section({
  title,
  children,
  titleStyle,
  gap,
}: {
  title: string
  children: React.ReactNode
  titleStyle: React.CSSProperties
  gap: string
}) {
  return (
    <section style={{ marginBottom: gap }}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  )
}

function ContactItem({
  icon,
  value,
  href,
  showIcon,
}: {
  icon: string
  value: string
  href?: string
  showIcon: boolean
}) {
  const content = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
      {showIcon && <span style={{ fontSize: '10px', opacity: 0.7 }}>{icon}</span>}
      {value}
    </span>
  )

  if (href) {
    return (
      <a href={href} style={{ color: 'inherit', textDecoration: 'none' }}>
        {content}
      </a>
    )
  }

  return content
}
