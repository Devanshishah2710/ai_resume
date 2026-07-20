/**
 * Executive Premium Corporate Template
 *
 * Identity: Premium Corporate. A restrained left-aligned masthead gives way to
 * a grid of elegantly titled blocks — each section reads like a numbered
 * dossier entry with refined uppercase titles and generous whitespace. The
 * index-grid rhythm signals precision and order, distinct from single-column
 * or sidebar executive layouts.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS, LANGUAGE_PROFICIENCY_LABELS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'

const FONT_SIZE_MAP = { sm: '10.5px', md: '11.5px', lg: '12.5px' }
const LINE_HEIGHT_MAP = { tight: 1.45, normal: 1.65, relaxed: 1.85 }
const SPACING_MAP = { compact: '14px', normal: '24px', spacious: '34px' }

export default function ExecutivePremiumTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, references, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const displayStack = '"Playfair Display", Georgia, serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const accent = theme.primaryColor
  const ink = '#1c2430'
  const muted = '#5b6675'

  const visibleSections = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const titleStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.85)`,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: accent,
    marginBottom: '10px',
  }

  const renderSection = (section: (typeof visibleSections)[number], index: number) => {
    const num = String(index + 1).padStart(2, '0')
    const head = (
      <h2 style={titleStyle}>
        <span style={{ color: muted, marginRight: '10px', fontWeight: 400 }}>{num}</span>
        {section.type === 'summary' ? 'Executive Summary'
          : section.type === 'experience' ? 'Leadership Experience'
          : section.type === 'projects' ? 'Strategic Initiatives'
          : section.type === 'skills' ? 'Core Competencies'
          : section.type === 'achievements' ? 'Key Achievements'
          : section.type === 'education' ? 'Education'
          : section.type === 'certifications' ? 'Credentials'
          : section.type === 'languages' ? 'Languages'
          : section.type === 'interests' ? 'Interests'
          : section.type === 'awards' ? 'Awards & Honors'
          : section.type === 'publications' ? 'Publications'
          : section.type === 'references' ? 'References'
          : section.type === 'volunteer' ? 'Board & Service'
          : section.label}
      </h2>
    )

    switch (section.type) {
      case 'summary':
        return data.summary ? (
          <section key={section.id} style={{ marginBottom: gap, gridColumn: '1 / -1' }}>
            {head}
            <p style={{ color: '#374151', fontStyle: 'italic', lineHeight, fontSize: `calc(${fontSize} * 1.02)` }}>{data.summary}</p>
          </section>
        ) : null

      case 'experience':
        return experience.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap, gridColumn: '1 / -1' }}>
            {head}
            {experience.map((exp, i) => (
              <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? `calc(${gap} * 0.8)` : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: `calc(${fontSize} * 1.1)`, color: ink }}>{exp.position}</h3>
                  <span style={{ color: muted, fontSize: `calc(${fontSize} * 0.88)`, whiteSpace: 'nowrap' }}>{formatDateRange(exp.dateRange)}</span>
                </div>
                <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.95)` }}>
                  {exp.company}{exp.location && `  ·  ${exp.location}`}
                </p>
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#374151', lineHeight }} dangerouslySetInnerHTML={{ __html: renderRichText(exp.description) }} />
                )}
              </div>
            ))}
          </section>
        ) : null

      case 'projects':
        return projects.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '8px' }}>
                <h3 style={{ fontWeight: 700, color: ink }}>{proj.name}</h3>
                {proj.description && <p style={{ color: '#374151', lineHeight, marginTop: '3px' }}>{proj.description}</p>}
              </div>
            ))}
          </section>
        ) : null

      case 'skills':
        return skills.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {skills.map((cat) => (
                <div key={cat.id}>
                  <span style={{ fontWeight: 700, color: ink, fontSize: `calc(${fontSize} * 0.92)` }}>{cat.name}</span>
                  <div style={{ color: '#374151' }}>{cat.skills.join(', ')}</div>
                </div>
              ))}
            </div>
          </section>
        ) : null

      case 'achievements':
        return achievements.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
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

      case 'education':
        return education.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <h3 style={{ fontWeight: 700, color: ink }}>{edu.institution}</h3>
                <p style={{ color: muted }}>{[edu.degree, edu.field].filter(Boolean).join(', ')}{edu.gpa && `  ·  GPA ${edu.gpa}`}</p>
                <p style={{ color: muted, fontSize: `calc(${fontSize} * 0.88)` }}>{formatDateRange(edu.dateRange)}</p>
              </div>
            ))}
          </section>
        ) : null

      case 'certifications':
        return certifications.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '5px' }}>
                <span style={{ fontWeight: 600, color: ink }}>{cert.name}</span>
                <div style={{ color: muted }}>{cert.issuer}  ·  {formatMonthYear(cert.date)}</div>
              </div>
            ))}
          </section>
        ) : null

      case 'languages':
        return languages.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {languages.map((lang) => (
                <span key={lang.id}><strong style={{ color: ink }}>{lang.language}</strong> <span style={{ color: muted }}>— {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency]}</span></span>
              ))}
            </div>
          </section>
        ) : null

      case 'interests':
        return interests.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
            <p style={{ color: '#374151' }}>{interests.map((i) => i.name).join('  ·  ')}</p>
          </section>
        ) : null

      case 'awards':
        return awards.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
            {awards.map((award) => (
              <div key={award.id} style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: ink }}>{award.title}</span>
                <div style={{ color: muted }}>{award.issuer}{award.date && `  ·  ${formatMonthYear(award.date)}`}</div>
              </div>
            ))}
          </section>
        ) : null

      case 'publications':
        return publications.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
            {publications.map((pub) => (
              <div key={pub.id} style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: ink }}>
                  {pub.url ? <a href={pub.url} style={{ color: accent, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                </span>
                <div style={{ color: muted }}>{pub.publisher}</div>
              </div>
            ))}
          </section>
        ) : null

      case 'references':
        return references.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: `calc(${gap}) 24px` }}>
              {references.map((ref) => (
                <div key={ref.id} style={{ minWidth: '180px' }}>
                  <h3 style={{ fontWeight: 700, color: ink }}>{ref.name}</h3>
                  <p style={{ color: muted }}>{[ref.position, ref.company].filter(Boolean).join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null

      case 'volunteer':
        return volunteer.length > 0 ? (
          <section key={section.id} style={{ marginBottom: gap }}>
            {head}
            {volunteer.map((vol) => (
              <div key={vol.id} style={{ marginBottom: '8px' }}>
                <h3 style={{ fontWeight: 700, color: ink }}>{vol.role}</h3>
                <p style={{ fontWeight: 600, color: accent, fontSize: `calc(${fontSize} * 0.95)` }}>{vol.organization}</p>
              </div>
            ))}
          </section>
        ) : null

      default:
        return null
    }
  }

  // Render with section index for numbering.
  const orderedForNumbering = visibleSections.filter((s) => s.type !== 'summary' || data.summary)

  return (
    <div style={{ fontFamily: fontStack, fontSize, lineHeight, color: theme.textColor, backgroundColor: theme.backgroundColor, width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}>
      {/* ── Masthead ── */}
      <header style={{ padding: '18mm 20mm 12mm', borderBottom: `1px solid ${RAIL_PREM}` }}>
        <h1 style={{ fontFamily: displayStack, fontSize: `calc(${fontSize} * 2.8)`, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1, color: ink }}>
          {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Your Name'}
        </h1>
        {personal.headline && (
          <p style={{ fontSize: `calc(${fontSize} * 1.05)`, color: accent, marginTop: '6px', fontWeight: 500, letterSpacing: '0.03em' }}>{personal.headline}</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 22px', marginTop: '12px', color: muted, fontSize: `calc(${fontSize} * 0.9)` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </header>

      {/* ── Index-grid body ── */}
      <div style={{ padding: '16mm 20mm 20mm', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20mm', rowGap: '0', alignItems: 'start' }}>
        {orderedForNumbering.map((section, i) => renderSection(section, i))}
      </div>
    </div>
  )
}

const RAIL_PREM = '#e6e9ee'
