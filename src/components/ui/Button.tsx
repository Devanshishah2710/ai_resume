/**
 * Button component — composable, accessible, variant-rich.
 *
 * Variants match the design language:
 *   primary   — filled, accent color — main CTAs
 *   secondary — outlined — secondary actions
 *   ghost     — no background — tertiary/icon actions
 *   danger    — filled red — destructive actions
 *
 * All variants support: sm | md | lg sizes, loading state, left/right icons.
 */

import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] ' +
    'shadow-sm active:scale-[0.98] disabled:opacity-50',
  secondary:
    'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] ' +
    'border border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] ' +
    'shadow-sm active:scale-[0.98] disabled:opacity-50',
  ghost:
    'bg-transparent text-[var(--color-text-secondary)] ' +
    'hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] ' +
    'active:scale-[0.98] disabled:opacity-50',
  danger:
    'bg-[var(--color-error)] text-white hover:opacity-90 ' +
    'shadow-sm active:scale-[0.98] disabled:opacity-50',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-[var(--radius-sm)]',
  md: 'h-9 px-4 text-sm gap-2 rounded-[var(--radius-md)]',
  lg: 'h-11 px-6 text-sm gap-2 rounded-[var(--radius-md)]',
  icon: 'h-9 w-9 rounded-[var(--radius-md)]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-medium',
          'transition-all duration-[var(--transition-fast)]',
          'select-none cursor-pointer disabled:cursor-not-allowed',
          'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth ? 'w-full' : '',
          className,
        ].join(' ')}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {size !== 'icon' && children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
