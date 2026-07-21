/**
 * Minimal Chronicle Template
 *
 * Identity: banded header + chronological timeline. A soft-gray full-width
 * header carries the name, headline and a single contact row. The body is a
 * single column with full-width hairline separators between sections, and
 * experience is drawn as a quiet left-railed timeline using soft gray accents
 * only (no color field). Calm, document-like top-to-bottom reading order.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'


const SOFT = '#9ca3af'
const RAIL = '#d1d5db'

export default function MinimalChronicleTemplate({ data, theme, sections }: TemplateProps) {
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
    fontSize: `calc(${fontSize} * 1.05)`,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: `calc(${gap} * 0.6)`,
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}>
      <header style={{ backgroundColor: '#f8fafc', padding: '16mm 18mm 12mm', borderBottom: `1px solid ${RAIL}` }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2.6)`, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1, color: '#0f172a' }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, marginTop: '5px', fontWeight: 400 }}>{personal.headline}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px', marginTop: '12px', color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <a href={personal.website} style={{ color: 'inherit', textDecoration: 'none' }}>{personal.website}</a>}
        </div>
      </header>

      <div style={{ padding: '14mm 18mm' }}>
        {visibleSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
                </Block>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  <div style={{ borderLeft: `2px solid ${RAIL}`, paddingLeft: '14px' }}>
                    {experience.map((exp) => (
                      <div key={exp.id} style={{ position: 'relative', marginBottom: `calc(${gap} * 0.9)` }}>
                        <span style={{ position: 'absolute', left: '-19px', top: '5px', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: SOFT, border: '2px solid #fff' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                          <h3 style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 1.05)`, color: '#0f172a' }}>{exp.position || 'Position'}</h3>
                          <span style={{ color: SOFT, fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(exp.dateRange)}</span>
                        </div>
                        <p style={{ color: accent, fontWeight: 400, fontSize: `calc(${fontSize} * 0.95)` }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                        {exp.description && <div style={{ marginTop: '4px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />}
                      </div>
                    ))}
                  </div>
                </Block>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  {education.map((edu, i) => (
                    <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: i < education.length - 1 ? '8px' : 0 }}>
                      <div>
                        <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{edu.institution}</h3>
                        <p style={{ color: '#6b7280' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
                      </div>
                      <span style={{ color: SOFT, fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(edu.dateRange)}</span>
                    </div>
                  ))}
                </Block>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  {projects.map((proj, i) => (
                    <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '8px' : 0 }}>
                      <h3 style={{ fontWeight: 600, color: '#0f172a' }}>
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
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skills.flatMap((cat) => cat.skills).map((s, i) => (
                      <span key={i} style={{ padding: '2px 10px', border: `1px solid ${RAIL}`, borderRadius: '3px', fontSize: `calc(${fontSize} * 0.88)`, color: '#374151' }}>{s}</span>
                    ))}
                  </div>
                </Block>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  {certifications.map((cert, i) => (
                    <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: i < certifications.length - 1 ? '5px' : 0 }}>
                      <span><span style={{ fontWeight: 600, color: '#0f172a' }}>{cert.name}</span> <span style={{ color: '#6b7280' }}>· {cert.issuer}</span></span>
                      <span style={{ color: SOFT, fontSize: `calc(${fontSize} * 0.88)` }}>{formatMonthYear(cert.date)}</span>
                    </div>
                  ))}
                </Block>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
                    {languages.map((lang) => (
                      <span key={lang.id}><span style={{ fontWeight: 600, color: '#0f172a' }}>{lang.language}</span> <span style={{ color: SOFT }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
                    ))}
                  </div>
                </Block>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  {achievements.map((ach, i) => (
                    <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '5px' : 0 }}>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{ach.title}</span>
                      {ach.date && <span style={{ color: SOFT }}> · {formatMonthYear(ach.date)}</span>}
                      {ach.description && <p style={{ color: '#374151', marginTop: '2px' }}>{ach.description}</p>}
                    </div>
                  ))}
                </Block>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  <p style={{ color: '#374151' }}>{interests.map((i) => i.name).join(' · ')}</p>
                </Block>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  {awards.map((award, i) => (
                    <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '5px' : 0 }}>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{award.title}</span>
                      <span style={{ color: '#6b7280' }}> · {award.issuer}</span>
                      {award.date && <span style={{ color: SOFT }}> · {formatMonthYear(award.date)}</span>}
                    </div>
                  ))}
                </Block>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  {publications.map((pub, i) => (
                    <div key={pub.id} style={{ marginBottom: i < publications.length - 1 ? '5px' : 0 }}>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>
                        {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                      </span>
                      <span style={{ color: '#6b7280' }}> · {pub.publisher}</span>
                      {pub.date && <span style={{ color: SOFT }}> · {formatMonthYear(pub.date)}</span>}
                    </div>
                  ))}
                </Block>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  {volunteer.map((vol, i) => (
                    <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '8px' : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{vol.role || 'Volunteer'}</h3>
                        <span style={{ color: SOFT, fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(vol.dateRange)}</span>
                      </div>
                      <p style={{ color: accent, fontWeight: 400, fontSize: `calc(${fontSize} * 0.95)` }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                      {vol.description && <p style={{ color: '#374151', marginTop: '3px', lineHeight }}>{vol.description}</p>}
                    </div>
                  ))}
                </Block>
              ) : null

            case 'references':
              return references.length > 0 ? (
                <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap} sep>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${gap} 24px` }}>
                    {references.map((ref) => (
                      <div key={ref.id} style={{ minWidth: '200px' }}>
                        <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{ref.name}</h3>
                        <p style={{ color: '#6b7280' }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                        {ref.email && <p style={{ color: SOFT, fontSize: `calc(${fontSize} * 0.88)` }}>{ref.email}</p>}
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
    </div>
  )
}

function Block({ title, titleStyle, gap, sep, children }: { title: string; titleStyle: React.CSSProperties; gap: string; sep?: boolean; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: gap, ...(sep ? { borderBottom: `1px solid #e5e7eb`, paddingBottom: gap } : undefined) }}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  )
}
