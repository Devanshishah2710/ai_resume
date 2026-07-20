/**
 * Executive Senior Leadership Template
 *
 * Identity: Senior Leadership. A compact corporate header anchors a document
 * built around a vertical experience timeline on the left and a generous
 * "Impact & Recognition" rail on the right — achievements, awards, and
 * credentials are given prominence befitting a seasoned executive.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10.5px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.6, relaxed: 1.8 }
const SPACING_MAP = { compact: '12px', normal: '18px', spacious: '26px' }

const RAIL = '#e7ebf0'
const SOFT = '#8a93a3'

export default function ExecutiveSeniorTemplate({ data, theme }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Playfair Display", Georgia, serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor
  const ink = '#1c2430'
  const muted = '#5b6675'

  const railTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.92)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: ink,
    paddingLeft: '10px',
    borderLeft: `3px solid ${accent}`,
    marginBottom: '8px',
  }

  const timelineTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 1.05)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color: ink,
    paddingLeft: '10px',
    borderLeft: `3px solid ${accent}`,
    marginBottom: '10px',
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}>
      {/* ── Compact corporate header ── */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px', padding: '16mm 18mm 12mm', borderBottom: `2px solid ${ink}` }}>
        <div>
          <h1 style={{ fontFamily: displayStack, fontSize: `calc(${fontSize} * 2.6)`, fontWeight: 600, lineHeight: 1, color: ink }}>
            {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
          </h1>
          {personal.headline && (
            <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, marginTop: '5px', fontWeight: 500 }}>{personal.headline}</p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', color: muted, fontSize: `calc(${fontSize} * 0.88)`, textAlign: 'right' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </header>

      {/* ── Executive summary band ── */}
      {data.summary && (
        <div style={{ padding: '12mm 18mm 0' }}>
          <p style={{ color: '#374151', fontStyle: 'italic', lineHeight, fontSize: `calc(${fontSize} * 1.02)` }}>{data.summary}</p>
        </div>
      )}

      {/* ── Two-column: timeline (left) + impact rail (right) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', columnGap: '14mm', padding: '14mm 18mm 18mm', alignItems: 'start' }}>
        {/* Left: timeline experience */}
        <div>
          {experience.length > 0 && (
            <section style={{ marginBottom: gap }}>
              <h2 style={timelineTitle}>Leadership Experience</h2>
              <div style={{ borderLeft: `2px solid ${RAIL}`, paddingLeft: '14px' }}>
                {experience.map((exp, i) => (
                  <div key={exp.id} style={{ position: 'relative', marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.9)` : 0 }}>
                    <span style={{ position: 'absolute', left: '-19px', top: '5px', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: accent, border: '2px solid #fff' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.08)`, color: ink }}>{exp.position}</h3>
                      <span style={{ color: SOFT, fontSize: `calc(${fontSize} * 0.85)`, whiteSpace: 'nowrap' }}>{formatDateRange(exp.dateRange)}</span>
                    </div>
                    <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.94)` }}>{exp.company}{exp.location && `  ·  ${exp.location}`}</p>
                    {exp.description && (
                      <div style={{ marginTop: '4px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section style={{ marginBottom: gap }}>
              <h2 style={timelineTitle}>Strategic Initiatives</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontWeight: 700, color: ink }}>{proj.name}</h3>
                  {proj.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 style={timelineTitle}>Education</h2>
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
          )}
        </div>

        {/* Right: impact & recognition */}
        <div style={{ backgroundColor: '#fafbfc', padding: '12px 14px', borderRadius: '2px' }}>
          {achievements.length > 0 && (
            <section style={{ marginBottom: gap }}>
              <h2 style={railTitle}>Key Achievements</h2>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#374151' }}>
                {achievements.map((ach) => (
                  <li key={ach.id} style={{ marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: ink }}>{ach.title}</span>
                    {ach.date && <span style={{ color: muted, fontWeight: 400 }}>  ·  {formatMonthYear(ach.date)}</span>}
                    {ach.description && <div style={{ color: '#374151' }}>{ach.description}</div>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {awards.length > 0 && (
            <section style={{ marginBottom: gap }}>
              <h2 style={railTitle}>Awards & Honors</h2>
              {awards.map((award) => (
                <div key={award.id} style={{ marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: ink }}>{award.title}</span>
                  <div style={{ color: muted }}>{award.issuer}{award.date && `  ·  ${formatMonthYear(award.date)}`}</div>
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section style={{ marginBottom: gap }}>
              <h2 style={railTitle}>Credentials</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <span style={{ fontWeight: 600, color: ink }}>{cert.name}</span>
                  <div style={{ color: muted }}>{cert.issuer}  ·  {formatMonthYear(cert.date)}</div>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section style={{ marginBottom: gap }}>
              <h2 style={railTitle}>Core Competencies</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {skills.flatMap((cat) => cat.skills).map((skill, i) => (
                  <span key={i} style={{ padding: '2px 8px', backgroundColor: '#fff', border: `1px solid ${RAIL}`, borderRadius: '2px', fontSize: `calc(${fontSize} * 0.88)`, color: ink }}>{skill}</span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section style={{ marginBottom: gap }}>
              <h2 style={railTitle}>Languages</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#374151' }}>
                {languages.map((lang) => (
                  <span key={lang.id}>{lang.language} — {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                ))}
              </div>
            </section>
          )}

          {publications.length > 0 && (
            <section style={{ marginBottom: gap }}>
              <h2 style={railTitle}>Publications</h2>
              {publications.map((pub) => (
                <div key={pub.id} style={{ marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: ink }}>
                    {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                  </span>
                  <div style={{ color: muted }}>{pub.publisher}</div>
                </div>
              ))}
            </section>
          )}

          {volunteer.length > 0 && (
            <section>
              <h2 style={railTitle}>Board & Service</h2>
              {volunteer.map((vol) => (
                <div key={vol.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontWeight: 700, color: ink, fontSize: `calc(${fontSize} * 0.98)` }}>{vol.role}</h3>
                  <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.92)` }}>{vol.organization}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
