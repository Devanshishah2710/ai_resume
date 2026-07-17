type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'accent' | 'outline'

type BadgeProps = {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]',
  success: 'bg-[var(--color-success-subtle)] text-[var(--color-success)]',
  warning: 'bg-[var(--color-warning-subtle)] text-[var(--color-warning)]',
  error: 'bg-[var(--color-error-subtle)] text-[var(--color-error)]',
  accent: 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]',
  outline: 'border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-transparent',
}

export function Badge({ variant = 'default', size = 'sm', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center font-medium rounded-[var(--radius-full)]',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1',
        VARIANT_CLASSES[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
