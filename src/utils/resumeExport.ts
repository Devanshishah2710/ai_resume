/**
 * resumeExport — generate PDF / Word documents from a resume without
 * needing the live builder preview DOM.
 *
 * Renders the selected template into a detached, off-screen container so the
 * export works from anywhere (e.g. the dashboard cards). PDF uses html2pdf.js;
 * Word output is a Word-compatible HTML document saved as .docx.
 */

import { createRoot, type Root } from 'react-dom/client'
import { createElement, Suspense } from 'react'
import { templateRegistry } from '@/templates/registry'
import { renderRichText } from '@/utils/sanitize'
import { resumeService } from '@/services/resume.service'
import { PDF_CONFIG } from '@/constants'
import type { Resume } from '@/types/resume'

export type ExportFormat = 'pdf' | 'docx'

const safeFilename = (title: string) =>
  `${title.replace(/[^a-zA-Z0-9 _-]/g, '').trim() || 'resume'}`

function renderResumeToElement(resume: Resume): { node: HTMLDivElement; root: Root } {
  const node = document.createElement('div')
  // Fixed, off-screen positioning so layout computes at true A4 width.
  node.style.position = 'fixed'
  node.style.left = '-10000px'
  node.style.top = '0'
  node.style.width = `${PDF_CONFIG.PAGE_WIDTH_MM * (PDF_CONFIG.DPI / 25.4)}px`
  node.style.background = '#ffffff'
  node.style.zIndex = '-1'
  node.style.pointerEvents = 'none'
  document.body.appendChild(node)

  const root = createRoot(node)
  const TemplateComponent = templateRegistry[resume.templateId]?.component
  if (!TemplateComponent) throw new Error('Template not found')

  root.render(
    createElement(
      Suspense,
      { fallback: null },
      createElement(TemplateComponent, {
        data: resume.data,
        theme: resume.theme,
        sections: resume.sections,
        isPreview: true,
      })
    )
  )

  return { node, root }
}

/** Wait until the rendered template has painted content (handles lazy chunks). */
function waitForContent(node: HTMLElement, timeoutMs = 5000): Promise<void> {
  return new Promise((resolve) => {
    const start = Date.now()
    const tick = () => {
      if (node.querySelector('h1, h2, [class]') || Date.now() - start > timeoutMs) {
        resolve()
      } else {
        requestAnimationFrame(tick)
      }
    }
    tick()
  })
}

