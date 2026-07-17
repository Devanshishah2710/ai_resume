/**
 * SummarySection — professional summary textarea.
 */

import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Textarea } from '@/components/ui/Textarea'

export function SummarySection() {
  const summary = useResumeBuilderStore((s) => s.resume?.data.summary ?? '')
  const updateSummary = useResumeBuilderStore((s) => s.updateSummary)

  return (
    <div className="p-4">
      <Textarea
        label="Professional summary"
        value={summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="A brief, compelling overview of your professional background and what you bring to the table…"
        helperText="2–4 sentences. Keep it targeted to your desired role."
        minRows={4}
        maxRows={10}
      />
    </div>
  )
}
