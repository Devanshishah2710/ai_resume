/**
 * Professional Executive Boardroom Template
 *
 * Premium centered header, then a balanced two-column grid of sections with
 * soft gray dividers and a minimal blue accent. Spacious, structured, board-
 * level corporate presentation.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'


export default function ProfessionalBoardroomTemplate({ data, theme }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer, references } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Times New Roman", Georgia, serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor

  const cardTitle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.92)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: accent,
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '5px',
    marginBottom: '8px',
  }

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', padding: '13mm 14mm', boxSizing: 'border-box' }}>
      {/* Premium header */}
      <header style={{ textAlign: 'center', marginBottom: `calc(${gap} * 1.2)` }}>
        <h1 style={{ fontFamily: displayStack, fontSize: `calc(${fontSize} * 2.2)`, fontWeight: 400, letterSpacing: '0.04em', color: '#0f172a', lineHeight: 1 }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: '#475569', marginTop: '6px', fontStyle: 'italic' }}>{personal.headline}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 18px', marginTop: '12px', color: '#475569', fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <a href={personal.website} style={{ color: '#475569', textDecoration: 'none' }}>{personal.website}</a>}
        </div>
      </header>

      {/* Balanced grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: '11mm', rowGap: gap }}>
        {data.summary && (
          <Card title="Executive Summary" titleStyle={cardTitle} span>
            <p style={{ color: '#334155' }}>{data.summary}</p>
          </Card>
        )}

        <Card title="Experience" titleStyle={cardTitle} span>
          {experience.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.7)` : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.02)` }}>{exp.position || 'Position'}</h3>
                <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.85)` }}>{formatDateRange(exp.dateRange)}</span>
              </div>
              <p style={{ color: accent, fontWeight: 600 }}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
              {exp.description && <div style={{ marginTop: '4px', color: '#334155' }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />}
            </div>
          ))}
        </Card>

        <Card title="Education" titleStyle={cardTitle}>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '6px' }}>
              <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
              <p style={{ color: '#64748b' }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
              <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(edu.dateRange)}</p>
            </div>
          ))}
        </Card>

        <Card title="Skills" titleStyle={cardTitle}>
          {skills.map((cat) => (
            <div key={cat.id} style={{ marginBottom: '6px' }}>
              {cat.name && <p style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 0.86)`, marginBottom: '2px' }}>{cat.name}</p>}
              <p style={{ color: '#475569' }}>{cat.skills.join(', ')}</p>
            </div>
          ))}
        </Card>

        <Card title="Projects" titleStyle={cardTitle}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '6px' }}>
              <h3 style={{ fontWeight: 700 }}>
                {proj.url ? <a href={proj.url} style={{ color: accent, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
              </h3>
              {proj.description && <p style={{ color: '#334155', marginTop: '2px' }}>{proj.description}</p>}
            </div>
          ))}
        </Card>

        <Card title="Certifications" titleStyle={cardTitle}>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '5px' }}>
              <p style={{ fontWeight: 700, lineHeight: 1.3 }}>{cert.name}</p>
              <p style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>{cert.issuer} · {formatMonthYear(cert.date)}</p>
            </div>
          ))}
        </Card>

        <Card title="Languages" titleStyle={cardTitle}>
          {languages.map((lang) => (
            <div key={lang.id} style={{ marginBottom: '3px' }}>
              <strong>{lang.language}</strong> <span style={{ color: '#64748b', fontSize: `calc(${fontSize} * 0.82)` }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span>
            </div>
          ))}
        </Card>

        <Card title="Achievements" titleStyle={cardTitle}>
          {achievements.map((ach) => (
            <div key={ach.id} style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 700 }}>{ach.title}</span>
              {ach.date && <span style={{ color: '#64748b' }}> · {formatMonthYear(ach.date)}</span>}
            </div>
          ))}
        </Card>

        <Card title="Awards" titleStyle={cardTitle}>
          {awards.map((award) => (
            <div key={award.id} style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 700 }}>{award.title}</span>
              <span style={{ color: '#64748b' }}> · {award.issuer}</span>
            </div>
          ))}
        </Card>

        <Card title="Publications" titleStyle={cardTitle}>
          {publications.map((pub) => (
            <div key={pub.id} style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 700 }}>
                {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
              </span>
              <span style={{ color: '#64748b' }}> · {pub.publisher}</span>
            </div>
          ))}
        </Card>

        <Card title="Volunteer" titleStyle={cardTitle}>
          {volunteer.map((vol) => (
            <div key={vol.id} style={{ marginBottom: '6px' }}>
              <h3 style={{ fontWeight: 700 }}>{vol.role}</h3>
              <p style={{ color: accent, fontWeight: 600 }}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
              <p style={{ color: '#94a3b8', fontSize: `calc(${fontSize} * 0.82)` }}>{formatDateRange(vol.dateRange)}</p>
            </div>
          ))}
        </Card>

        {references.length > 0 && (
          <Card title="References" titleStyle={cardTitle}>
            {references.map((ref) => (
              <div key={ref.id} style={{ marginBottom: '5px' }}>
                <h3 style={{ fontWeight: 700 }}>{ref.name}</h3>
                <p style={{ color: '#64748b' }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
              </div>
            ))}
          </Card>
        )}

        {interests.length > 0 && (
          <Card title="Interests" titleStyle={cardTitle} span>
            <p style={{ color: '#334155' }}>{interests.map((i) => i.name).join(' · ')}</p>
          </Card>
        )}
      </div>
    </div>
  )
}

function Card({ title, titleStyle, span, children }: { title: string; titleStyle: React.CSSProperties; span?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ ...(span ? { gridColumn: '1 / -1' } : undefined) }}>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </div>
  )
}
