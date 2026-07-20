/**
 * Minimal Whitespace Template
 *
 * Identity: gallery-calm, centered. A large light-weight centered name floats
 * above a compact contact line and a single hairline rule. The body is a
 * centered single column where every section breathes with wide vertical
 * rhythm. Whitespace is the primary design element — no boxes, columns, or
 * color fills. ATS-friendly (plain single-column flow).
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10.5px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.45, normal: 1.65, relaxed: 1.85 }
const SPACING_MAP = { compact: '14px', normal: '22px', spacious: '30px' }

export default function MinimalWhitespaceTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const titleStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.76)`,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.24em',
    color: accent,
    marginBottom: `calc(${gap} * 0.5)`,
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '22mm 26mm', boxSizing: 'border-box' }}>
      <header style={{ textAlign: 'center', marginBottom: `calc(${gap} * 1.5)` }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 3.1)`, fontWeight: 200, letterSpacing: '0.05em', lineHeight: 1.05, color: '#111827' }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, marginTop: '10px', fontWeight: 400, letterSpacing: '0.03em' }}>
            {personal.headline}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 16px', marginTop: '14px', color: '#6b7280', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <a href={personal.website} style={{ color: 'inherit', textDecoration: 'none' }}>{personal.website}</a>}
        </div>
        <div style={{ width: '44px', height: '1px', backgroundColor: accent, margin: '18px auto 0' }} />
      </header>

      {visibleSections.map((section) => {
        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                <p style={{ textAlign: 'center', color: '#374151', lineHeight }}>{data.summary}</p>
              </Block>
            ) : null

          case 'experience':
            return experience.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {experience.map((exp, i) => (
                  <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.85)` : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 500, fontSize: `calc(${fontSize} * 1.08)`, color: '#111827' }}>{exp.position || 'Position'}</h3>
                      <span style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(exp.dateRange)}</span>
                    </div>
                    <p style={{ color: accent, fontWeight: 400, fontSize: `calc(${fontSize} * 0.95)` }}>
                      {exp.company}{exp.location && ` · ${exp.location}`}
                    </p>
                    {exp.description && (
                      <div style={{ marginTop: '6px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                    )}
                  </div>
                ))}
              </Block>
            ) : null

          case 'education':
            return education.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {education.map((edu, i) => (
                  <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '10px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 500, color: '#111827' }}>{edu.institution}</h3>
                      <span style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(edu.dateRange)}</span>
                    </div>
                    <p style={{ color: '#6b7280' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
                  </div>
                ))}
              </Block>
            ) : null

          case 'projects':
            return projects.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {projects.map((proj, i) => (
                  <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '10px' : 0 }}>
                    <h3 style={{ fontWeight: 500, color: '#111827' }}>
                      {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      {proj.technologies.length > 0 && <span style={{ color: '#6b7280', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
                    </h3>
                    {proj.description && <p style={{ color: '#374151', marginTop: '3px', lineHeight }}>{proj.description}</p>}
                  </div>
                ))}
              </Block>
            ) : null

          case 'skills':
            return skills.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 24px', justifyContent: 'center' }}>
                  {skills.map((cat) => (
                    <div key={cat.id}>
                      {cat.name && <span style={{ fontWeight: 500, color: '#111827', marginRight: '6px' }}>{cat.name}:</span>}
                      <span style={{ color: '#374151' }}>{cat.skills.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </Block>
            ) : null

          case 'certifications':
            return certifications.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {certifications.map((cert, i) => (
                  <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: i < certifications.length - 1 ? '5px' : 0 }}>
                    <span><span style={{ fontWeight: 500, color: '#111827' }}>{cert.name}</span> <span style={{ color: '#6b7280' }}>· {cert.issuer}</span></span>
                    <span style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.88)` }}>{formatMonthYear(cert.date)}</span>
                  </div>
                ))}
              </Block>
            ) : null

          case 'languages':
            return languages.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', justifyContent: 'center' }}>
                  {languages.map((lang) => (
                    <span key={lang.id}><span style={{ fontWeight: 500, color: '#111827' }}>{lang.language}</span> <span style={{ color: '#9ca3af' }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
                  ))}
                </div>
              </Block>
            ) : null

          case 'achievements':
            return achievements.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {achievements.map((ach, i) => (
                  <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '5px' : 0 }}>
                    <span style={{ fontWeight: 500, color: '#111827' }}>{ach.title}</span>
                    {ach.date && <span style={{ color: '#9ca3af' }}> · {formatMonthYear(ach.date)}</span>}
                    {ach.description && <p style={{ color: '#374151', marginTop: '2px' }}>{ach.description}</p>}
                  </div>
                ))}
              </Block>
            ) : null

          case 'interests':
            return interests.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                <p style={{ color: '#374151', textAlign: 'center' }}>{interests.map((i) => i.name).join(' · ')}</p>
              </Block>
            ) : null

          case 'awards':
            return awards.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {awards.map((award, i) => (
                  <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '5px' : 0 }}>
                    <span style={{ fontWeight: 500, color: '#111827' }}>{award.title}</span>
                    <span style={{ color: '#6b7280' }}> · {award.issuer}</span>
                    {award.date && <span style={{ color: '#9ca3af' }}> · {formatMonthYear(award.date)}</span>}
                  </div>
                ))}
              </Block>
            ) : null

          case 'publications':
            return publications.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {publications.map((pub, i) => (
                  <div key={pub.id} style={{ marginBottom: i < publications.length - 1 ? '5px' : 0 }}>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>
                      {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                    </span>
                    <span style={{ color: '#6b7280' }}> · {pub.publisher}</span>
                    {pub.date && <span style={{ color: '#9ca3af' }}> · {formatMonthYear(pub.date)}</span>}
                  </div>
                ))}
              </Block>
            ) : null


          case 'volunteer':
            return volunteer.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {volunteer.map((vol, i) => (
                  <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '10px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 500, color: '#111827' }}>{vol.role || 'Volunteer'}</h3>
                      <span style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(vol.dateRange)}</span>
                    </div>
                    <p style={{ color: accent, fontWeight: 400, fontSize: `calc(${fontSize} * 0.95)` }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                    {vol.description && <p style={{ color: '#374151', marginTop: '3px', lineHeight }}>{vol.description}</p>}
                  </div>
                ))}
              </Block>
            ) : null

          case 'references':
            return references.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${gap} 24px`, justifyContent: 'center' }}>
                  {references.map((ref) => (
                    <div key={ref.id} style={{ minWidth: '200px' }}>
                      <h3 style={{ fontWeight: 500, color: '#111827' }}>{ref.name}</h3>
                      <p style={{ color: '#6b7280' }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                      {ref.email && <p style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.88)` }}>{ref.email}</p>}
                    </div>
                  ))}
                </div>
              </Block>
            ) : null

          default:
            return null
        }
      })}
    </div>
  )
}

function Block({ title, titleStyle, gap, children }: { title: string; titleStyle: React.CSSProperties; gap: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: gap, textAlign: 'center' }}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  )
}
