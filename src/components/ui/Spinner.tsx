import { Loader2 } from 'lucide-react'

type SpinnerProps = { size?: 'sm' | 'md' | 'lg'; className?: string }

const SIZE_CLASSES = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' }

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <Loader2
      className={[
        'animate-spin text-[var(--color-primary)]',
        SIZE_CLASSES[size],
        className,
      ].join(' ')}
      aria-label="Loading"
    />
  )
}
