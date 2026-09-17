import type { ComponentProps, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { HoverCard } from '../../components/hover-card/index.ts'

const SCOPE = 'context'

const RING_RADIUS = 10
const RING_VIEWBOX = 24
const RING_CENTER = 12
const RING_STROKE_WIDTH = 2

export interface ContextUsage {
  cachedInputTokens?: number
  inputTokens?: number
  outputTokens?: number
  reasoningTokens?: number
}

export interface ContextCosts {
  cache?: number
  input?: number
  output?: number
  reasoning?: number
  total?: number
}

interface ContextContextValue {
  costs?: ContextCosts
  maxTokens: number
  usedTokens: number
  usage?: ContextUsage
}

const ContextContext = createContext<ContextContextValue | null>(null)

function useContextValue() {
  const context = useContext(ContextContext)
  if (!context) {
    throw new Error('Context components must be used within Context')
  }
  return context
}

const percentFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, style: 'percent' })
const compactFormat = new Intl.NumberFormat('en-US', { notation: 'compact' })
const costFormat = new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' })

function formatTokens(tokens?: number) {
  return tokens === undefined ? '—' : compactFormat.format(tokens)
}

export type ContextProps = ComponentProps<typeof HoverCard.Root> & {
  costs?: ContextCosts
  maxTokens: number
  usedTokens: number
  usage?: ContextUsage
}

export function Context({ costs, maxTokens, usedTokens, usage, ...props }: ContextProps) {
  const contextValue = useMemo<ContextContextValue>(
    () => ({ costs, maxTokens, usedTokens, usage }),
    [costs, maxTokens, usage, usedTokens],
  )

  return (
    <ContextContext.Provider value={contextValue}>
      <HoverCard.Root closeDelay={0} data-scope={SCOPE} data-part="root" openDelay={0} {...props} />
    </ContextContext.Provider>
  )
}

const UsageRing = () => {
  const { maxTokens, usedTokens } = useContextValue()
  const circumference = 2 * Math.PI * RING_RADIUS
  const usedPercent = maxTokens > 0 ? usedTokens / maxTokens : 0
  const dashOffset = circumference * (1 - usedPercent)

  return (
    <svg
      aria-hidden="true"
      data-scope={SCOPE}
      data-part="ring"
      height="20"
      viewBox={`0 0 ${RING_VIEWBOX} ${RING_VIEWBOX}`}
      width="20"
    >
      <circle
        cx={RING_CENTER}
        cy={RING_CENTER}
        fill="none"
        opacity="0.25"
        r={RING_RADIUS}
        stroke="currentColor"
        strokeWidth={RING_STROKE_WIDTH}
      />
      <circle
        cx={RING_CENTER}
        cy={RING_CENTER}
        data-scope={SCOPE}
        data-part="ring-value"
        fill="none"
        r={RING_RADIUS}
        stroke="currentColor"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        strokeWidth={RING_STROKE_WIDTH}
        style={{ rotate: '-90deg', transformOrigin: 'center' }}
      />
    </svg>
  )
}

export type ContextTriggerProps = ComponentProps<'button'>

export function ContextTrigger({ children, ...props }: ContextTriggerProps) {
  const { maxTokens, usedTokens } = useContextValue()
  const usedPercent = maxTokens > 0 ? usedTokens / maxTokens : 0

  return (
    <HoverCard.Trigger asChild>
      <button data-scope={SCOPE} data-part="trigger" type="button" {...props}>
        {children ?? (
          <>
            <span data-scope={SCOPE} data-part="trigger-label">
              {percentFormat.format(usedPercent)}
            </span>
            <UsageRing />
          </>
        )}
      </button>
    </HoverCard.Trigger>
  )
}

export type ContextContentProps = ComponentProps<typeof HoverCard.Content>

export function ContextContent(props: ContextContentProps) {
  return (
    <HoverCard.Positioner data-scope={SCOPE} data-part="positioner">
      <HoverCard.Content data-scope={SCOPE} data-part="content" {...props} />
    </HoverCard.Positioner>
  )
}

export type ContextContentHeaderProps = ComponentProps<'div'>

export function ContextContentHeader({ children, ...props }: ContextContentHeaderProps) {
  const { maxTokens, usedTokens } = useContextValue()
  const usedPercent = maxTokens > 0 ? usedTokens / maxTokens : 0

  return (
    <div data-scope={SCOPE} data-part="content-header" {...props}>
      {children ?? (
        <>
          <div data-scope={SCOPE} data-part="header-meta">
            <p>{percentFormat.format(usedPercent)}</p>
            <p>
              {compactFormat.format(usedTokens)} / {compactFormat.format(maxTokens)}
            </p>
          </div>
          <div
            aria-label="Model context usage"
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={Math.round(usedPercent * 100)}
            data-scope={SCOPE}
            data-part="meter-track"
            role="progressbar"
          >
            <div data-scope={SCOPE} data-part="meter-fill" style={{ width: `${usedPercent * 100}%` }} />
          </div>
        </>
      )}
    </div>
  )
}

export type ContextContentBodyProps = ComponentProps<'div'>

export function ContextContentBody(props: ContextContentBodyProps) {
  return <div data-scope={SCOPE} data-part="content-body" {...props} />
}

export type ContextContentFooterProps = ComponentProps<'div'>

export function ContextContentFooter({ children, ...props }: ContextContentFooterProps) {
  const { costs } = useContextValue()

  return (
    <div data-scope={SCOPE} data-part="content-footer" {...props}>
      {children ?? (
        <>
          <span>Total cost</span>
          <span>{costFormat.format(costs?.total ?? 0)}</span>
        </>
      )}
    </div>
  )
}

interface UsageRowProps {
  children?: ReactNode
  cost?: number
  label: ReactNode
  tokens?: number
}

function UsageRow({ children, cost, label, tokens, ...props }: UsageRowProps & ComponentProps<'div'>) {
  if (children) {
    return <div {...props}>{children}</div>
  }

  if (!tokens) {
    return null
  }

  return (
    <div data-scope={SCOPE} data-part="usage-row" {...props}>
      <span data-scope={SCOPE} data-part="usage-label">
        {label}
      </span>
      <span data-scope={SCOPE} data-part="usage-value">
        {formatTokens(tokens)}
        {cost !== undefined && <em>• {costFormat.format(cost)}</em>}
      </span>
    </div>
  )
}

export type ContextInputUsageProps = ComponentProps<'div'>

export function ContextInputUsage(props: ContextInputUsageProps) {
  const { costs, usage } = useContextValue()

  return <UsageRow cost={costs?.input} label="Input" tokens={usage?.inputTokens} {...props} />
}

export type ContextOutputUsageProps = ComponentProps<'div'>

export function ContextOutputUsage(props: ContextOutputUsageProps) {
  const { costs, usage } = useContextValue()

  return <UsageRow cost={costs?.output} label="Output" tokens={usage?.outputTokens} {...props} />
}

export type ContextReasoningUsageProps = ComponentProps<'div'>

export function ContextReasoningUsage(props: ContextReasoningUsageProps) {
  const { costs, usage } = useContextValue()

  return <UsageRow cost={costs?.reasoning} label="Reasoning" tokens={usage?.reasoningTokens} {...props} />
}

export type ContextCacheUsageProps = ComponentProps<'div'>

export function ContextCacheUsage(props: ContextCacheUsageProps) {
  const { costs, usage } = useContextValue()

  return <UsageRow cost={costs?.cache} label="Cache" tokens={usage?.cachedInputTokens} {...props} />
}
