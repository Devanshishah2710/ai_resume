/**
 * Professional Edge Template
 *
 * Full-width elegant header band with a serif display name and a single
 * horizontal contact line, then a single-column body with heavy double-rule
 * section dividers. Premium, editorial, corporate.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { EDGE_DATA } from '@/templates/sampleData'

const FONT_SIZE_MAP = { sm: '12.5px', md: '13.5px', lg: '14.5px' }
const LINE_HEIGHT_MAP = { tight: 1.4, normal: 1.6, relaxed: 1.75 }
const SPACING_MAP = { compact: '14px', normal: '20px', spacious: '26px' }

export default function ProfessionalEdgeTemplate({ theme }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, achievements, languages, awards, publications, volunteer } = EDGE_DATA
  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Playfair Display", Georgia, serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const titleStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 1.05)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: accent,
    borderBottom: `2px solid ${accent}`,
    paddingBottom: '5px',
    marginBottom: `calc(${gap} * 0.6)`,
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '0', boxSizing: 'border-box' }}>
      {/* Full-width header band */}
      <header style={{ backgroundColor: accent, color: '#fff', padding: '16mm 16mm 12mm', textAlign: 'center' }}>
        <h1 style={{ fontFamily: displayStack, fontSize: `calc(${fontSize} * 2.8)`, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.01em' }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.15)`, color: 'rgba(255,255,255,0.85)', marginTop: '8px', fontWeight: 300 }}>{personal.headline}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 20px', marginTop: '14px', color: 'rgba(255,255,255,0.92)', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <a href={personal.website} style={{ color: 'inherit', textDecoration: 'none' }}>{personal.website}</a>}
        </div>
      </header>

      <div style={{ padding: '14mm 16mm' }}>
        {personal.summary && (
          <section style={{ marginBottom: gap }}>
            <h2 style={titleStyle}>Summary</h2>
            <p style={{ color: '#334155' }}>{personal.summary}</p>
          </section>
        )}
        <Section title="Experience" titleStyle={titleStyle} gap={gap}>
          {experience.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.08)` }}>{exp.position || 'Position'}</h3>
                <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(exp.dateRange)}</span>
              </div>
              <p style={{ color: accent, fontWeight: 600 }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
              {exp.description && <div style={{ marginTop: '5px', color: '#334155' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />}
            </div>
          ))}
        </Section>
        <Section title="Education" titleStyle={titleStyle} gap={gap}>
          {education.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
              <div>
                <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
                <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
              </div>
              <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(edu.dateRange)}</span>
            </div>
          ))}
        </Section>
        <Section title="Projects" titleStyle={titleStyle} gap={gap}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <h3 style={{ fontWeight: 700 }}>
                {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                {proj.technologies.length > 0 && <span style={{ color: '#64748b', fontWeight: 400, fontSize: `calc(${fontSize} * 0.9)` }}> · {proj.technologies.join(', ')}</span>}
              </h3>
              {proj.description && <p style={{ color: '#334155', marginTop: '3px' }}>{proj.description}</p>}
            </div>
          ))}
        </Section>
        <Section title="Skills" titleStyle={titleStyle} gap={gap}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.flatMap((cat) => cat.skills).map((s, i) => (
              <span key={i} style={{ padding: '3px 12px', border: `1px solid ${accent}`, borderRadius: '2px', fontSize: `calc(${fontSize} * 0.88)`, color: accent }}>{s}</span>
            ))}
          </div>
        </Section>
        <Section title="Certifications" titleStyle={titleStyle} gap={gap}>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '5px' }}>
              <span><span style={{ fontWeight: 600 }}>{cert.name}</span> <span style={{ color: '#64748b' }}>· {cert.issuer}</span></span>
              <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatMonthYear(cert.date)}</span>
            </div>
          ))}
        </Section>
        <Section title="Achievements" titleStyle={titleStyle} gap={gap}>
          {achievements.map((ach) => (
            <div key={ach.id} style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 600 }}>{ach.title}</span>
              {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
            </div>
          ))}
        </Section>
        <Section title="Awards" titleStyle={titleStyle} gap={gap}>
          {awards.map((award) => (
            <div key={award.id} style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 600 }}>{award.title}</span>
              <span style={{ color: '#64748b' }}> · {award.issuer}</span>
            </div>
          ))}
        </Section>
        <Section title="Publications" titleStyle={titleStyle} gap={gap}>
          {publications.map((pub) => (
            <div key={pub.id} style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 600 }}>
                {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
              </span>
              <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
            </div>
          ))}
        </Section>
        <Section title="Languages" titleStyle={titleStyle} gap={gap}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {languages.map((lang) => (
              <span key={lang.id}><strong>{lang.language}</strong> <span style={{ color: '#64748b' }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
            ))}
          </div>
        </Section>
        <Section title="Volunteer" titleStyle={titleStyle} gap={gap}>
          {volunteer.map((vol) => (
            <div key={vol.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <h3 style={{ fontWeight: 700 }}>{vol.role}</h3>
                <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.9)` }}>{formatDateRange(vol.dateRange)}</span>
              </div>
              <p style={{ color: accent, fontWeight: 600 }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
            </div>
          ))}
        </Section>
      </div>
    </div>
  )
}

function Section({ title, titleStyle, gap, children }: { title: string; titleStyle: React.CSSProperties; gap: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: gap }}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </section>
  )
}
