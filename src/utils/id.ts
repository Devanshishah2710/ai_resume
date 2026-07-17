/**
 * Generates a short, collision-resistant unique ID.
 * Uses crypto.randomUUID() where available (all modern browsers).
 * Falls back to Math.random() for environments without crypto.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback — extremely unlikely collision in practice
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
