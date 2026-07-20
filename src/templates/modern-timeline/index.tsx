/**
 * Modern Timeline Template
 *
 * Minimal contact row under the name, then a vertical timeline for experience
 * (accent rail + dots) with soft accent tints. Contemporary sans typography,
 * generous whitespace, and a calm two-tone accent system.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '11px', md: '12px', lg: '13px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.6, relaxed: 1.75 }
const SPACING_MAP = { compact: '14px', normal: '20px', spacious: '28px' }

export default function ModernTimelineTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor
  const accentSoft = `${accent}14`

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
    padding: '16mm 16mm',
    boxSizing: 'border-box',
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 1.1)`,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: `calc(${gap} * 0.5)`,
  }

  return (
    <div style={containerStyle}>
      {/* Minimal header */}
      <header style={{ marginBottom: `calc(${gap} * 1.2)` }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2.2)`, fontWeight: 700, letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1.05 }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, fontWeight: 500, marginTop: '4px' }}>{personal.headline}</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: '10px', color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>☏ {personal.phone}</span>}
          {personal.location && <span>⌖ {personal.location}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.website && <a href={personal.website} style={{ color: '#64748b', textDecoration: 'none' }}>⬡ {personal.website}</a>}
        </div>
      </header>

      {visibleSections.map((section) => {
        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <Section key={section.id} title="Summary" titleStyle={sectionTitleStyle} gap={gap}>
                <p style={{ color: '#475569' }}>{data.summary}</p>
              </Section>
            ) : null

          case 'experience':
            return experience.length > 0 ? (
              <Section key={section.id} title="Experience" titleStyle={sectionTitleStyle} gap={gap}>
                <div style={{ borderLeft: `2px solid ${accentSoft}`, paddingLeft: '16px' }}>
                  {experience.map((exp) => (
                    <div key={exp.id} style={{ position: 'relative', marginBottom: `calc(${gap} * 0.9)`, paddingLeft: '4px' }}>
                      <span style={{ position: 'absolute', left: '-23px', top: '4px', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: accent }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 1.05)` }}>{exp.position || 'Position'}</h3>
                        <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(exp.dateRange)}</span>
                      </div>
                      <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.95)` }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                      {exp.description && (
                        <div style={{ marginTop: '4px', color: '#475569' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            ) : null

          case 'education':
            return education.length > 0 ? (
              <Section key={section.id} title="Education" titleStyle={sectionTitleStyle} gap={gap}>
                {education.map((edu) => (
                  <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ fontWeight: 600 }}>{edu.institution}</h3>
                      <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
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
                  <div key={proj.id} style={{ marginBottom: '8px', backgroundColor: accentSoft, borderRadius: '8px', padding: '10px 12px' }}>
                    <h3 style={{ fontWeight: 600 }}>
                      {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
                    </h3>
                    {proj.description && <p style={{ color: '#475569', marginTop: '3px' }}>{proj.description}</p>}
                  </div>
                ))}
              </Section>
            ) : null

          case 'skills':
            return skills.length > 0 ? (
              <Section key={section.id} title="Skills" titleStyle={sectionTitleStyle} gap={gap}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'baseline' }}>
                      {cat.name && <span style={{ fontWeight: 600, minWidth: '90px', color: '#334155' }}>{cat.name}:</span>}
                      <span style={{ color: '#475569' }}>{cat.skills.join(', ')}</span>
                    </div>
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
                    {ach.description && <p style={{ color: '#475569', marginTop: '2px' }}>{ach.description}</p>}
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
                <p style={{ color: '#475569' }}>{interests.map((i) => i.name).join(' · ')}</p>
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
                      <h3 style={{ fontWeight: 600 }}>{vol.role}</h3>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(vol.dateRange)}</span>
                    </div>
                    <p style={{ color: accent, fontWeight: 500 }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                    {vol.description && <p style={{ color: '#475569', marginTop: '3px' }}>{vol.description}</p>}
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
