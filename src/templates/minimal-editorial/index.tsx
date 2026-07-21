/**
 * Minimal Editorial Template
 *
 * Identity: editorial, left-anchored. A serif name sits beside a thin vertical
 * accent rule with the contact details stacked to its right, giving an
 * unmistakable masthead feel. The body is a spacious single column where each
 * section title is a small uppercase label preceded by a short accent tick.
 *
 * Distinct from other minimal templates via its masthead rule + tick-mark
 * headings and serif display name.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'


export default function MinimalEditorialTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

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
    fontSize: `calc(${fontSize} * 0.82)`,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: `calc(${gap} * 0.6)`,
  }

  const contactItems = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean) as string[]

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '18mm 20mm', boxSizing: 'border-box' }}>
      {/* Masthead: serif name + vertical rule + contact */}
      <header style={{ display: 'flex', gap: '16px', marginBottom: `calc(${gap} * 1.4)` }}>
        <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '16px' }}>
          <h1 style={{ fontFamily: displayStack, fontSize: `calc(${fontSize} * 2.9)`, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1, color: '#0f172a' }}>
            {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
          </h1>
          {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, marginTop: '6px', fontWeight: 400 }}>{personal.headline}</p>}
        </div>
        <div style={{ marginLeft: 'auto', alignSelf: 'center', textAlign: 'right', color: '#6b7280', fontSize: `calc(${fontSize} * 0.9)`, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {contactItems.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </header>

      {visibleSections.map((section) => {
        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
              </Block>
            ) : null

          case 'experience':
            return experience.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {experience.map((exp, i) => (
                  <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 1.08)`, color: '#0f172a' }}>{exp.position || 'Position'}</h3>
                      <span style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(exp.dateRange)}</span>
                    </div>
                    <p style={{ color: accent, fontWeight: 400, fontSize: `calc(${fontSize} * 0.95)` }}>
                      {exp.company}{exp.location && ` · ${exp.location}`}
                    </p>
                    {exp.description && (
                      <div style={{ marginTop: '5px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
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
                      <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{edu.institution}</h3>
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
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'baseline' }}>
                      {cat.name && <span style={{ fontWeight: 600, minWidth: '120px', color: '#0f172a' }}>{cat.name}</span>}
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
                    <span><span style={{ fontWeight: 600, color: '#0f172a' }}>{cert.name}</span> <span style={{ color: '#6b7280' }}>· {cert.issuer}</span></span>
                    <span style={{ color: '#9ca3af', fontSize: `calc(${fontSize} * 0.88)` }}>{formatMonthYear(cert.date)}</span>
                  </div>
                ))}
              </Block>
            ) : null

          case 'languages':
            return languages.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
                  {languages.map((lang) => (
                    <span key={lang.id}><span style={{ fontWeight: 600, color: '#0f172a' }}>{lang.language}</span> <span style={{ color: '#9ca3af' }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
                  ))}
                </div>
              </Block>
            ) : null

          case 'achievements':
            return achievements.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {achievements.map((ach, i) => (
                  <div key={ach.id} style={{ marginBottom: i < achievements.length - 1 ? '5px' : 0 }}>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{ach.title}</span>
                    {ach.date && <span style={{ color: '#9ca3af' }}> · {formatMonthYear(ach.date)}</span>}
                    {ach.description && <p style={{ color: '#374151', marginTop: '2px' }}>{ach.description}</p>}
                  </div>
                ))}
              </Block>
            ) : null

          case 'interests':
            return interests.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                <p style={{ color: '#374151' }}>{interests.map((i) => i.name).join(' · ')}</p>
              </Block>
            ) : null

          case 'awards':
            return awards.length > 0 ? (
              <Block key={section.id} title={section.label} titleStyle={titleStyle} gap={gap}>
                {awards.map((award, i) => (
                  <div key={award.id} style={{ marginBottom: i < awards.length - 1 ? '5px' : 0 }}>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{award.title}</span>
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
                      <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{vol.role || 'Volunteer'}</h3>
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
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${gap} 24px` }}>
                  {references.map((ref) => (
                    <div key={ref.id} style={{ minWidth: '200px' }}>
                      <h3 style={{ fontWeight: 600, color: '#0f172a' }}>{ref.name}</h3>
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
    <section style={{ marginBottom: gap }}>
      <h2 style={titleStyle}>
        <span style={{ width: '14px', height: '1px', backgroundColor: titleStyle.color, display: 'inline-block' }} />
        {title}
      </h2>
      {children}
    </section>
  )
}
