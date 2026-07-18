/**
 * Container — consistent max-width wrapper with responsive horizontal padding.
 *
 * Every page section uses this so content aligns to a single grid edge and
 * shares one gutter rhythm: px-4 sm:px-6 lg:px-8.
 *
 * Sizes:
 *   default — max-w-7xl  (app-wide standard for dashboards & landing)
 *   narrow  — max-w-4xl  (long-form / centered copy)
 *   wide    — max-w-[90rem] (ultra-wide surfaces)
 */

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Override the default max width. */
  size?: 'default' | 'narrow' | 'wide'
}

const SIZE_CLASSES = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-[90rem]',
} as const

export function Container({
  size = 'default',
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={[
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        SIZE_CLASSES[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Section — vertical rhythm primitive for page sections.
 *
 * Applies the standard vertical padding (py-20 lg:py-24) and optional
 * container wrapping so every section reads with the same breathing room.
 * Use `bleed` to drop the container (full-bleed backgrounds).
 */
type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Wrap children in a Container. Default true. */
  contained?: boolean
  containerSize?: 'default' | 'narrow' | 'wide'
  as?: 'section' | 'div' | 'header' | 'footer'
}

export function Section({
  contained = true,
  containerSize = 'default',
  as: Tag = 'section',
  className = '',
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={['py-16 sm:py-20 lg:py-24', className].join(' ')}
      {...props}
    >
      {contained ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </Tag>
  )
}
