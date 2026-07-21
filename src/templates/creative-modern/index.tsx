/**
 * Creative Modern — Creative Professional
 *
 * Identity: section card layout with a subtle accent left-border on each
 * card. The header is a compact top strip. Each section is a bordered
 * card with a 3px accent left-edge. Cards are arranged in a balanced
 * grid — experience takes full width, skills/certs/education share rows.
 * Soft, approachable, structured. Like a professional profile on a
 * premium creative platform.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '12px', md: '12.5px', lg: '13.5px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.55, relaxed: 1.75 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function CreativeModernTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const SectionCard = ({ label, children, double }: { label: string; children: React.ReactNode; double?: boolean }) => (
    <div style={{
      border: `1px solid #e2e8f0`,
      borderLeft: `3px solid ${accent}`,
      borderRadius: '5px',
      padding: '10px 12px',
      backgroundColor: '#fafafa',
      ...(double ? { gridColumn: '1 / -1' } : {}),
    }}>
      <h2 style={{
        fontSize: `calc(${fontSize} * 0.8)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: accent,
        marginBottom: '7px',
      }}>
        {label}
      </h2>
      {children}
    </div>
  )

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '12mm 14mm', boxSizing: 'border-box' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px', marginBottom: `calc(${gap} * 1.2)`, paddingBottom: '10px', borderBottom: `2px solid ${accent}` }}>
        <div>
          <h1 style={{ fontSize: `calc(${fontSize} * 2.0)`, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: '#0f172a', margin: 0 }}>
            {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
          </h1>
          {personal.headline && (
            <p style={{ fontSize: `calc(${fontSize} * 1.0)`, color: accent, fontWeight: 500, marginTop: '3px' }}>
              {personal.headline}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '7mm', rowGap: gap }}>
        {visibleSections.map((section) => {
          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <SectionCard key={section.id} label={section.label} double>
                  <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
                </SectionCard>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <SectionCard key={section.id} label={section.label} double>
                  {experience.map((exp, i) => (
                    <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.7)` : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', alignItems: 'baseline' }}>
                        <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.02)`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                        <span style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(exp.dateRange)}</span>
                      </div>
                      <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.9)`, marginTop: '1px' }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                      </p>
                      {exp.description && (
                        <div style={{ marginTop: '3px', color: '#374151' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                      )}
                    </div>
                  ))}
                </SectionCard>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <SectionCard key={section.id} label={section.label}>
                  {education.map((edu, i) => (
                    <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '7px' : 0 }}>
                      <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{edu.institution}</h3>
                      <p style={{ color: '#475569' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</p>
                      <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(edu.dateRange)}</p>
                    </div>
                  ))}
                </SectionCard>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <SectionCard key={section.id} label={section.label}>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ marginBottom: '5px' }}>
                      {cat.name && <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)`, margin: 0 }}>{cat.name}</p>}
                      <p style={{ color: '#475569' }}>{cat.skills.join(', ')}</p>
                    </div>
                  ))}
                </SectionCard>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <SectionCard key={section.id} label={section.label}>
                  {projects.map((proj, i) => (
                    <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '6px' : 0 }}>
                      <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>
                        {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      </h3>
                      {proj.description && <p style={{ color: '#374151', marginTop: '2px' }}>{proj.description}</p>}
                      {proj.technologies.length > 0 && (
                        <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{proj.technologies.join(', ')}</p>
                      )}
                    </div>
                  ))}
                </SectionCard>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <SectionCard key={section.id} label={section.label}>
                  {certifications.map((cert, i) => (
                    <div key={cert.id} style={{ marginBottom: i < certifications.length - 1 ? '5px' : 0 }}>
                      <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)`, margin: 0, lineHeight: 1.3 }}>{cert.name}</p>
                      <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
                    </div>
                  ))}
                </SectionCard>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <SectionCard key={section.id} label={section.label}>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ marginBottom: '2px' }}>
                      <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}> — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                    </div>
                  ))}
                </SectionCard>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <SectionCard key={section.id} label={section.label}>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{ach.title}</span>
                      {ach.date && <span style={{ color: '#94a3b8' }}> · {formatMonthYear(ach.date)}</span>}
                    </div>
                  ))}
                </SectionCard>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <SectionCard key={section.id} label={section.label}>
                  <p style={{ color: '#374151' }}>{interests.map((i) => i.name).join(' · ')}</p>
                </SectionCard>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <SectionCard key={section.id} label={section.label}>
                  {awards.map((award) => (
                    <div key={award.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{award.title}</span>
                      <span style={{ color: '#64748b' }}> · {award.issuer}</span>
                    </div>
                  ))}
                </SectionCard>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <SectionCard key={section.id} label={section.label}>
                  {publications.map((pub) => (
                    <div key={pub.id} style={{ marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>
                        {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                      </span>
                      <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
                    </div>
                  ))}
                </SectionCard>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <SectionCard key={section.id} label={section.label} double>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${gap} 24px` }}>
                    {volunteer.map((vol) => (
                      <div key={vol.id} style={{ minWidth: '200px' }}>
                        <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{vol.role}</h3>
                        <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.9)` }}>{vol.organization}{vol.location ? ` · ${vol.location}` : ''}</p>
                        <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(vol.dateRange)}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              ) : null

            case 'references':
              return references.length > 0 ? (
                <SectionCard key={section.id} label={section.label} double>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${gap} 24px` }}>
                    {references.map((ref) => (
                      <div key={ref.id}>
                        <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{ref.name}</h3>
                        <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.85)` }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              ) : null

            default:
              return null
          }
        })}
      </div>
    </div>
  )
}
