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

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'white'
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
    'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white ' +
    'border border-[var(--color-primary)]/20 shadow-sm ' +
    'hover:-translate-y-0.5 hover:shadow-md hover:from-[var(--color-primary-hover)] hover:to-[var(--color-secondary-hover)] ' +
    'active:translate-y-0 active:scale-[0.98] disabled:opacity-50',
  secondary:
    'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] ' +
    'border border-[var(--color-border)] shadow-[var(--shadow-card)] ' +
    'hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-strong)] hover:-translate-y-0.5 ' +
    'active:translate-y-0 active:scale-[0.98] disabled:opacity-50',
  ghost:
    'bg-transparent text-[var(--color-text-secondary)] ' +
    'hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] ' +
    'active:scale-[0.98] disabled:opacity-50',
  danger:
    'bg-[var(--color-error)] text-white shadow-sm border border-[var(--color-error)]/20 ' +
    'hover:bg-[var(--color-error)]/90 hover:-translate-y-0.5 hover:shadow-md ' +
    'active:translate-y-0 active:scale-[0.98] disabled:opacity-50',
  white:
    'bg-white text-[var(--color-text-primary)] shadow-[var(--shadow-card)] ' +
    'border border-[var(--color-border)]/50 ' +
    'hover:bg-white hover:-translate-y-0.5 hover:shadow-md ' +
    'active:translate-y-0 active:scale-[0.98] disabled:opacity-50',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5 rounded-[var(--radius-md)]',
  md: 'h-10 px-5 text-sm gap-2 rounded-[var(--radius-lg)]',
  lg: 'h-12 px-7 text-base gap-2 rounded-[var(--radius-lg)]',
  icon: 'h-10 w-10 rounded-[var(--radius-lg)]',
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
          'transition-all duration-[var(--transition-normal)]',
          'select-none cursor-pointer disabled:cursor-not-allowed',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--color-bg-elevated)]',
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
        {size !== 'icon' ? children : !leftIcon ? children : null}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
