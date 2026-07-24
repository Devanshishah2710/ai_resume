/**
 * Input component — text input with label, helper text, error state, and icons.
 * Used in all forms throughout the app.
 */

import { forwardRef, useId } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  /** Renders as a visually hidden label for accessibility */
  srLabel?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      srLabel = false,
      className = '',
      id: propId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = propId ?? generatedId

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className={[
              'text-sm font-medium text-[var(--color-text-primary)]',
              srLabel ? 'sr-only' : '',
            ].join(' ')}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={[
              'w-full h-10 px-3.5 text-sm',
              'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]',
              'border rounded-[var(--radius-md)]',
              'placeholder:text-[var(--color-text-tertiary)]',
              'transition-all duration-[var(--transition-fast)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:ring-offset-0',
              error
                ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]/20'
                : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-primary)]',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className,
            ].join(' ')}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
              {rightIcon}
            </span>
          )}
        </div>

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

Input.displayName = 'Input'
