/**
 * Modern Sidebar Template
 *
 * Designer brief: a slim 25% left rail (white text on a solid dark accent)
 * holding contact + skills + languages, with a wide 75% right column driven
 * by experience. The right column leads with a large name block and groups
 * the narrative sections in a tight, experience-first order.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'


export default function ModernSidebarTemplate({ data, theme }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const entryTitle = (color: string): React.CSSProperties => ({
    fontSize: `calc(${fontSize} * 0.8)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    color,
    marginBottom: '8px',
  })

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', display: 'flex', boxSizing: 'border-box' }}>
      {/* Slim sidebar */}
      <aside style={{ width: '25%', backgroundColor: accent, color: '#fff', padding: '14mm 6mm', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 1.35)`, fontWeight: 700, lineHeight: 1.1 }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>

        <div style={{ marginTop: '16px' }}>
          <h2 style={entryTitle('rgba(255,255,255,0.7)')}>Contact</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: `calc(${fontSize} * 0.92)`, color: 'rgba(255,255,255,0.9)' }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.github && <span>{personal.github}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </div>

        {skills.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h2 style={entryTitle('rgba(255,255,255,0.7)')}>Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {skills.flatMap((cat) => cat.skills).slice(0, 14).map((s, i) => (
                <span key={i} style={{ fontSize: `calc(${fontSize} * 0.88)`, color: 'rgba(255,255,255,0.92)' }}>— {s}</span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h2 style={entryTitle('rgba(255,255,255,0.7)')}>Languages</h2>
            {languages.map((lang) => (
              <div key={lang.id} style={{ fontSize: `calc(${fontSize} * 0.88)`, color: 'rgba(255,255,255,0.92)', marginBottom: '3px' }}>
                {lang.language} <span style={{ color: 'rgba(255,255,255,0.6)' }}>· {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: '14mm 12mm', boxSizing: 'border-box' }}>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.1)`, color: accent, fontWeight: 500, marginBottom: '4px' }}>{personal.headline}</p>
        )}

        <SectionTitle>Experience</SectionTitle>
        {experience.map((exp, i) => (
          <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? '12px' : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
              <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.05)` }}>{exp.position || 'Position'}</h3>
              <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(exp.dateRange)}</span>
            </div>
            <p style={{ color: accent, fontWeight: 600 }}>{exp.company}{exp.location && ` — ${exp.location}`}</p>
            {exp.description && <div style={{ marginTop: '4px', color: '#334155' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />}
          </div>
        ))}

        <SectionTitle style={{ marginTop: gap }}>Education</SectionTitle>
        {education.map((edu) => (
          <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
            <div>
              <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
              <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
            </div>
            <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(edu.dateRange)}</span>
          </div>
        ))}

        {projects.length > 0 && (
          <>
            <SectionTitle style={{ marginTop: gap }}>Projects</SectionTitle>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '8px' }}>
                <h3 style={{ fontWeight: 700 }}>
                  {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                  {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
                </h3>
                {proj.description && <p style={{ color: '#334155', marginTop: '3px' }}>{proj.description}</p>}
              </div>
            ))}
          </>
        )}

        {certifications.length > 0 && (
          <>
            <SectionTitle style={{ marginTop: gap }}>Certifications</SectionTitle>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '5px' }}>
                <span style={{ fontWeight: 600 }}>{cert.name}</span> <span style={{ color: '#64748b' }}>· {cert.issuer} · {formatMonthYear(cert.date)}</span>
              </div>
            ))}
          </>
        )}

        {volunteer.length > 0 && (
          <>
            <SectionTitle style={{ marginTop: gap }}>Volunteer</SectionTitle>
            {volunteer.map((vol) => (
              <div key={vol.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <h3 style={{ fontWeight: 700 }}>{vol.role}</h3>
                  <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(vol.dateRange)}</span>
                </div>
                <p style={{ color: accent, fontWeight: 600 }}>{vol.organization}{vol.location && ` — ${vol.location}`}</p>
                {vol.description && <p style={{ color: '#334155', marginTop: '3px' }}>{vol.description}</p>}
              </div>
            ))}
          </>
        )}

        {publications.length > 0 && (
          <>
            <SectionTitle style={{ marginTop: gap }}>Publications</SectionTitle>
            {publications.map((pub) => (
              <div key={pub.id} style={{ marginBottom: '5px' }}>
                <span style={{ fontWeight: 600 }}>
                  {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                </span>
                <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
              </div>
            ))}
          </>
        )}

        {achievements.length > 0 && (
          <>
            <SectionTitle style={{ marginTop: gap }}>Achievements</SectionTitle>
            {achievements.map((ach) => (
              <div key={ach.id} style={{ marginBottom: '5px' }}>
                <span style={{ fontWeight: 600 }}>{ach.title}</span>
                {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
              </div>
            ))}
          </>
        )}

        {awards.length > 0 && (
          <>
            <SectionTitle style={{ marginTop: gap }}>Awards</SectionTitle>
            {awards.map((award) => (
              <div key={award.id} style={{ marginBottom: '5px' }}>
                <span style={{ fontWeight: 600 }}>{award.title}</span>
                <span style={{ color: '#64748b' }}> · {award.issuer}</span>
              </div>
            ))}
          </>
        )}

        {interests.length > 0 && (
          <>
            <SectionTitle style={{ marginTop: gap }}>Interests</SectionTitle>
            <p style={{ color: '#334155' }}>{interests.map((i) => i.name).join(' · ')}</p>
          </>
        )}
      </main>
    </div>
  )
}

function SectionTitle({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{ fontSize: `calc(11px * 1.05)`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0f172a', borderBottom: '2px solid #0f172a', paddingBottom: '4px', marginBottom: '10px', ...style }}>
      {children}
    </h2>
  )
}
