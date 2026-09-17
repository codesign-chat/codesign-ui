import type { ComponentProps } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'
import { Shimmer } from '../shimmer/shimmer.tsx'

const SCOPE = 'plan'

interface PlanContextValue {
  isStreaming: boolean
}

const PlanContext = createContext<PlanContextValue>({ isStreaming: false })

function usePlan() {
  return useContext(PlanContext)
}

export type PlanProps = ComponentProps<typeof Collapsible.Root> & {
  isStreaming?: boolean
}

export function Plan({ isStreaming = false, ...props }: PlanProps) {
  const contextValue = useMemo<PlanContextValue>(() => ({ isStreaming }), [isStreaming])

  return (
    <PlanContext.Provider value={contextValue}>
      <Collapsible.Root data-scope={SCOPE} data-part="root" {...props} />
    </PlanContext.Provider>
  )
}

export type PlanHeaderProps = ComponentProps<'div'>

export function PlanHeader(props: PlanHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type PlanTitleProps = Omit<ComponentProps<'h4'>, 'children'> & { children: string }

export function PlanTitle({ children, ...props }: PlanTitleProps) {
  const { isStreaming } = usePlan()

  return (
    <h4 data-scope={SCOPE} data-part="title" {...props}>
      {isStreaming ? <Shimmer as="span">{children}</Shimmer> : children}
    </h4>
  )
}

export type PlanDescriptionProps = Omit<ComponentProps<'p'>, 'children'> & { children: string }

export function PlanDescription({ children, ...props }: PlanDescriptionProps) {
  const { isStreaming } = usePlan()

  return (
    <p data-scope={SCOPE} data-part="description" {...props}>
      {isStreaming ? <Shimmer as="span">{children}</Shimmer> : children}
    </p>
  )
}

export type PlanActionProps = ComponentProps<'div'>

export function PlanAction(props: PlanActionProps) {
  return <div data-scope={SCOPE} data-part="action" {...props} />
}

export type PlanTriggerProps = ComponentProps<typeof Collapsible.Trigger>

export function PlanTrigger(props: PlanTriggerProps) {
  return <Collapsible.Trigger data-scope={SCOPE} data-part="trigger" {...props} />
}

export type PlanContentProps = ComponentProps<typeof Collapsible.Content>

export function PlanContent(props: PlanContentProps) {
  return <Collapsible.Content data-scope={SCOPE} data-part="content" {...props} />
}

export type PlanBodyProps = ComponentProps<'div'>

export function PlanBody(props: PlanBodyProps) {
  return <div data-scope={SCOPE} data-part="body" {...props} />
}

export type PlanFooterProps = ComponentProps<'div'>

export function PlanFooter(props: PlanFooterProps) {
  return <div data-scope={SCOPE} data-part="footer" {...props} />
}
