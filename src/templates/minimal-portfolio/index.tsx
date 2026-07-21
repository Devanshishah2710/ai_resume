/**
 * Minimal Portfolio Template
 *
 * Identity: structured index grid. A compact header with the name on the left
 * and a tidy contact row on the right, then the body is arranged in a balanced
 * multi-column grid of clean text cells with elegant small-caps headings. No
 * cards, no fills — just hairline grid rhythm and premium whitespace.
 *
 * Distinct via its compact header contact placement and a balanced 2-column
 * (with full-width feature rows) grid that reads like an index of
 * qualifications.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'


export default function MinimalPortfolioTemplate({ data, theme, sections }: TemplateProps) {
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
    fontSize: `calc(${fontSize} * 0.78)`,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: accent,
    marginBottom: '8px',
  }

  const contactItems = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean) as string[]

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '16mm 18mm', boxSizing: 'border-box' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px', borderBottom: `2px solid #0f172a`, paddingBottom: '10px', marginBottom: `calc(${gap} * 1.1)` }}>
        <div>
          <h1 style={{ fontSize: `calc(${fontSize} * 2.1)`, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1, color: '#0f172a' }}>
            {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
          </h1>
          {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.0)`, color: accent, marginTop: '4px', fontWeight: 400 }}>{personal.headline}</p>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', color: '#64748b', fontSize: `calc(${fontSize} * 0.88)` }}>
          {contactItems.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: '12mm', rowGap: `calc(${gap} * 1.3)` }}>
        {visibleSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle} span>
                  <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
                </Cell>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle} span>
                  {experience.map((exp, i) => (
                    <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.85)` : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <h3 style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 1.02)`, color: '#0f172a' }}>{exp.position || 'Position'}</h3>
                        <span style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.85)` }}>{formatDateRange(exp.dateRange)}</span>
                      </div>
                      <p style={{ color: accent, fontWeight: 400, fontSize: `calc(${fontSize} * 0.92)` }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                      {exp.description && <div style={{ marginTop: '4px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />}
                    </div>
                  ))}
                </Cell>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle}>
                  {education.map((edu, i) => (
                    <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '7px' : 0 }}>
                      <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{edu.institution}</h3>
                      <p style={{ color: '#6b7280' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
                      <p style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(edu.dateRange)}</p>
                    </div>
                  ))}
                </Cell>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle}>
                  {projects.map((proj, i) => (
                    <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '7px' : 0 }}>
                      <h3 style={{ fontWeight: 600, color: '#0f172a' }}>
                        {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      </h3>
                      {proj.description && <p style={{ color: '#374151', marginTop: '2px', lineHeight }}>{proj.description}</p>}
                      {proj.technologies.length > 0 && <p style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.82)` }}>{proj.technologies.join(', ')}</p>}
                    </div>
                  ))}
                </Cell>
              ) : null


            case 'skills':
              return skills.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {skills.map((cat) => (
                      <div key={cat.id}>
                        {cat.name && <span style={{ fontWeight: 600, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)` }}>{cat.name}: </span>}
                        <span style={{ color: '#374151' }}>{cat.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </Cell>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle}>
                  {certifications.map((cert, i) => (
                    <div key={cert.id} style={{ marginBottom: i < certifications.length - 1 ? '4px' : 0 }}>
                      <p style={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.3 }}>{cert.name}</p>
                      <p style={{ color: '#6b7280', fontSize: `calc(${fontSize} * 0.82)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
                    </div>
                  ))}
                </Cell>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {languages.map((lang) => (
                      <div key={lang.id} style={{ color: '#374151', fontSize: `calc(${fontSize} * 0.88)` }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{lang.language}</span> <span style={{ color: '#9ca3af' }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                      </div>
                    ))}
                  </div>
                </Cell>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle}>
                  {achievements.map((ach, i) => (
                    <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '4px' : 0 }}>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{ach.title}</span>
                      {ach.date && <span style={{ color: '#9ca3af' }}> · {formatMonthYear(ach.date)}</span>}
                    </div>
                  ))}
                </Cell>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle}>
                  <p style={{ color: '#374151' }}>{interests.map((i) => i.name).join(' · ')}</p>
                </Cell>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle}>
                  {awards.map((award, i) => (
                    <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '4px' : 0 }}>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{award.title}</span>
                      <span style={{ color: '#6b7280' }}> · {award.issuer}</span>
                    </div>
                  ))}
                </Cell>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle}>
                  {publications.map((pub, i) => (
                    <div key={pub.id} style={{ marginBottom: i < publications.length - 1 ? '4px' : 0 }}>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>
                        {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                      </span>
                      <span style={{ color: '#6b7280' }}> · {pub.publisher}</span>
                    </div>
                  ))}
                </Cell>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle}>
                  {volunteer.map((vol, i) => (
                    <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '7px' : 0 }}>
                      <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{vol.role || 'Volunteer'}</h3>
                      <p style={{ color: accent, fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}>{vol.organization}</p>
                    </div>
                  ))}
                </Cell>
              ) : null

            case 'references':
              return references.length > 0 ? (
                <Cell key={section.id} title={section.label} titleStyle={titleStyle} span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${gap} 24px` }}>
                    {references.map((ref) => (
                      <div key={ref.id} style={{ minWidth: '180px' }}>
                        <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{ref.name}</h3>
                        <p style={{ color: '#6b7280', fontSize: `calc(${fontSize} * 0.85)` }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </Cell>
              ) : null

            default:
              return null
          }
        })}
      </div>
    </div>
  )
}

function Cell({ title, titleStyle, span, children }: { title: string; titleStyle: React.CSSProperties; span?: boolean; children: React.ReactNode }) {
  return (
    <div style={span ? { gridColumn: '1 / -1' } : undefined}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </div>
  )
}
