/**
 * SettingsPage — account, appearance, billing settings.
 */

// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { User, Moon, Sun, Monitor } from 'lucide-react'
import { AppLayout } from '@/layouts/AppLayout'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Container } from '@/components/ui/Container'
import { useAuthStore } from '@/store/auth.store'
import { useTheme } from '@/hooks/useTheme'
import { profileService } from '@/services/profile.service'

type ProfileFormValues = {
  fullName: string
  headline: string
  location: string
  website: string
}

export default function SettingsPage() {
  const { user, profile, refreshProfile } = useAuthStore()
  const { theme, setTheme } = useTheme()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: profile?.fullName ?? '',
      headline: profile?.headline ?? '',
      location: profile?.location ?? '',
      website: profile?.website ?? '',
    },
  })

  const onSave = async (values: ProfileFormValues) => {
    if (!user) return
    try {
      await profileService.updateProfile(user.id, values)
      await refreshProfile()
      toast.success('Profile updated')
    } catch {
      toast.error('Failed to update profile')
    }
  }

  const THEME_OPTIONS = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ]

  return (
    <AppLayout>
      <Container size="narrow" className="space-y-6 py-8">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Settings</h1>

        {/* Profile */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your public profile information</CardDescription>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit(onSave)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full name" {...register('fullName')} />
              <Input label="Headline" placeholder="Software Engineer" {...register('headline')} />
            </div>
            <Input label="Location" placeholder="San Francisco, CA" {...register('location')} />
            <Input label="Website" type="url" placeholder="https://yoursite.com" {...register('website')} />
            <div className="flex justify-end">
              <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
                Save changes
              </Button>
            </div>
          </form>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Account</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </div>
          </CardHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)]">
              <div className="h-9 w-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{user?.email}</p>
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  {user?.emailVerified ? '✓ Email verified' : 'Email not verified'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how ResumeForge looks</CardDescription>
            </div>
          </CardHeader>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-primary)] mb-3">Theme</p>
            <div className="flex gap-3">
              {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={[
                    'flex-1 flex flex-col items-center gap-2 p-4 rounded-[var(--radius-md)] border-2 transition-colors text-sm font-medium',
                    theme === value
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                      : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]',
                  ].join(' ')}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Plan */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Plan</CardTitle>
              <CardDescription>Your current subscription</CardDescription>
            </div>
          </CardHeader>
          <div className="flex items-center justify-between p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)]">
            <div>
              <p className="font-semibold text-[var(--color-text-primary)] capitalize">{profile?.plan ?? 'free'} Plan</p>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
                {profile?.plan === 'free' ? 'Up to 3 resumes' : 'Unlimited resumes'}
              </p>
            </div>
            {profile?.plan === 'free' && (
              <Button size="sm" variant="secondary">Upgrade to Pro</Button>
            )}
          </div>
        </Card>
      </Container>
    </AppLayout>
  )
}
