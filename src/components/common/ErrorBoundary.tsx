/**
 * ErrorBoundary — top-level React error boundary.
 *
 * Catches render-time errors anywhere below it so a single broken component
 * does not crash the whole SPA. Renders a recoverable fallback with a reset
 * action (re-mounts the subtree) and an optional error detail in dev.
 *
 * Class component because error boundaries are not yet available as hooks.
 */

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary] ========== UNCAUGHT RENDER ERROR ==========')
    console.error('[ErrorBoundary] message:', error.message)
    console.error('[ErrorBoundary] name:', error.name)
    console.error('[ErrorBoundary] stack:', error.stack)
    console.error('[ErrorBoundary] componentStack:', info.componentStack)
    console.error('[ErrorBoundary] ==========================================')
  }

  handleReset = (): void => {
    this.setState({ error: null })
  }

  render(): ReactNode {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-primary)] p-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            An unexpected error occurred. You can try again — your data is safe.
          </p>
          {import.meta.env.DEV && (
            <div className="mt-4 text-left">
              <pre className="max-h-40 overflow-auto rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] p-3 text-xs text-[var(--color-error)]">
                {error.message}
              </pre>
              <pre className="mt-2 max-h-60 overflow-auto rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] p-3 text-xs text-[var(--color-text-secondary)]">
                {error.stack}
              </pre>
            </div>
          )}
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="primary" onClick={this.handleReset}>
              Try again
            </Button>
            <Button variant="secondary" onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
