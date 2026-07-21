import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10px', md: '10.5px', lg: '11.5px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.5, relaxed: 1.7 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function TechCloudEngineeringTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const SectionTitle = ({ label }: { label: string }) => (
    <h2 style={{
      fontSize: `calc(${fontSize} * 0.78)`,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      color: accent,
      marginBottom: '8px',
      borderBottom: `2px solid ${accent}`,
      paddingBottom: '4px',
    }}>
      {label}
    </h2>
  )

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, background: `repeating-linear-gradient(65deg, transparent, transparent 28px, ${accent}04 28px, ${accent}04 29px), ${theme.backgroundColor}`, width: '210mm', minHeight: '297mm', padding: '14mm 16mm', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: `calc(${gap} * 1.2)` }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2.2)`, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.0)`, color: accent, fontWeight: 500, marginTop: '2px', marginBottom: '6px' }}>
            {personal.headline}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', color: '#64748b', fontSize: `calc(${fontSize} * 0.85)`, marginBottom: '10px' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {(() => {
            const stats: { label: string; value: string }[] = []
            if (experience.length > 0) {
              const years = experience.reduce((max, e) => {
                const start = e.dateRange.startDate ? parseInt(e.dateRange.startDate.slice(0, 4)) : 0
                return Math.max(max, start)
              }, 0)
              const currentYear = new Date().getFullYear()
              if (years > 0) stats.push({ label: 'Experience', value: `${currentYear - years}+ Years` })
            }
            if (projects.length > 0) stats.push({ label: 'Projects', value: `${projects.length}+` })
            if (certifications.length > 0) stats.push({ label: 'Certifications', value: `${certifications.length}` })
            if (languages.length > 0) stats.push({ label: 'Languages', value: `${languages.length}` })
            return stats.map((s) => (
              <div key={s.label} style={{
                border: `1px solid ${accent}30`,
                borderRadius: '4px',
                padding: '4px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: `${accent}08`,
              }}>
                <span style={{ fontSize: `calc(${fontSize} * 0.7)`, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</span>
                <span style={{ fontSize: `calc(${fontSize} * 0.9)`, fontWeight: 700, color: accent }}>{s.value}</span>
              </div>
            ))
          })()}
        </div>
      </header>

      {visibleSections.map((section) => {
        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
              </div>
            ) : null

          case 'experience':
            return experience.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                {experience.map((exp, i) => (
                  <div key={exp.id} style={{
                    marginBottom: i < experience.length - 1 ? gap : 0,
                    borderLeft: `3px solid ${accent}`,
                    paddingLeft: '12px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', alignItems: 'baseline' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.02)`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                      <span style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)`, whiteSpace: 'nowrap' }}>{formatDateRange(exp.dateRange)}</span>
                    </div>
                    <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.9)`, marginTop: '1px' }}>
                      {exp.company}{exp.location ? ` \u2014 ${exp.location}` : ''}
                    </p>
                    {exp.description && (
                      <div style={{ marginTop: '3px', color: '#374151', fontSize: `calc(${fontSize} * 0.9)` }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                    )}
                  </div>
                ))}
              </div>
            ) : null

          case 'skills':
            return skills.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                {skills.map((cat) => (
                  <div key={cat.id} style={{ marginBottom: '6px' }}>
                    {cat.name && <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)`, marginBottom: '3px' }}>{cat.name}</p>}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {cat.skills.map((skill) => (
                        <span key={skill} style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          fontSize: `calc(${fontSize} * 0.78)`,
                          fontWeight: 500,
                          color: '#fff',
                          backgroundColor: accent,
                          borderRadius: '3px',
                          lineHeight: 1.5,
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null

          case 'certifications':
            return certifications.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px',
                      padding: '8px 10px',
                    }}>
                      <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.85)`, margin: 0, lineHeight: 1.3 }}>{cert.name}</p>
                      <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.78)`, marginTop: '2px' }}>
                        {cert.issuer}{cert.date ? ` \u00b7 ${formatMonthYear(cert.date)}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null

          case 'projects':
            return projects.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                {projects.map((proj, i) => (
                  <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '8px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', alignItems: 'baseline' }}>
                      <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>
                        {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      </h3>
                      {proj.dateRange && <span style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(proj.dateRange)}</span>}
                    </div>
                    {proj.description && <p style={{ color: '#374151', marginTop: '2px', fontSize: `calc(${fontSize} * 0.9)` }}>{proj.description}</p>}
                    {proj.technologies.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
                        {proj.technologies.map((tech) => (
                          <span key={tech} style={{
                            display: 'inline-block',
                            padding: '1px 6px',
                            fontSize: `calc(${fontSize} * 0.75)`,
                            color: accent,
                            border: `1px solid ${accent}25`,
                            borderRadius: '3px',
                            lineHeight: 1.5,
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : null

          case 'education':
            return education.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                {education.map((edu, i) => (
                  <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '7px' : 0 }}>
                    <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{edu.institution}</h3>
                    <p style={{ color: '#475569', marginTop: '1px' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa ? ` \u00b7 GPA ${edu.gpa}` : ''}</p>
                    <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(edu.dateRange)}</p>
                  </div>
                ))}
              </div>
            ) : null

          case 'languages':
            return languages.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
                  {languages.map((lang) => (
                    <span key={lang.id} style={{ color: '#374151' }}>
                      <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}> \u2014 {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                    </span>
                  ))}
                </div>
              </div>
            ) : null

          case 'achievements':
            return achievements.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                {achievements.map((ach) => (
                  <div key={ach.id} style={{ marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)` }}>{ach.title}</span>
                    {ach.date && <span style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}> \u00b7 {formatMonthYear(ach.date)}</span>}
                  </div>
                ))}
              </div>
            ) : null

          case 'interests':
            return interests.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
                  {interests.map((i) => (
                    <span key={i.id} style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.88)` }}>
                      {i.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null

          case 'awards':
            return awards.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                {awards.map((award) => (
                  <div key={award.id} style={{ marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)` }}>{award.title}</span>
                    <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}> \u00b7 {award.issuer}</span>
                  </div>
                ))}
              </div>
            ) : null

          case 'publications':
            return publications.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                {publications.map((pub) => (
                  <div key={pub.id} style={{ marginBottom: '5px' }}>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.9)`, margin: 0 }}>
                      {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                    </p>
                    <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px' }}>{pub.publisher}{pub.date ? ` \u00b7 ${formatMonthYear(pub.date)}` : ''}</p>
                  </div>
                ))}
              </div>
            ) : null

          case 'volunteer':
            return volunteer.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                {volunteer.map((vol, i) => (
                  <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '6px' : 0 }}>
                    <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{vol.role}</h3>
                    <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.88)` }}>{vol.organization}{vol.location ? ` \u2014 ${vol.location}` : ''}</p>
                    <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px' }}>{formatDateRange(vol.dateRange)}</p>
                  </div>
                ))}
              </div>
            ) : null

          case 'references':
            return references.length > 0 ? (
              <div key={section.id} style={{ marginBottom: gap }}>
                <SectionTitle label={section.label} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
                  {references.map((ref) => (
                    <div key={ref.id}>
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
  )
}
