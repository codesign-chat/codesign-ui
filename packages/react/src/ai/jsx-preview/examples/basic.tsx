import type { ReactNode } from 'react'
import 'styles/ai.module.css'
import type { TProps as JsxParserProps } from 'react-jsx-parser'
import { JSXPreview } from '../jsx-preview.tsx'

function Callout({ children, tone = 'coral' }: { children?: ReactNode; tone?: 'coral' | 'neutral' }) {
  return (
    <div
      style={{
        border: '1px solid',
        borderColor: tone === 'coral' ? 'var(--demo-coral-solid)' : 'var(--demo-border)',
        borderRadius: '0.5rem',
        color: 'var(--demo-neutral-fg)',
        fontSize: '0.875rem',
        padding: '0.75rem',
      }}
    >
      {children}
    </div>
  )
}

const REGISTRY: NonNullable<JsxParserProps['components']> = { Callout }

export function Basic() {
  return (
    <JSXPreview
      components={REGISTRY}
      jsx={`<Callout tone="coral">Components are registered by the consumer.</Callout>`}
      style={{ maxWidth: 520 }}
    />
  )
}

export function Streaming() {
  // Simulates a partial snippet arriving token by token
  const partial = `<Callout tone="neutral">Still streaming`
  return <JSXPreview components={REGISTRY} isStreaming jsx={partial} style={{ maxWidth: 520 }} />
}
