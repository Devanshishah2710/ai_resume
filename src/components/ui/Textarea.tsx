/**
 * Textarea component with auto-resize capability.
 */

import { forwardRef, useId, useEffect, useRef, useCallback } from 'react'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  helperText?: string
  error?: string
  autoResize?: boolean
  minRows?: number
  maxRows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      autoResize = true,
      minRows = 3,
      maxRows = 12,
      className = '',
      id: propId,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = propId ?? generatedId
    const internalRef = useRef<HTMLTextAreaElement | null>(null)

    const resize = useCallback(() => {
      const el = internalRef.current
      if (!el || !autoResize) return
      el.style.height = 'auto'
      const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 20
      const min = lineHeight * minRows
      const max = lineHeight * maxRows
      const scrollHeight = el.scrollHeight
      el.style.height = `${Math.min(Math.max(scrollHeight, min), max)}px`
    }, [autoResize, minRows, maxRows])

    useEffect(() => {
      resize()
    }, [resize, props.value, props.defaultValue])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      resize()
      onChange?.(e)
    }

    const setRefs = (el: HTMLTextAreaElement | null) => {
      internalRef.current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-primary)]">
            {label}
          </label>
        )}

          <textarea
            ref={setRefs}
            id={id}
            rows={minRows}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            onChange={handleChange}
            className={[
              'w-full px-3.5 py-2.5 text-sm resize-none',
              'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]',
              'border rounded-[var(--radius-md)]',
              'placeholder:text-[var(--color-text-tertiary)]',
              'transition-all duration-[var(--transition-fast)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:ring-offset-0',
              error
                ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]/20'
                : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-accent)]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className,
            ].join(' ')}
            {...props}
          />

        {error && (
          <p id={`${id}-error`} role="alert" className="text-xs text-[var(--color-error)]">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${id}-helper`} className="text-xs text-[var(--color-text-tertiary)]">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