function buildWordHtml(resume: Resume): string {
  const { data, sections } = resume
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const visible = [...sections]
    .filter((s) => s.visible && s.type !== 'personal')
    .sort((a, b) => a.order - b.order)

  const blocks: string[] = []

  blocks.push(
    `<h1>${esc([data.personal.firstName, data.personal.lastName].filter(Boolean).join(' '))}</h1>`
  )
  if (data.personal.headline) blocks.push(`<h3>${esc(data.personal.headline)}</h3>`)
  const contact = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.linkedin,
    data.personal.github,
    data.personal.website,
  ].filter(Boolean).join('  •  ')
  if (contact) blocks.push(`<p>${esc(contact)}</p>`)

  for (const section of visible) {
    switch (section.type) {
      case 'summary':
        if (data.summary) blocks.push(`<h2>${esc(section.label)}</h2><p>${esc(data.summary)}</p>`)
        break
      case 'experience':
        if (data.experience.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const e of data.experience) {
            blocks.push(
              `<p><strong>${esc(e.position)}</strong> — ${esc(e.company)}${e.location ? `, ${esc(e.location)}` : ''}</p>`
            )
            if (e.description) blocks.push(`<p>${renderRichText(e.description)}</p>`)
          }
        }
        break
      case 'education':
        if (data.education.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const e of data.education) {
            blocks.push(
              `<p><strong>${esc(e.institution)}</strong> — ${esc([e.degree, e.field].filter(Boolean).join(', '))}</p>`
            )
          }
        }
        break
      case 'projects':
        if (data.projects.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const p of data.projects) {
            blocks.push(`<p><strong>${esc(p.name)}</strong> — ${esc(p.technologies.join(', '))}</p>`)
            if (p.description) blocks.push(`<p>${esc(p.description)}</p>`)
          }
        }
        break
      case 'skills':
        if (data.skills.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const c of data.skills) {
            blocks.push(`<p><strong>${esc(c.name)}:</strong> ${esc(c.skills.join(', '))}</p>`)
          }
        }
        break
      case 'certifications':
        if (data.certifications.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const c of data.certifications) {
            blocks.push(`<p><strong>${esc(c.name)}</strong> — ${esc(c.issuer)}</p>`)
          }
        }
        break
      case 'achievements':
        if (data.achievements.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const a of data.achievements) {
            blocks.push(`<p><strong>${esc(a.title)}</strong> — ${esc(a.description)}</p>`)
          }
        }
        break
      case 'languages':
        if (data.languages.length) {
          blocks.push(`<h2>${esc(section.label)}</h2><p>${data.languages.map((l) => esc(l.language)).join(', ')}</p>`)
        }
        break
      case 'interests':
        if (data.interests.length) {
          blocks.push(`<h2>${esc(section.label)}</h2><p>${data.interests.map((i) => esc(i.name)).join(', ')}</p>`)
        }
        break
      case 'awards':
        if (data.awards.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const a of data.awards) {
            blocks.push(`<p><strong>${esc(a.title)}</strong> — ${esc(a.issuer)}</p>`)
          }
        }
        break
      case 'publications':
        if (data.publications.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const p of data.publications) {
            blocks.push(`<p><strong>${esc(p.title)}</strong> — ${esc(p.publisher)}</p>`)
          }
        }
        break
      case 'references':
        if (data.references.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const r of data.references) {
            blocks.push(
              `<p><strong>${esc(r.name)}</strong> — ${esc(r.position)}, ${esc(r.company)}${r.email ? ` (${esc(r.email)})` : ''}</p>`
            )
          }
        }
        break
      case 'volunteer':
        if (data.volunteer.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const v of data.volunteer) {
            blocks.push(`<p><strong>${esc(v.role)}</strong> — ${esc(v.organization)}</p>`)
            if (v.description) blocks.push(`<p>${esc(v.description)}</p>`)
          }
        }
        break
      case 'custom': {
        const customId = section.customId
        const customData = customId ? data.custom[customId] : null
        if (customData?.entries.length) {
          blocks.push(`<h2>${esc(section.label)}</h2>`)
          for (const entry of customData.entries) {
            blocks.push(`<p><strong>${esc(entry.title)}</strong>${entry.subtitle ? ` — ${esc(entry.subtitle)}` : ''}</p>`)
            if (entry.description) blocks.push(`<p>${esc(entry.description)}</p>`)
          }
        }
        break
      }
    }
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:Calibri,Arial,sans-serif;color:#222;line-height:1.4;padding:36pt;}
    h1{font-size:24pt;margin:0 0 4pt;} h2{font-size:14pt;border-bottom:1px solid #ccc;margin:14pt 0 4pt;}
    h3{font-size:12pt;margin:0 0 6pt;color:#555;} p{margin:0 0 4pt;}
  </style></head><body>${blocks.join('\n')}</body></html>`
}

export async function exportResume(resume: Resume, format: ExportFormat): Promise<void> {
  const filename = safeFilename(resume.title)

  if (format === 'docx') {
    const html = buildWordHtml(resume)
    const blob = new Blob([html], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    triggerDownload(url, `${filename}.docx`)
    URL.revokeObjectURL(url)
    await resumeService.recordDownload(resume.id, 'docx').catch(() => {})
    return
  }

  const { node, root } = renderResumeToElement(resume)

  try {
    await waitForContent(node)
    const html2pdf = ((await import('html2pdf.js')) as any).default ?? (await import('html2pdf.js'))
    const pageWidthPx = Math.round(PDF_CONFIG.PAGE_WIDTH_MM * (PDF_CONFIG.DPI / 25.4))

    await html2pdf().set({
      margin: 0,
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: PDF_CONFIG.SCALE,
        useCORS: true,
        logging: false,
        width: pageWidthPx,
        windowWidth: pageWidthPx,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    }).from(node).save()

    await resumeService.recordDownload(resume.id, 'pdf').catch(() => {})
  } finally {
    root.unmount()
    node.remove()
  }
}

function triggerDownload(url: string, name: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()
  link.remove()
}
