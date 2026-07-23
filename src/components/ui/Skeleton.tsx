type SkeletonProps = {
  className?: string
  width?: string
  height?: string
  rounded?: boolean
}

export function Skeleton({ className = '', width, height, rounded = false }: SkeletonProps) {
  return (
    <div
      className={[
        'animate-pulse bg-gradient-to-r from-[var(--color-bg-tertiary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)]',
        'bg-[length:200%_100%]',
        rounded ? 'rounded-full' : 'rounded-[var(--radius-md)]',
        className,
      ].join(' ')}
      style={{ width, height, animation: 'shimmer 1.5s ease-in-out infinite' }}
      aria-hidden="true"
    />
  )
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={['space-y-2', className].join(' ')} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  )
}
