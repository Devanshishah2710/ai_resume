/**
 * Professional Corporate Executive Template
 *
 * Wide header: name left, contact right (two-end alignment), then a single
 * column body with heavy rule dividers and a premium serif/sans mix. Designed
 * for Fortune 500 / enterprise application tracking.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '11px', md: '12px', lg: '13px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.7 }
const SPACING_MAP = { compact: '14px', normal: '20px', spacious: '26px' }

export default function ProfessionalCorporateTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, achievements, languages, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Playfair Display", Georgia, serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const titleStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 1.05)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: accent,
    borderBottom: `2px solid ${accent}`,
    paddingBottom: '4px',
    marginBottom: `calc(${gap} * 0.6)`,
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '14mm 16mm', boxSizing: 'border-box' }}>
      {/* Wide header: name left, contact right */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '10px', borderBottom: `3px solid ${accent}`, paddingBottom: '10px', marginBottom: `calc(${gap} * 1.1)` }}>
        <div>
          <h1 style={{ fontFamily: displayStack, fontSize: `calc(${fontSize} * 2.3)`, fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>
            {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
          </h1>
          {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, marginTop: '4px', fontWeight: 500 }}>{personal.headline}</p>}
        </div>
        <div style={{ textAlign: 'right', color: '#475569', fontSize: `calc(${fontSize} * 0.9)`, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <a href={personal.website} style={{ color: '#475569', textDecoration: 'none' }}>{personal.website}</a>}
        </div>
      </header>

      {visibleSections.map((section) => {
        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <Section key={section.id} title="Professional Summary" titleStyle={titleStyle} gap={gap}>
                <p style={{ color: '#334155' }}>{data.summary}</p>
              </Section>
            ) : null
          case 'experience':
            return experience.length > 0 ? (
              <Section key={section.id} title="Professional Experience" titleStyle={titleStyle} gap={gap}>
                {experience.map((exp, i) => (
                  <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.08)` }}>{exp.position || 'Position'}</h3>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(exp.dateRange)}</span>
                    </div>
                    <p style={{ color: accent, fontWeight: 600 }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                    {exp.description && <div style={{ marginTop: '5px', color: '#334155' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />}
                  </div>
                ))}
              </Section>
            ) : null
          case 'education':
            return education.length > 0 ? (
              <Section key={section.id} title="Education" titleStyle={titleStyle} gap={gap}>
                {education.map((edu) => (
                  <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
                      <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
                    </div>
                    <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(edu.dateRange)}</span>
                  </div>
                ))}
              </Section>
            ) : null
          case 'projects':
            return projects.length > 0 ? (
              <Section key={section.id} title="Key Projects" titleStyle={titleStyle} gap={gap}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '8px' }}>
                    <h3 style={{ fontWeight: 700 }}>
                      {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
                    </h3>
                    {proj.description && <p style={{ color: '#334155', marginTop: '3px' }}>{proj.description}</p>}
                  </div>
                ))}
              </Section>
            ) : null
          case 'skills':
            return skills.length > 0 ? (
              <Section key={section.id} title="Core Competencies" titleStyle={titleStyle} gap={gap}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.flatMap((cat) => cat.skills).map((s, i) => (
                    <span key={i} style={{ padding: '3px 12px', backgroundColor: '#f1f5f9', borderRadius: '3px', fontSize: `calc(${fontSize} * 0.88)`, color: '#334155' }}>{s}</span>
                  ))}
                </div>
              </Section>
            ) : null
          case 'certifications':
            return certifications.length > 0 ? (
              <Section key={section.id} title="Certifications" titleStyle={titleStyle} gap={gap}>
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
              <Section key={section.id} title="Achievements" titleStyle={titleStyle} gap={gap}>
                {achievements.map((ach) => (
                  <div key={ach.id} style={{ marginBottom: '5px' }}>
                    <span style={{ fontWeight: 600 }}>{ach.title}</span>
                    {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
                    {ach.description && <p style={{ color: '#334155', marginTop: '2px' }}>{ach.description}</p>}
                  </div>
                ))}
              </Section>
            ) : null
          case 'languages':
            return languages.length > 0 ? (
              <Section key={section.id} title="Languages" titleStyle={titleStyle} gap={gap}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                  {languages.map((lang) => (
                    <span key={lang.id}><strong>{lang.language}</strong> <span style={{ color: '#64748b' }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
                  ))}
                </div>
              </Section>
            ) : null
          case 'interests':
            return interests.length > 0 ? (
              <Section key={section.id} title="Interests" titleStyle={titleStyle} gap={gap}>
                <p style={{ color: '#334155' }}>{interests.map((i) => i.name).join(' · ')}</p>
              </Section>
            ) : null
          case 'awards':
            return awards.length > 0 ? (
              <Section key={section.id} title="Awards" titleStyle={titleStyle} gap={gap}>
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
              <Section key={section.id} title="Publications" titleStyle={titleStyle} gap={gap}>
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
              <Section key={section.id} title="Volunteer Experience" titleStyle={titleStyle} gap={gap}>
                {volunteer.map((vol) => (
                  <div key={vol.id} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 700 }}>{vol.role}</h3>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(vol.dateRange)}</span>
                    </div>
                    <p style={{ color: accent, fontWeight: 600 }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                    {vol.description && <p style={{ color: '#334155', marginTop: '3px' }}>{vol.description}</p>}
                  </div>
                ))}
              </Section>
            ) : null
          case 'references':
            return references.length > 0 ? (
              <Section key={section.id} title="References" titleStyle={titleStyle} gap={gap}>
                {references.map((ref) => (
                  <div key={ref.id} style={{ marginBottom: '6px' }}>
                    <h3 style={{ fontWeight: 700 }}>{ref.name}</h3>
                    <p style={{ color: '#64748b' }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                    <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.85)` }}>{[ref.email, ref.phone].filter(Boolean).join(' · ')}</p>
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
