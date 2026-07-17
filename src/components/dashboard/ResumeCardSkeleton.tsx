import { Skeleton } from '@/components/ui/Skeleton'

type Props = { viewMode: 'grid' | 'list' }

export function ResumeCardSkeleton({ viewMode }: Props) {
  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
        <Skeleton className="h-10 w-10 rounded-[var(--radius-md)]" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    )
  }

  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}
