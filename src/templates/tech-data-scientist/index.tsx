import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10px', md: '10.5px', lg: '11.5px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.5, relaxed: 1.7 }
const SPACING_MAP = { compact: '10px', normal: '14px', spacious: '20px' }

export default function TechDataScientistTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const AltSection = ({ label, children, alt }: { label: string; children: React.ReactNode; alt: boolean }) => (
    <div style={{
      padding: alt ? '12px 14px' : 0,
      backgroundColor: alt ? '#f8fafc' : 'transparent',
      borderRadius: alt ? '6px' : 0,
      marginBottom: gap,
      transition: 'background-color 0.2s',
    }}>
      <h2 style={{
        fontSize: `calc(${fontSize} * 0.8)`,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: accent,
        marginBottom: '7px',
        borderBottom: `1px solid ${alt ? '#e2e8f0' : 'transparent'}`,
        paddingBottom: '4px',
      }}>
        {label}
      </h2>
      {children}
    </div>
  )

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '14mm 16mm', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: `calc(${gap} * 1.4)`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: `calc(${fontSize} * 2.4)`, fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
          </h1>
          {personal.headline && (
            <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, fontWeight: 400, fontStyle: 'italic', marginTop: '2px' }}>
              {personal.headline}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', color: '#64748b', fontSize: `calc(${fontSize} * 0.82)`, textAlign: 'right' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </header>

      {visibleSections.map((section) => {
        const idx = visibleSections.indexOf(section)
        switch (section.type) {
          case 'summary':
            return data.summary ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                <p style={{ color: '#374151', lineHeight }}>{data.summary}</p>
              </AltSection>
            ) : null

          case 'experience':
            return experience.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                {experience.map((exp, i) => (
                  <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? gap : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', alignItems: 'baseline' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.02)`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                      <span style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)`, whiteSpace: 'nowrap' }}>{formatDateRange(exp.dateRange)}</span>
                    </div>
                    <p style={{
                      fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
                      color: accent,
                      fontWeight: 500,
                      fontSize: `calc(${fontSize} * 0.85)`,
                      marginTop: '1px',
                      letterSpacing: '-0.01em',
                    }}>
                      {exp.company}{exp.location ? ` \u2014 ${exp.location}` : ''}
                    </p>
                    {exp.description && (
                      <div style={{ marginTop: '3px', color: '#374151', fontSize: `calc(${fontSize} * 0.9)` }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                    )}
                  </div>
                ))}
              </AltSection>
            ) : null

          case 'skills':
            return skills.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px',
                      padding: '8px 10px',
                      backgroundColor: theme.backgroundColor,
                    }}>
                      {cat.name && <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.85)`, marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat.name}</p>}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 6px' }}>
                        {cat.skills.map((skill) => (
                          <span key={skill} style={{
                            color: '#475569',
                            fontSize: `calc(${fontSize} * 0.82)`,
                            lineHeight: 1.5,
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AltSection>
            ) : null

          case 'projects':
            return projects.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
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
                      <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.8)`, marginTop: '2px', fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace' }}>
                        {proj.technologies.join('  \u00b7  ')}
                      </p>
                    )}
                  </div>
                ))}
              </AltSection>
            ) : null

          case 'education':
            return education.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                {education.map((edu, i) => (
                  <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '7px' : 0 }}>
                    <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{edu.institution}</h3>
                    <p style={{ color: '#475569', marginTop: '1px' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa ? ` \u00b7 GPA ${edu.gpa}` : ''}</p>
                    <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(edu.dateRange)}</p>
                  </div>
                ))}
              </AltSection>
            ) : null

          case 'certifications':
            return certifications.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                {certifications.map((cert, i) => (
                  <div key={cert.id} style={{ marginBottom: i < certifications.length - 1 ? '5px' : 0 }}>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)`, margin: 0 }}>{cert.name}</p>
                    <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>{cert.issuer} \u00b7 {formatMonthYear(cert.date)}</p>
                  </div>
                ))}
              </AltSection>
            ) : null

          case 'languages':
            return languages.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
                  {languages.map((lang) => (
                    <span key={lang.id} style={{ color: '#374151' }}>
                      <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                      <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}> \u2014 {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                    </span>
                  ))}
                </div>
              </AltSection>
            ) : null

          case 'achievements':
            return achievements.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                {achievements.map((ach) => (
                  <div key={ach.id} style={{ marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)` }}>{ach.title}</span>
                    {ach.date && <span style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}> \u00b7 {formatMonthYear(ach.date)}</span>}
                  </div>
                ))}
              </AltSection>
            ) : null

          case 'interests':
            return interests.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
                  {interests.map((i) => (
                    <span key={i.id} style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.88)` }}>
                      {i.name}
                    </span>
                  ))}
                </div>
              </AltSection>
            ) : null

          case 'awards':
            return awards.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                {awards.map((award) => (
                  <div key={award.id} style={{ marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.88)` }}>{award.title}</span>
                    <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}> \u00b7 {award.issuer}</span>
                  </div>
                ))}
              </AltSection>
            ) : null

          case 'publications':
            return publications.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                {publications.map((pub) => (
                  <div key={pub.id} style={{ marginBottom: '5px' }}>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.9)`, margin: 0 }}>
                      {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                    </p>
                    <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px' }}>{pub.publisher}{pub.date ? ` \u00b7 ${formatMonthYear(pub.date)}` : ''}</p>
                  </div>
                ))}
              </AltSection>
            ) : null

          case 'volunteer':
            return volunteer.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                {volunteer.map((vol, i) => (
                  <div key={vol.id} style={{ marginBottom: i < volunteer.length - 1 ? '6px' : 0 }}>
                    <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{vol.role}</h3>
                    <p style={{ color: accent, fontWeight: 500, fontSize: `calc(${fontSize} * 0.88)` }}>{vol.organization}{vol.location ? ` \u2014 ${vol.location}` : ''}</p>
                    <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)`, marginTop: '1px' }}>{formatDateRange(vol.dateRange)}</p>
                  </div>
                ))}
              </AltSection>
            ) : null

          case 'references':
            return references.length > 0 ? (
              <AltSection key={section.id} label={section.label} alt={idx % 2 === 0}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
                  {references.map((ref) => (
                    <div key={ref.id}>
                      <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: `calc(${fontSize} * 0.95)`, margin: 0 }}>{ref.name}</h3>
                      <p style={{ color: '#475569', fontSize: `calc(${fontSize} * 0.85)` }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                    </div>
                  ))}
                </div>
              </AltSection>
            ) : null

          default:
            return null
        }
      })}
    </div>
  )
}
