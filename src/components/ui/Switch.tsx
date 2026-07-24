type SwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md'
}

export function Switch({ checked, onChange, label, disabled = false, size = 'md' }: SwitchProps) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex shrink-0 rounded-full transition-colors duration-200',
          'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          size === 'sm' ? 'h-5 w-9' : 'h-6 w-11',
          checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-bg-tertiary)]',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block rounded-full bg-white shadow-sm transition-transform duration-200',
            size === 'sm' ? 'h-3.5 w-3.5 m-0.75' : 'h-4.5 w-4.5 m-0.75',
            checked
              ? size === 'sm' ? 'translate-x-4' : 'translate-x-5'
              : 'translate-x-0',
          ].join(' ')}
        />
      </button>
      {label && (
        <span className="text-sm text-[var(--color-text-primary)]">{label}</span>
      )}
    </label>
  )
}
