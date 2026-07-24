import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TooltipProps = {
  content: string
  children: React.ReactElement
  side?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export function Tooltip({ content, children, side = 'top', delay = 300 }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    const t = setTimeout(() => setVisible(true), delay)
    setTimer(t)
  }

  const hide = () => {
    if (timer) clearTimeout(timer)
    setVisible(false)
  }

  const POSITION = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-0',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            role="tooltip"
            className={[
              'absolute z-50 pointer-events-none whitespace-nowrap',
              'bg-[var(--color-text-primary)] text-[var(--color-text-inverse)]',
               'text-xs px-2.5 py-1.5 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)]',
              POSITION[side],
            ].join(' ')}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
