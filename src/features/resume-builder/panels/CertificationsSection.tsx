import { useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function CertificationsSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.certifications ?? [])
  const { addCertification, updateCertification, removeCertification } = useResumeBuilderStore()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="p-4 space-y-2">
      {entries.map((entry) => (
        <div key={entry.id} className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden">
          <div className="flex items-center justify-between p-3 bg-[var(--color-bg-primary)] group">
            <button className="flex-1 text-left text-sm font-medium text-[var(--color-text-primary)] truncate" onClick={() => setExpandedId(p => p === entry.id ? null : entry.id)}>
              {entry.name || 'New certification'}
            </button>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => removeCertification(entry.id)} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>
              <button onClick={() => setExpandedId(p => p === entry.id ? null : entry.id)} className="p-1 text-[var(--color-text-tertiary)]">
                {expandedId === entry.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {expandedId === entry.id && (
            <div className="p-3 space-y-3 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <Input label="Certification name" placeholder="AWS Solutions Architect" value={entry.name} onChange={(e) => updateCertification(entry.id, { name: e.target.value })} />
              <Input label="Issuing organization" placeholder="Amazon Web Services" value={entry.issuer} onChange={(e) => updateCertification(entry.id, { issuer: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Issue date" type="month" value={entry.date} onChange={(e) => updateCertification(entry.id, { date: e.target.value })} />
                <Input label="Expiry date" type="month" value={entry.expirationDate ?? ''} onChange={(e) => updateCertification(entry.id, { expirationDate: e.target.value || null })} />
              </div>
              <Input label="Credential URL" type="url" placeholder="https://verify.example.com/cert/123" value={entry.url} onChange={(e) => updateCertification(entry.id, { url: e.target.value })} />
            </div>
          )}
        </div>
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addCertification}>
        Add certification
      </Button>
    </div>
  )
}
