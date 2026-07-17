import { forwardRef, useId } from 'react'
import { ChevronDown } from 'lucide-react'

type SelectOption = { value: string; label: string; disabled?: boolean }

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', id: propId, ...props }, ref) => {
    const generatedId = useId()
    const id = propId ?? generatedId

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-primary)]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={[
              'w-full h-9 pl-3 pr-9 text-sm appearance-none',
              'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]',
              'border rounded-[var(--radius-sm)]',
              'transition-colors duration-[var(--transition-fast)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]',
              error
                ? 'border-[var(--color-error)]'
                : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]',
              'disabled:opacity-50 cursor-pointer',
              className,
            ].join(' ')}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-tertiary)] pointer-events-none" />
        </div>
        {error && <p role="alert" className="text-xs text-[var(--color-error)]">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'
