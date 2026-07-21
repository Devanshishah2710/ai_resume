/**
 * Modern Split Template
 *
 * Designer brief: a centered, airy name block floating above a wide two-column
 * body. Left column is the experience narrative; right column stacks skills,
 * education, and credentials. Large whitespace, centered accents, and a quiet
 * dividing line give it a premium, gallery-like calm.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '12.5px', md: '13px', lg: '14px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.6, relaxed: 1.75 }
const SPACING_MAP = { compact: '14px', normal: '22px', spacious: '30px' }

export default function ModernSplitTemplate({ data, theme }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const leftTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 1.1)`,
    fontWeight: 700,
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: `calc(${gap} * 0.5)`,
  }
  const rightTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.95)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: accent,
    textAlign: 'center',
    marginBottom: '10px',
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '16mm 18mm', boxSizing: 'border-box' }}>
      {/* Centered header */}
      <header style={{ textAlign: 'center', marginBottom: `calc(${gap} * 1.5)` }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2.4)`, fontWeight: 300, letterSpacing: '0.06em', color: '#0f172a', lineHeight: 1.05 }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, marginTop: '6px', letterSpacing: '0.02em' }}>{personal.headline}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 20px', marginTop: '12px', color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <a href={personal.website} style={{ color: '#64748b', textDecoration: 'none' }}>{personal.website}</a>}
        </div>
        <div style={{ width: '60px', height: '2px', backgroundColor: accent, margin: '14px auto 0' }} />
      </header>

      {/* Two columns */}
      <div style={{ display: 'flex', gap: '16mm' }}>
        {/* Left: experience + projects + volunteer + publications */}
        <div style={{ flex: '1.4', minWidth: 0 }}>
          <SectionTitle style={leftTitle}>Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <h3 style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 1.05)` }}>{exp.position || 'Position'}</h3>
                <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(exp.dateRange)}</span>
              </div>
              <p style={{ color: accent, fontWeight: 500 }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
              {exp.description && <div style={{ marginTop: '4px', color: '#334155' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />}
            </div>
          ))}

          {projects.length > 0 && (
            <>
              <SectionTitle style={{ ...leftTitle, marginTop: gap }}>Projects</SectionTitle>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontWeight: 600 }}>
                    {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                    {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
                  </h3>
                  {proj.description && <p style={{ color: '#334155', marginTop: '3px' }}>{proj.description}</p>}
                </div>
              ))}
            </>
          )}

          {volunteer.length > 0 && (
            <>
              <SectionTitle style={{ ...leftTitle, marginTop: gap }}>Volunteer</SectionTitle>
              {volunteer.map((vol) => (
                <div key={vol.id} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                    <h3 style={{ fontWeight: 600 }}>{vol.role}</h3>
                    <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(vol.dateRange)}</span>
                  </div>
                  <p style={{ color: accent, fontWeight: 500 }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                  {vol.description && <p style={{ color: '#334155', marginTop: '3px' }}>{vol.description}</p>}
                </div>
              ))}
            </>
          )}

          {publications.length > 0 && (
            <>
              <SectionTitle style={{ ...leftTitle, marginTop: gap }}>Publications</SectionTitle>
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
        </div>

        {/* Right: skills + education + certs + languages + achievements + awards */}
        <div style={{ flex: '1', minWidth: 0, borderLeft: `1px solid #e2e8f0`, paddingLeft: '12mm' }}>
          <SectionTitle style={rightTitle}>Skills</SectionTitle>
          {skills.map((cat) => (
            <div key={cat.id} style={{ marginBottom: '8px' }}>
              {cat.name && <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.9)`, marginBottom: '3px' }}>{cat.name}</p>}
              <p style={{ color: '#475569' }}>{cat.skills.join(' · ')}</p>
            </div>
          ))}

          <SectionTitle style={{ ...rightTitle, marginTop: gap }}>Education</SectionTitle>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <h3 style={{ fontWeight: 600 }}>{edu.institution}</h3>
              <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
              <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.85)` }}>{formatDateRange(edu.dateRange)}</p>
            </div>
          ))}

          {certifications.length > 0 && (
            <>
              <SectionTitle style={{ ...rightTitle, marginTop: gap }}>Certifications</SectionTitle>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontWeight: 600, lineHeight: 1.3 }}>{cert.name}</p>
                  <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
                </div>
              ))}
            </>
          )}

          {languages.length > 0 && (
            <>
              <SectionTitle style={{ ...rightTitle, marginTop: gap }}>Languages</SectionTitle>
              {languages.map((lang) => (
                <div key={lang.id} style={{ marginBottom: '4px', textAlign: 'center' }}>
                  <strong>{lang.language}</strong> <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
                </div>
              ))}
            </>
          )}

          {achievements.length > 0 && (
            <>
              <SectionTitle style={{ ...rightTitle, marginTop: gap }}>Achievements</SectionTitle>
              {achievements.map((ach) => (
                <div key={ach.id} style={{ marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{ach.title}</span>
                  {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
                </div>
              ))}
            </>
          )}

          {awards.length > 0 && (
            <>
              <SectionTitle style={{ ...rightTitle, marginTop: gap }}>Awards</SectionTitle>
              {awards.map((award) => (
                <div key={award.id} style={{ marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{award.title}</span>
                  <span style={{ color: '#64748b' }}> · {award.issuer}</span>
                </div>
              ))}
            </>
          )}

          {interests.length > 0 && (
            <>
              <SectionTitle style={{ ...rightTitle, marginTop: gap }}>Interests</SectionTitle>
              <p style={{ color: '#475569', textAlign: 'center' }}>{interests.map((i) => i.name).join(' · ')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <h2 style={style}>{children}</h2>
}
