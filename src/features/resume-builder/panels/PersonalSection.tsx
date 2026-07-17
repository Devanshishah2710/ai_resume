/**
 * PersonalSection — form for name, contact info, and headline.
 * Uses controlled inputs bound directly to the Zustand store.
 */

import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'

export function PersonalSection() {
  const data = useResumeBuilderStore((s) => s.resume?.data.personal)
  const updatePersonal = useResumeBuilderStore((s) => s.updatePersonal)

  if (!data) return null

  const field = (key: keyof typeof data) => ({
    value: String(data[key] ?? ''),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      updatePersonal({ [key]: e.target.value }),
  })

  return (
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input label="First name" placeholder="Jane" {...field('firstName')} />
        <Input label="Last name" placeholder="Smith" {...field('lastName')} />
      </div>
      <Input
        label="Professional headline"
        placeholder="Senior Software Engineer"
        helperText="Shown below your name"
        {...field('headline')}
      />
      <Input label="Email" type="email" placeholder="jane@example.com" {...field('email')} />
      <Input label="Phone" type="tel" placeholder="+1 555 000 0000" {...field('phone')} />
      <Input label="Location" placeholder="San Francisco, CA" {...field('location')} />
      <Input label="Website" type="url" placeholder="https://janesmith.dev" {...field('website')} />
      <Input label="LinkedIn" placeholder="linkedin.com/in/janesmith" {...field('linkedin')} />
      <Input label="GitHub" placeholder="github.com/janesmith" {...field('github')} />
    </div>
  )
}
