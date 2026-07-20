/**
 * Modern Timeline Template
 *
 * Designer brief: a compact name with a horizontal contact bar directly
 * beneath it, then a single-column document where Experience is rendered as a
 * left-railed timeline. Section titles are bold and bracketed for a strong,
 * editorial hierarchy. Minimal, professional, scan-friendly.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '11px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.35, normal: 1.55, relaxed: 1.7 }
const SPACING_MAP = { compact: '12px', normal: '18px', spacious: '24px' }

export default function ModernTimelineTemplate({ data, theme }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const titleStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 1.2)`,
    fontWeight: 800,
    color: '#0f172a',
    marginBottom: `calc(${gap} * 0.5)`,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '14mm 15mm', boxSizing: 'border-box' }}>
      {/* Name + contact bar */}
      <header style={{ marginBottom: `calc(${gap} * 1.2)` }}>
        <h1 style={{ fontSize: `calc(${fontSize} * 2.1)`, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1 }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, fontWeight: 500, marginTop: '4px' }}>{personal.headline}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '4px 16px', marginTop: '12px', padding: '8px 0', borderTop: `2px solid ${accent}`, borderBottom: `1px solid #e2e8f0`, color: '#475569', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>☏ {personal.phone}</span>}
          {personal.location && <span>⌖ {personal.location}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.github && <span>gh {personal.github}</span>}
          {personal.website && <a href={personal.website} style={{ color: '#475569', textDecoration: 'none' }}>⬡ {personal.website}</a>}
        </div>
      </header>

      {data.summary && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Summary</h2>
          <p style={{ color: '#334155' }}>{data.summary}</p>
        </section>
      )}

      <section style={{ marginBottom: gap }}>
        <h2 style={titleStyle}><Bracket />Experience</h2>
        <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '14px' }}>
          {experience.map((exp) => (
            <div key={exp.id} style={{ position: 'relative', marginBottom: `calc(${gap} * 0.85)` }}>
              <span style={{ position: 'absolute', left: '-20px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: accent, border: '2px solid #fff' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.05)` }}>{exp.position || 'Position'}</h3>
                <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(exp.dateRange)}</span>
              </div>
              <p style={{ color: accent, fontWeight: 600 }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
              {exp.description && <div style={{ marginTop: '4px', color: '#334155' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />}
            </div>
          ))}
        </div>
      </section>

      {education.length > 0 && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
              <div>
                <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
                <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
              </div>
              <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(edu.dateRange)}</span>
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <h3 style={{ fontWeight: 700 }}>
                {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
              </h3>
              {proj.description && <p style={{ color: '#334155', marginTop: '3px' }}>{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {skills.map((cat) => (
              <div key={cat.id} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'baseline' }}>
                {cat.name && <span style={{ fontWeight: 700, minWidth: '100px', color: '#334155' }}>{cat.name}:</span>}
                <span style={{ color: '#475569' }}>{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '5px' }}>
              <span><span style={{ fontWeight: 700 }}>{cert.name}</span> <span style={{ color: '#64748b' }}>· {cert.issuer}</span></span>
              <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatMonthYear(cert.date)}</span>
            </div>
          ))}
        </section>
      )}

      {languages.length > 0 && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {languages.map((lang) => (
              <span key={lang.id}><strong>{lang.language}</strong> <span style={{ color: '#64748b' }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
            ))}
          </div>
        </section>
      )}

      {achievements.length > 0 && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Achievements</h2>
          {achievements.map((ach) => (
            <div key={ach.id} style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 700 }}>{ach.title}</span>
              {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
            </div>
          ))}
        </section>
      )}

      {awards.length > 0 && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Awards</h2>
          {awards.map((award) => (
            <div key={award.id} style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 700 }}>{award.title}</span>
              <span style={{ color: '#64748b' }}> · {award.issuer}</span>
              {award.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(award.date)}</span>}
            </div>
          ))}
        </section>
      )}

      {publications.length > 0 && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Publications</h2>
          {publications.map((pub) => (
            <div key={pub.id} style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 700 }}>
                {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
              </span>
              <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
              {pub.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(pub.date)}</span>}
            </div>
          ))}
        </section>
      )}

      {volunteer.length > 0 && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Volunteer</h2>
          {volunteer.map((vol) => (
            <div key={vol.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <h3 style={{ fontWeight: 700 }}>{vol.role}</h3>
                <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(vol.dateRange)}</span>
              </div>
              <p style={{ color: accent, fontWeight: 600 }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
              {vol.description && <p style={{ color: '#334155', marginTop: '3px' }}>{vol.description}</p>}
            </div>
          ))}
        </section>
      )}

      {interests.length > 0 && (
        <section style={{ marginBottom: gap }}>
          <h2 style={titleStyle}><Bracket />Interests</h2>
          <p style={{ color: '#334155' }}>{interests.map((i) => i.name).join(' · ')}</p>
        </section>
      )}
    </div>
  )
}

function Bracket() {
  return <span style={{ color: '#cbd5e1', fontWeight: 400 }}>[</span>
}
