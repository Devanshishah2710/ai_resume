/**
 * Fresher Template — Tile
 *
 * Concept: An achievement-wall / modular-tile layout inspired by gaming
 * accomplishment screens and modern social profiles. Each section is a
 * distinct tile with a colored top accent stripe, rounded corners, and
 * subtle depth. The header acts as a "player profile" card with avatar
 * treatment. The layout makes limited experience feel abundant by
 * displaying each piece of content as a valuable achievement tile.
 *
 * Target: Game design students, campus placement candidates, social-media
 * savvy graduates, entry-level applicants in creative or tech roles.
 */

import type { TemplateProps } from '@/types/template'
import { formatDateRange, formatMonthYear } from '@/utils/date'
import { FONT_OPTIONS } from '@/constants'
import { renderRichText } from '@/utils/sanitize'
import { FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP } from '@/constants/typography'

export default function FresherTileTemplate({ data, theme, sections }: TemplateProps) {
  const { personal, experience, education, projects, skills, certifications, languages, achievements, interests, awards, publications, volunteer } = data

  const fontStack = FONT_OPTIONS.find((f) => f.value === theme.fontFamily)?.css ?? 'Inter, sans-serif'
  const fontSize = FONT_SIZE_MAP[theme.fontSize]
  const lineHeight = LINE_HEIGHT_MAP[theme.lineHeight]
  const gap = SPACING_MAP[theme.spacing]
  const orange = '#F97316'
  const slate = '#475569'
  const beige = '#F8FAFC'
  const warmWhite = '#FFFFFF'

  const container: React.CSSProperties = {
    fontFamily: fontStack, fontSize, lineHeight, color: slate,
    backgroundColor: beige, width: '210mm', minHeight: '297mm',
    boxSizing: 'border-box', padding: '18mm',
    position: 'relative',
  }

  const headerTile: React.CSSProperties = {
    backgroundColor: warmWhite, borderRadius: '12px', padding: '20px 24px',
    marginBottom: `calc(${gap} * 1.5)`,
    boxShadow: '0 2px 12px rgba(71,85,105,0.06)',
    border: '1px solid rgba(71,85,105,0.04)',
    position: 'relative', overflow: 'hidden',
  }

  const headerStripe: React.CSSProperties = {
    position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
    background: `linear-gradient(to right, ${orange}, #FB923C)`,
  }

  const nameRow: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '16px',
    flexWrap: 'wrap',
  }

  const avatarCircle: React.CSSProperties = {
    width: '56px', height: '56px', borderRadius: '14px',
    backgroundColor: orange, display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '24px', fontWeight: 800,
    color: '#FFFFFF', flexShrink: 0,
  }

  const nameSection: React.CSSProperties = {
    flex: 1,
  }

  const nameStyle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 2.0)`,
    fontWeight: 800, color: '#1E293B', letterSpacing: '-0.02em',
    lineHeight: 1.15,
  }

  const headlineStyle: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.9)`, color: orange,
    fontWeight: 500, marginTop: '2px',
  }

  const contactList: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px',
  }

  const contactBadge: React.CSSProperties = {
    backgroundColor: beige, padding: '3px 10px', borderRadius: '6px',
    fontSize: `calc(${fontSize} * 0.78)`, color: slate,
    border: '1px solid rgba(71,85,105,0.06)',
    display: 'inline-flex', alignItems: 'center', gap: '4px',
  }

  const fullTile: React.CSSProperties = {
    ...headerTile, padding: '16px 20px', marginBottom: 0,
  }

  const tileStripe: React.CSSProperties = {
    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
    borderRadius: '12px 12px 0 0',
  }

  const tileTitle: React.CSSProperties = {
    fontFamily: fontStack, fontSize: `calc(${fontSize} * 0.82)`,
    fontWeight: 700, color: orange, textTransform: 'uppercase',
    letterSpacing: '0.06em', marginBottom: `calc(${gap} * 0.5)`,
    display: 'flex', alignItems: 'center', gap: '6px',
  }

  const expRowTitle: React.CSSProperties = {
    fontWeight: 600, fontSize: `calc(${fontSize} * 0.92)`,
    color: '#1E293B', marginBottom: '1px',
  }

  const expRowMeta: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.8)`, color: orange, fontWeight: 500,
  }

  const expDate: React.CSSProperties = {
    fontSize: `calc(${fontSize} * 0.75)`, color: '#94A3B8',
  }

  const chipGroup: React.CSSProperties = {
    display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px',
  }

  const chip: React.CSSProperties = {
    padding: '2px 8px', fontSize: `calc(${fontSize} * 0.75)`,
    backgroundColor: `${orange}08`, color: '#C2410C',
    borderRadius: '4px', border: `1px solid ${orange}12`,
  }

  const slateChip: React.CSSProperties = {
    ...chip, backgroundColor: `${slate}08`, color: slate,
    borderColor: `${slate}10`,
  }

  const unlockBadge: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    backgroundColor: orange, color: '#FFFFFF', padding: '3px 10px',
    borderRadius: '6px', fontSize: `calc(${fontSize} * 0.72)`,
    fontWeight: 600, marginBottom: '4px',
  }

  const strongBox: React.CSSProperties = {
    backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '10px 14px',
    border: '1px solid rgba(71,85,105,0.04)',
    marginBottom: '6px',
  }

  return (
    <div style={container}>
      <header style={headerTile}>
        <div style={headerStripe} />
        <div style={nameRow}>
          <div style={avatarCircle}>
            {personal.firstName?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div style={nameSection}>
            <h1 style={nameStyle}>
              {[personal.firstName, personal.lastName].filter(Boolean).join(' ') || 'Fresh Graduate'}
            </h1>
            {personal.headline && <p style={headlineStyle}>{personal.headline}</p>}
          </div>
        </div>
        <div style={contactList}>
          {personal.email && <span style={contactBadge}>✉ {personal.email}</span>}
          {personal.phone && <span style={contactBadge}>☎ {personal.phone}</span>}
          {personal.location && <span style={contactBadge}>📍 {personal.location}</span>}
          {personal.linkedin && <span style={contactBadge}>in {personal.linkedin}</span>}
          {personal.github && <span style={contactBadge}>gh {personal.github}</span>}
        </div>
      </header>

      {sections
        .filter(s => s.visible && s.type !== 'personal')
        .sort((a, b) => a.order - b.order)
        .map((section, idx) => {
          const colors = [orange, '#8B5CF6', '#06B6D4', '#10B981', '#EC4899', '#F59E0B']
          const tileColor = colors[idx % colors.length]

          switch (section.type) {
            case 'summary':
              return data.summary ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>🎯 Objective</h2>
                  <div style={{ color: slate, lineHeight }}
                    dangerouslySetInnerHTML={{ __html: renderRichText(data.summary) }}
                  />
                </section>
              ) : null

            case 'experience':
              return experience.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>💼 Experience</h2>
                  {experience.slice(0, 2).map((exp) => (
                    <div key={exp.id} style={strongBox}>
                      <h3 style={expRowTitle}>{exp.position}</h3>
                      <p style={expRowMeta}>{exp.company}{exp.location && ` · ${exp.location}`}</p>
                      <p style={expDate}>{formatDateRange(exp.dateRange)}</p>
                    </div>
                  ))}
                </section>
              ) : null

            case 'education':
              return education.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>🎓 Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} style={strongBox}>
                      <h3 style={expRowTitle}>{edu.institution}</h3>
                      <p style={expRowMeta}>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</p>
                      <p style={expDate}>{formatDateRange(edu.dateRange)}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                    </div>
                  ))}
                </section>
              ) : null

            case 'projects':
              return projects.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>🚀 Projects</h2>
                  {projects.map((proj) => (
                    <div key={proj.id} style={strongBox}>
                      <h3 style={expRowTitle}>
                        {proj.url ? <a href={proj.url} style={{ color: tileColor, textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                      </h3>
                      <p style={{ fontSize: `calc(${fontSize} * 0.82)`, color: '#64748B', marginTop: '2px' }}>
                        {proj.description}
                      </p>
                      <div style={chipGroup}>
                        {proj.technologies.map((tech, i) => (
                          <span key={i} style={{ ...slateChip, color: tileColor, borderColor: `${tileColor}20` }}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              ) : null

            case 'skills':
              return skills.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>⚡ Skills</h2>
                  {skills.map((cat) => (
                    <div key={cat.id} style={{ marginBottom: '8px' }}>
                      <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.85)`, color: '#1E293B', marginBottom: '3px' }}>
                        {cat.name}
                      </p>
                      <div style={chipGroup}>
                        {cat.skills.map((s, i) => (
                          <span key={i} style={chip}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              ) : null

            case 'certifications':
              return certifications.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>🏅 Certifications</h2>
                  <div style={chipGroup}>
                    {certifications.map((cert) => (
                      <span key={cert.id} style={{ ...unlockBadge, backgroundColor: tileColor }}>
                        {cert.name}
                      </span>
                    ))}
                    {certifications.map((cert) => (
                      <span key={cert.id + '-issuer'} style={{ ...slateChip }}>
                        {cert.issuer}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null

            case 'achievements':
              return achievements.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>🏆 Achievements</h2>
                  {achievements.map((ach) => (
                    <div key={ach.id} style={strongBox}>
                      <h3 style={expRowTitle}>{ach.title}</h3>
                      {ach.date && <p style={expDate}>{formatMonthYear(ach.date)}</p>}
                      {ach.description && <p style={{ fontSize: `calc(${fontSize} * 0.82)`, color: '#64748B', marginTop: '2px' }}>{ach.description}</p>}
                    </div>
                  ))}
                </section>
              ) : null

            case 'awards':
              return awards.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>🌟 Awards</h2>
                  {awards.map((award) => (
                    <div key={award.id} style={strongBox}>
                      <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)` }}>{award.title}</p>
                      <p style={expDate}>{award.issuer}{award.date && ` · ${formatMonthYear(award.date)}`}</p>
                    </div>
                  ))}
                </section>
              ) : null

            case 'volunteer':
              return volunteer.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>🤝 Volunteer</h2>
                  {volunteer.map((vol) => (
                    <div key={vol.id} style={strongBox}>
                      <h3 style={expRowTitle}>{vol.role}</h3>
                      <p style={expRowMeta}>{vol.organization}{vol.location && ` · ${vol.location}`}</p>
                      <p style={expDate}>{formatDateRange(vol.dateRange)}</p>
                    </div>
                  ))}
                </section>
              ) : null

            case 'interests':
              return interests.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>🎮 Interests</h2>
                  <div style={chipGroup}>
                    {interests.map((interest) => (
                      <span key={interest.id} style={{ ...slateChip, color: tileColor, borderColor: `${tileColor}20` }}>
                        {interest.name}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null

            case 'languages':
              return languages.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>🌐 Languages</h2>
                  <div style={chipGroup}>
                    {languages.map((lang) => (
                      <span key={lang.id} style={{ ...unlockBadge, backgroundColor: tileColor }}>
                        {lang.language}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null

            case 'publications':
              return publications.length > 0 ? (
                <section key={section.id} style={fullTile}>
                  <div style={{ ...tileStripe, background: tileColor }} />
                  <h2 style={{ ...tileTitle, color: tileColor }}>📝 Publications</h2>
                  {publications.map((pub) => (
                    <div key={pub.id} style={strongBox}>
                      <p style={{ fontWeight: 600, fontSize: `calc(${fontSize} * 0.88)` }}>
                        {pub.url ? <a href={pub.url} style={{ color: tileColor, textDecoration: 'none' }}>{pub.title}</a> : pub.title}
                      </p>
                      <p style={expDate}>{pub.publisher}{pub.date && ` · ${formatMonthYear(pub.date)}`}</p>
                    </div>
                  ))}
                </section>
              ) : null

            default:
              return null
          }
        })}
    </div>
  )
}
