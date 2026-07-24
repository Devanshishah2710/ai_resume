/**
 * Card — primary surface container used throughout the dashboard and builder.
 * Supports padding variants and hover states.
 */

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  as?: 'div' | 'article' | 'section'
}

const PADDING_CLASSES = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
}

export function Card({
  padding = 'md',
  hover = false,
  as: Tag = 'div',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={[
        'bg-[var(--color-bg-elevated)] rounded-lg',
        'border border-[var(--color-border)]',
        'shadow-md',
        PADDING_CLASSES[padding],
        hover
? 'transition-all duration-[var(--transition-normal)] hover:bg-[var(--color-bg-secondary)] cursor-pointer'
          : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Tag
>
  )
}

export function CardHeader({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={['flex items-center justify-between mb-4', className].join(' ')}>
      {children}
    </div>
  )
}

export function CardTitle({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <h3 className={['text-base font-semibold text-[var(--color-text-primary)] tracking-tight', className].join(' ')}>
      {children}
    </h3>
  )
}

export function CardDescription({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <p className={['text-sm text-[var(--color-text-secondary)]', className].join(' ')}>
      {children}
    </p>
  )
}
