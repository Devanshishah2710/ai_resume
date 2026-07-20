/**
 * Modern Vanguard Template
 *
 * Clean centered top header, single-column body, elegant serif-leaning
 * typography with simple horizontal section dividers. Generous rhythm and
 * restrained accent usage keep it ATS-friendly and professional.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '11px', md: '12px', lg: '13px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.7 }
const SPACING_MAP = { compact: '12px', normal: '18px', spacious: '24px' }

export default function ModernVanguardTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, achievements, languages, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

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
    padding: '14mm 16mm',
    boxSizing: 'border-box',
  }

  const nameStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 2.1)`,
    fontWeight: 300,
    letterSpacing: '0.04em',
    color: accent,
    lineHeight: 1.1,
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.95)`,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: accent,
    marginTop: gap,
    marginBottom: `calc(${gap} * 0.6)`,
    paddingBottom: '6px',
    borderBottom: `1px solid ${accent}`,
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: `calc(${gap} * 1.4)` }}>
        <h1 style={nameStyle}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: '#475569', letterSpacing: '0.02em', marginTop: '4px' }}>
            {personal.headline}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 18px', marginTop: '10px', color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <ContactIcon icon="✉" value={personal.email} href={`mailto:${personal.email}`} />}
          {personal.phone && <ContactIcon icon="☏" value={personal.phone} />}
          {personal.location && <ContactIcon icon="⌖" value={personal.location} />}
          {personal.linkedin && <ContactIcon icon="in" value={personal.linkedin} href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} />}
          {personal.github && <ContactIcon icon="gh" value={personal.github} href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} />}
          {personal.website && <ContactIcon icon="⬡" value={personal.website} href={personal.website} />}
        </div>
      </header>

      {visibleSections.map((section) => {
        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <Section key={section.id} title="Summary" titleStyle={sectionTitleStyle} gap={gap}>
                <p style={{ lineHeight }}>{data.summary}</p>
              </Section>
            ) : null

          case 'experience':
            return experience.length > 0 ? (
              <Section key={section.id} title="Experience" titleStyle={sectionTitleStyle} gap={gap}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: `calc(${gap} * 0.8)` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 1.05)` }}>{exp.position || 'Position'}</h3>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(exp.dateRange)}</span>
                    </div>
                    <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.95)` }}>
                      {exp.company}{exp.location && ` · ${exp.location}`}
                    </p>
                    {exp.description && (
                      <div style={{ marginTop: '4px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                    )}
                  </div>
                ))}
              </Section>
            ) : null

          case 'education':
            return education.length > 0 ? (
              <Section key={section.id} title="Education" titleStyle={sectionTitleStyle} gap={gap}>
                {education.map((edu) => (
                  <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ fontWeight: 600 }}>{edu.institution}</h3>
                      <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>
                        {[edu.degree, edu.field].filter(Boolean).join(' · ')}{edu.gpa && ` · GPA: ${edu.gpa}`}
                      </p>
                    </div>
                    <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(edu.dateRange)}</span>
                  </div>
                ))}
              </Section>
            ) : null

          case 'projects':
            return projects.length > 0 ? (
              <Section key={section.id} title="Projects" titleStyle={sectionTitleStyle} gap={gap}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '8px' }}>
                    <h3 style={{ fontWeight: 600 }}>
                      {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
                    </h3>
                    {proj.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
                  </div>
                ))}
              </Section>
            ) : null

          case 'skills':
            return skills.length > 0 ? (
              <Section key={section.id} title="Skills" titleStyle={sectionTitleStyle} gap={gap}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.flatMap((cat) => cat.skills).map((skill, i) => (
                    <span key={i} style={{ padding: '3px 12px', border: `1px solid ${accent}`, borderRadius: '999px', fontSize: `calc(${fontSize} * 0.88)`, color: accent }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>
            ) : null

          case 'certifications':
            return certifications.length > 0 ? (
              <Section key={section.id} title="Certifications" titleStyle={sectionTitleStyle} gap={gap}>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '5px' }}>
                    <span><span style={{ fontWeight: 600 }}>{cert.name}</span> <span style={{ color: '#64748b' }}>· {cert.issuer}</span></span>
                    <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatMonthYear(cert.date)}</span>
                  </div>
                ))}
              </Section>
            ) : null

          case 'achievements':
            return achievements.length > 0 ? (
              <Section key={section.id} title="Achievements" titleStyle={sectionTitleStyle} gap={gap}>
                {achievements.map((ach) => (
                  <div key={ach.id} style={{ marginBottom: '5px' }}>
                    <span style={{ fontWeight: 600 }}>{ach.title}</span>
                    {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
                    {ach.description && <p style={{ color: '#374151', marginTop: '2px' }}>{ach.description}</p>}
                  </div>
                ))}
              </Section>
            ) : null

          case 'languages':
            return languages.length > 0 ? (
              <Section key={section.id} title="Languages" titleStyle={sectionTitleStyle} gap={gap}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                  {languages.map((lang) => (
                    <span key={lang.id}><strong>{lang.language}</strong> <span style={{ color: '#64748b' }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
                  ))}
                </div>
              </Section>
            ) : null

          case 'interests':
            return interests.length > 0 ? (
              <Section key={section.id} title="Interests" titleStyle={sectionTitleStyle} gap={gap}>
                <p style={{ color: '#374151' }}>{interests.map((i) => i.name).join(' · ')}</p>
              </Section>
            ) : null

          case 'awards':
            return awards.length > 0 ? (
              <Section key={section.id} title="Awards" titleStyle={sectionTitleStyle} gap={gap}>
                {awards.map((award) => (
                  <div key={award.id} style={{ marginBottom: '5px' }}>
                    <span style={{ fontWeight: 600 }}>{award.title}</span>
                    <span style={{ color: '#64748b' }}> · {award.issuer}</span>
                    {award.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(award.date)}</span>}
                  </div>
                ))}
              </Section>
            ) : null

          case 'publications':
            return publications.length > 0 ? (
              <Section key={section.id} title="Publications" titleStyle={sectionTitleStyle} gap={gap}>
                {publications.map((pub) => (
                  <div key={pub.id} style={{ marginBottom: '5px' }}>
                    <span style={{ fontWeight: 600 }}>
                      {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                    </span>
                    <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
                    {pub.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(pub.date)}</span>}
                  </div>
                ))}
              </Section>
            ) : null

          case 'volunteer':
            return volunteer.length > 0 ? (
              <Section key={section.id} title="Volunteer" titleStyle={sectionTitleStyle} gap={gap}>
                {volunteer.map((vol) => (
                  <div key={vol.id} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 600 }}>{vol.role || 'Volunteer'}</h3>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(vol.dateRange)}</span>
                    </div>
                    <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.95)` }}>
                      {vol.organization}{vol.location && ` · ${vol.location}`}
                    </p>
                    {vol.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{vol.description}</p>}
                  </div>
                ))}
              </Section>
            ) : null

          default:
            return null
        }
      })}
    </div>
  )
}

function Section({ title, titleStyle, gap, children }: { title: string; titleStyle: React.CSSProperties; gap: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: gap }}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  )
}

function ContactIcon({ icon, value, href }: { icon: string; value: string; href?: string }) {
  const content = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <span style={{ opacity: 0.6 }}>{icon}</span>
      {value}
    </span>
  )
  if (href) return <a href={href} style={{ color: 'inherit', textDecoration: 'none' }}>{content}</a>
  return content
}
