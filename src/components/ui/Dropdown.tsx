/**
 * Dropdown — context menu / action menu component.
 * Used for resume card actions (rename, duplicate, delete), etc.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type DropdownItem = {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'danger'
  disabled?: boolean
  separator?: boolean
}

type DropdownProps = {
  trigger: React.ReactElement
  items: DropdownItem[]
  align?: 'left' | 'right'
}

export function Dropdown({ trigger, items, align = 'right' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative inline-flex">
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={[
              'absolute top-full mt-1 z-50 min-w-[160px]',
              'bg-[var(--color-bg-elevated)] rounded-[var(--radius-md)]',
              'border border-[var(--color-border)] shadow-[var(--shadow-lg)]',
              'py-1 overflow-hidden',
              align === 'right' ? 'right-0' : 'left-0',
            ].join(' ')}
            role="menu"
          >
            {items.map((item, i) => (
              <div key={i}>
                {item.separator && i > 0 && (
                  <div className="my-1 border-t border-[var(--color-border)]" />
                )}
                <button
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick()
                      setOpen(false)
                    }
                  }}
                  className={[
                    'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left',
                    'transition-colors duration-[var(--transition-fast)]',
                    'disabled:opacity-40 disabled:cursor-not-allowed',
                    item.variant === 'danger'
                      ? 'text-[var(--color-error)] hover:bg-[var(--color-error-subtle)]'
                      : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]',
                  ].join(' ')}
                >
                  {item.icon && (
                    <span className="h-4 w-4 shrink-0">{item.icon}</span>
                  )}
                  {item.label}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
