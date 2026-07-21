/**
 * Creative Portfolio — Modern Portfolio
 *
 * Identity: bold large-scale header, two-column body with an editorial
 * rhythm. The header occupies the upper third with oversized name
 * typography; the body splits into a primary experience column (left,
 * wider) and a supporting details column (right). Thin hairline rules
 * separate sections. Reads like a design portfolio's table of contents.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10px', md: '10.5px', lg: '11.5px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.5, relaxed: 1.7 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function CreativePortfolioTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const sectionTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.82)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: accent,
    borderBottom: `1px solid ${accent}20`,
    paddingBottom: '5px',
    marginBottom: '8px',
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '14mm 16mm', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: `calc(${gap} * 1.4)`, borderBottom: `2px solid ${accent}`, paddingBottom: '14px' }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2.6)`, fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1, color: '#0f172a', margin: 0 }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.15)`, color: accent, fontWeight: 500, marginTop: '6px', letterSpacing: '0.02em' }}>
            {personal.headline}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px', marginTop: '8px', color: '#64748b', fontSize: `calc(${fontSize} * 0.88)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', columnGap: '10mm', rowGap: `calc(${gap} * 1.1)` }}>
        {visibleSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <div key={section.id} style={{ gridColumn: '1 / -1' }}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
                </div>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <div key={section.id} style={{ gridColumn: '1 / -1' }}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {experience.map((exp, i) => (
                    <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', alignItems: 'baseline' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.05)`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                        <span style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(exp.dateRange)}</span>
                      </div>
                      <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.92)`, marginTop: '1px' }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                      </p>
                      {exp.description && (
                        <div style={{ marginTop: '3px', color: '#374151' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                      )}
                    </div>
                  ))}
                </div>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: '7px' }}>
                      <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{edu.institution}</h3>
                      <p style={{ color: '#475569' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</p>
                      <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(edu.dateRange)}</p>
                    </div>
                  ))}
                </div>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ marginBottom: '5px' }}>
                      {cat.name && <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)`, margin: 0 }}>{cat.name}</p>}
                      <p style={{ color: '#475569' }}>{cat.skills.join(', ')}</p>
                    </div>
                  ))}
                </div>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {projects.map((proj) => (
                    <div key={proj.id} style={{ marginBottom: '6px' }}>
                      <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>
                        {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      </h3>
                      {proj.description && <p style={{ color: '#374151', marginTop: '2px' }}>{proj.description}</p>}
                      {proj.technologies.length > 0 && (
                        <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{proj.technologies.join(', ')}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ marginBottom: '4px' }}>
                      <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)`, margin: 0, lineHeight: 1.3 }}>{cert.name}</p>
                      <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
                    </div>
                  ))}
                </div>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ marginBottom: '2px' }}>
                      <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}> — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                    </div>
                  ))}
                </div>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{ach.title}</span>
                      {ach.date && <span style={{ color: '#94a3b8' }}> · {formatMonthYear(ach.date)}</span>}
                    </div>
                  ))}
                </div>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  <p style={{ color: '#374151' }}>{interests.map((i) => i.name).join(' · ')}</p>
                </div>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {awards.map((award) => (
                    <div key={award.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{award.title}</span>
                      <span style={{ color: '#64748b' }}> · {award.issuer}</span>
                    </div>
                  ))}
                </div>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <div key={section.id}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  {publications.map((pub) => (
                    <div key={pub.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>
                        {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                      </span>
                      <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
                    </div>
                  ))}
                </div>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <div key={section.id} style={{ gridColumn: '1 / -1' }}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${gap} 24px` }}>
                    {volunteer.map((vol) => (
                      <div key={vol.id} style={{ minWidth: '200px' }}>
                        <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{vol.role}</h3>
                        <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.9)` }}>{vol.organization}{vol.location ? ` · ${vol.location}` : ''}</p>
                        <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(vol.dateRange)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            case 'references':
              return references.length > 0 ? (
                <div key={section.id} style={{ gridColumn: '1 / -1' }}>
                  <h2 style={sectionTitle}>{section.label}</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${gap} 24px` }}>
                    {references.map((ref) => (
                      <div key={ref.id} style={{ minWidth: '180px' }}>
                        <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{ref.name}</h3>
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.85)` }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null

            default:
              return null
          }
        })}
      </div>
    </div>
  )
}
