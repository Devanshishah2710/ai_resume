/**
 * Dropdown — context menu / action menu component.
 * Used for resume card actions (edit, preview, duplicate, rename, favorite,
 * export, share, download, delete), with nested submenu support and
 * viewport-aware positioning so the menu never goes off-screen.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type DropdownItem = {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'danger'
  disabled?: boolean
  separator?: boolean
  /** Nested menu items — renders as a fly-out submenu */
  children?: DropdownItem[]
  /** Optional trailing hint rendered on the right */
  hint?: React.ReactNode
}

type DropdownProps = {
  trigger: React.ReactElement
  items: DropdownItem[]
  align?: 'left' | 'right'
}

export function Dropdown({ trigger, items, align = 'right' }: DropdownProps) {
  return <DropdownMenu items={items} align={align} trigger={trigger} />
}

function DropdownMenu({
  items,
  align = 'right',
  trigger,
  nested = false,
  onClose,
}: DropdownProps & { nested?: boolean; onClose?: () => void }) {
  const [open, setOpen] = useState(false)
  const [direction, setDirection] = useState<'down' | 'up'>('down')
  const [submenuId, setSubmenuId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!open || nested) return
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    setDirection(spaceBelow < 260 && spaceAbove > spaceBelow ? 'up' : 'down')
  }, [open, nested])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setSubmenuId(null)
        onClose?.()
      }
    }
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setSubmenuId(null)
        onClose?.()
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [open, onClose])

  return (
    <div ref={containerRef} className="relative inline-flex">
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: direction === 'up' ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: direction === 'up' ? 4 : -4 }}
            transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={[
              'absolute z-50 min-w-[200px]',
              'bg-[var(--color-bg-elevated)] rounded-[var(--radius-md)]',
              'border border-[var(--color-border)] shadow-[var(--shadow-lg)]',
              'py-1 overflow-visible',
              align === 'right' ? 'right-0' : 'left-0',
              direction === 'up' ? 'bottom-full mb-1' : 'top-full mt-1',
            ].join(' ')}
            role="menu"
          >
            {items.map((item, i) => (
              <div key={i}>
                {item.separator && i > 0 && (
                  <div className="my-1 border-t border-[var(--color-border)]" />
                )}
                <SubmenuItem
                  item={item}
                  align={align}
                  isOpen={submenuId === String(i)}
                  onHover={() => item.children && setSubmenuId(String(i))}
                  onLeave={() => item.children && setSubmenuId((p) => (p === String(i) ? null : p))}
                  onActivate={() => {
                    if (item.children) {
                      setSubmenuId((p) => (p === String(i) ? null : String(i)))
                      return
                    }
                    if (!item.disabled && item.onClick) {
                      item.onClick()
                      setOpen(false)
                      setSubmenuId(null)
                      onClose?.()
                    }
                  }}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SubmenuItem({
  item,
  align,
  isOpen,
  onHover,
  onLeave,
  onActivate,
}: {
  item: DropdownItem
  align: 'left' | 'right'
  isOpen: boolean
  onHover: () => void
  onLeave: () => void
  onActivate: () => void
}) {
  const hasChildren = !!item.children?.length

  return (
    <div className="relative" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button
        role="menuitem"
        disabled={item.disabled}
        onClick={onActivate}
        className={[
          'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left',
          'transition-colors duration-[var(--transition-fast)]',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          item.variant === 'danger'
            ? 'text-[var(--color-error)] hover:bg-[var(--color-error-subtle)]'
            : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]',
        ].join(' ')}
      >
        {item.icon && <span className="h-4 w-4 shrink-0 flex items-center justify-center">{item.icon}</span>}
        <span className="flex-1 truncate">{item.label}</span>
        {item.hint}
        {hasChildren && (
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-tertiary)] shrink-0" />
        )}
      </button>

      {hasChildren && isOpen && (
        <div
          className={[
            'absolute top-0 z-50 min-w-[180px]',
            'bg-[var(--color-bg-elevated)] rounded-[var(--radius-md)]',
            'border border-[var(--color-border)] shadow-[var(--shadow-lg)] py-1',
            align === 'right' ? 'left-full ml-1' : 'right-full mr-1',
          ].join(' ')}
          role="menu"
        >
          {item.children!.map((child, ci) => (
            <button
              key={ci}
              role="menuitem"
              disabled={child.disabled}
              onClick={() => {
                if (!child.disabled && child.onClick) child.onClick()
              }}
              className={[
                'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left',
                'transition-colors duration-[var(--transition-fast)]',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                child.variant === 'danger'
                  ? 'text-[var(--color-error)] hover:bg-[var(--color-error-subtle)]'
                  : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]',
              ].join(' ')}
            >
              {child.icon && <span className="h-4 w-4 shrink-0 flex items-center justify-center">{child.icon}</span>}
              <span className="flex-1 truncate">{child.label}</span>
              {child.hint}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
