/**
 * Executive Leadership Sidebar Template
 *
 * Identity: Leadership Sidebar. A slim, tinted left rail holds the executive
 * profile, contact details, core competencies, and languages, while a wide
 * right column carries the experience-led narrative. The rail/chrome split
 * reads as a personal dossier — distinct from any full-width or centered
 * executive layout.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10.5px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.6, relaxed: 1.8 }
const SPACING_MAP = { compact: '12px', normal: '18px', spacious: '26px' }

export default function ExecutiveSidebarTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, awards, publications, references, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Playfair Display", Georgia, serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor
  const ink = '#1c2430'
  const muted = '#5b6675'
  const railBg = '#f4f1ec'

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const railTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.82)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: accent,
    borderBottom: `1px solid ${accent}`,
    paddingBottom: '4px',
    marginBottom: '8px',
  }

  const mainTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 1.05)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: ink,
    marginBottom: `calc(${gap} * 0.6)`,
  }

  const railContent = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={railTitle}>Profile</h2>
        {personal.headline && <p style={{ color: '#374151', fontSize: `calc(${fontSize} * 0.92)`, lineHeight }}>{personal.headline}</p>}
        {data.summary && <p style={{ color: '#374151', fontSize: `calc(${fontSize} * 0.92)`, lineHeight, marginTop: '8px' }}>{data.summary}</p>}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h2 style={railTitle}>Contact</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: muted, fontSize: `calc(${fontSize} * 0.88)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {skills.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={railTitle}>Competencies</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {skills.map((cat) => (
              <div key={cat.id}>
                <span style={{ fontWeight: 700, color: ink, fontSize: `calc(${fontSize} * 0.9)` }}>{cat.name}</span>
                <div style={{ color: '#374151', fontSize: `calc(${fontSize} * 0.88)` }}>{cat.skills.join(', ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {languages.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={railTitle}>Languages</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#374151', fontSize: `calc(${fontSize} * 0.88)` }}>
            {languages.map((lang) => (
              <span key={lang.id}>{lang.language} — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div>
          <h2 style={railTitle}>Credentials</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: '#374151', fontSize: `calc(${fontSize} * 0.88)` }}>
            {certifications.map((cert) => (
              <span key={cert.id}>{cert.name} <span style={{ color: muted }}>({cert.issuer})</span></span>
            ))}
          </div>
        </div>
      )}
    </>
  )

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* ── Left rail ── */}
        <aside style={{ width: '33%', backgroundColor: railBg, padding: '16mm 10mm', boxSizing: 'border-box' }}>
          <h1 style={{ fontFamily: displayStack, fontSize: `calc(${fontSize} * 1.9)`, fontWeight: 600, lineHeight: 1.05, color: ink }}>
            {[personal.firstName, personal.lastName].filter(Boolean).join(' ').split(' ').map((n, i, arr) => (
              <span key={n}>
                {i === arr.length - 1 ? <span style={{ color: accent }}>{n}</span> : <>{n} </>}
              </span>
            ))}
          </h1>
          {railContent}
        </aside>

        {/* ── Right content ── */}
        <main style={{ width: '67%', padding: '16mm 16mm', boxSizing: 'border-box' }}>
          {visibleSections.map((section) => {
            switch (section.type) {
              case 'summary':
                return null

              case 'experience':
                return experience.length > 0 ? (
                  <section key={section.id} style={{ marginBottom: gap }}>
                    <h2 style={mainTitle}>Leadership Experience</h2>
                    {experience.map((exp, i) => (
                      <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                          <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.12)`, color: ink }}>{exp.position}</h3>
                          <span style={{ color: muted, fontSize: `calc(${fontSize} * 0.88)`, whiteSpace: 'nowrap' }}>{formatDateRange(exp.dateRange)}</span>
                        </div>
                        <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.96)` }}>
                          {exp.company}{exp.location && `  ·  ${exp.location}`}
                        </p>
                        {exp.description && (
                          <div style={{ marginTop: '5px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                        )}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'education':
                return education.length > 0 ? (
                  <section key={section.id} style={{ marginBottom: gap }}>
                    <h2 style={mainTitle}>Education</h2>
                    {education.map((edu) => (
                      <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        <div>
                          <h3 style={{ fontWeight: 700, color: ink }}>{edu.institution}</h3>
                          <p style={{ color: muted }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && `  ·  GPA ${edu.gpa}`}</p>
                        </div>
                        <span style={{ color: muted, fontSize: `calc(${fontSize} * 0.88)`, whiteSpace: 'nowrap' }}>{formatDateRange(edu.dateRange)}</span>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'achievements':
                return achievements.length > 0 ? (
                  <section key={section.id} style={{ marginBottom: gap }}>
                    <h2 style={mainTitle}>Key Achievements</h2>
                    <ul style={{ margin: 0, paddingLeft: '18px', color: '#374151' }}>
                      {achievements.map((ach) => (
                        <li key={ach.id} style={{ marginBottom: '5px' }}>
                          <span style={{ fontWeight: 600, color: ink }}>{ach.title}</span>
                          {ach.description && <span> — {ach.description}</span>}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null

              case 'projects':
                return projects.length > 0 ? (
                  <section key={section.id} style={{ marginBottom: gap }}>
                    <h2 style={mainTitle}>Strategic Initiatives</h2>
                    {projects.map((proj) => (
                      <div key={proj.id} style={{ marginBottom: '8px' }}>
                        <h3 style={{ fontWeight: 700, color: ink }}>{proj.name}</h3>
                        {proj.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'awards':
                return awards.length > 0 ? (
                  <section key={section.id} style={{ marginBottom: gap }}>
                    <h2 style={mainTitle}>Awards & Honors</h2>
                    {awards.map((award) => (
                      <div key={award.id} style={{ marginBottom: '6px' }}>
                        <span style={{ fontWeight: 600, color: ink }}>{award.title}</span>
                        <span style={{ color: muted }}>  ·  {award.issuer}</span>
                        {award.date && <span style={{ color: muted }}>  ·  {formatMonthYear(award.date)}</span>}
                      </div>
                    ))}
                  </section>
                ) : null

              case 'publications':
                return publications.length > 0 ? (
                  <section key={section.id} style={{ marginBottom: gap }}>
                    <h2 style={mainTitle}>Publications</h2>
                    {publications.map((pub) => (
                      <div key={pub.id} style={{ marginBottom: '6px' }}>
                        <span style={{ fontWeight: 600, color: ink }}>
                          {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                        </span>
                        <span style={{ color: muted }}>  ·  {pub.publisher}</span>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'references':
                return references.length > 0 ? (
                  <section key={section.id} style={{ marginBottom: gap }}>
                    <h2 style={mainTitle}>References</h2>
                    {references.map((ref) => (
                      <div key={ref.id} style={{ marginBottom: '6px' }}>
                        <span style={{ fontWeight: 600, color: ink }}>{ref.name}</span>
                        <span style={{ color: muted }}> — {[ref.position, ref.company].filter(Boolean).join(', ')}</span>
                      </div>
                    ))}
                  </section>
                ) : null

              case 'volunteer':
                return volunteer.length > 0 ? (
                  <section key={section.id} style={{ marginBottom: gap }}>
                    <h2 style={mainTitle}>Board & Community</h2>
                    {volunteer.map((vol) => (
                      <div key={vol.id} style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                          <h3 style={{ fontWeight: 700, color: ink }}>{vol.role}</h3>
                          <span style={{ color: muted, fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(vol.dateRange)}</span>
                        </div>
                        <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.95)` }}>{vol.organization}</p>
                      </div>
                    ))}
                  </section>
                ) : null

              default:
                return null
            }
          })}
        </main>
      </div>
    </div>
  )
}
