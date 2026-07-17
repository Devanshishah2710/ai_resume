/**
 * HTML sanitization utilities.
 *
 * Resume descriptions can contain basic formatting (bold, italic, lists).
 * We sanitize before rendering to prevent XSS.
 *
 * This is a lightweight allow-list approach suitable for resume content.
 * For a production app requiring rich text, use DOMPurify.
 */

const ALLOWED_TAGS = new Set([
  'b', 'strong', 'i', 'em', 'u', 'br', 'p',
  'ul', 'ol', 'li', 'a', 'span',
])

const ALLOWED_ATTRS: Record<string, string[]> = {
  a: ['href', 'target', 'rel'],
  span: ['class'],
}

/**
 * Strips all HTML tags not in the allow-list.
 * Safe for use in dangerouslySetInnerHTML.
 */
export function sanitizeHtml(html: string): string {
  // Use a temporary DOM element for parsing — browser handles encoding
  const div = document.createElement('div')
  div.innerHTML = html

  function cleanNode(node: Node): void {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element
      const tagName = el.tagName.toLowerCase()

      if (!ALLOWED_TAGS.has(tagName)) {
        // Replace disallowed tag with its text content
        el.replaceWith(document.createTextNode(el.textContent ?? ''))
        return
      }

      // Remove disallowed attributes
      const allowed = ALLOWED_ATTRS[tagName] ?? []
      Array.from(el.attributes).forEach((attr) => {
        if (!allowed.includes(attr.name)) {
          el.removeAttribute(attr.name)
        }
      })

      // Force links to open in new tab safely
      if (tagName === 'a') {
        el.setAttribute('target', '_blank')
        el.setAttribute('rel', 'noopener noreferrer')
        // Block javascript: URLs
        const href = el.getAttribute('href') ?? ''
        if (href.toLowerCase().startsWith('javascript:')) {
          el.removeAttribute('href')
        }
      }
    }

    // Recursively clean children
    Array.from(node.childNodes).forEach(cleanNode)
  }

  Array.from(div.childNodes).forEach(cleanNode)
  return div.innerHTML
}

/**
 * Converts plain text with newlines to HTML paragraphs.
 * Used when a description field contains plain text (not HTML).
 */
export function textToHtml(text: string): string {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join('')
}

/**
 * Sanitizes a rich-text description and converts newlines to <br/>.
 *
 * Resume descriptions are free-text that may contain basic inline formatting
 * (bold, italic, lists). We sanitize against an allow-list before rendering
 * with dangerouslySetInnerHTML, and convert literal newlines to <br/> so
 * plain multi-line input still renders with line breaks.
 *
 * Safe for use in dangerouslySetInnerHTML.
 */
export function renderRichText(html: string): string {
  if (!html) return ''
  return sanitizeHtml(html).replace(/\n/g, '<br/>')
}

/**
 * Escapes HTML special characters to prevent XSS.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
