import type { ComponentProps, ReactNode } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'
import { Tabs } from '../../components/tabs/index.ts'

const SCOPE = 'sandbox'

export type SandboxProps = ComponentProps<typeof Collapsible.Root> & {
  defaultOpen?: boolean
}

export function Sandbox({ defaultOpen = true, ...props }: SandboxProps) {
  return <Collapsible.Root data-scope={SCOPE} data-part="root" defaultOpen={defaultOpen} {...props} />
}

export type SandboxHeaderProps = ComponentProps<typeof Collapsible.Trigger> & {
  indicator?: ReactNode
  state?: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
  title?: ReactNode
}

export function SandboxHeader({ indicator, state, title, children, ...props }: SandboxHeaderProps) {
  return (
    <Collapsible.Trigger data-scope={SCOPE} data-part="header" {...props}>
      {children ?? (
        <span data-scope={SCOPE} data-part="header-identity">
          <span data-scope={SCOPE} data-part="title">
            {title}
          </span>
          {state && (
            <span data-scope={SCOPE} data-part="status" data-state={state}>
              {state === 'output-error' ? 'Error' : state === 'output-available' ? 'Done' : 'Running'}
            </span>
          )}
          {indicator}
        </span>
      )}
    </Collapsible.Trigger>
  )
}

export type SandboxContentProps = ComponentProps<typeof Collapsible.Content>

export function SandboxContent(props: SandboxContentProps) {
  return <Collapsible.Content data-scope={SCOPE} data-part="content" {...props} />
}

export type SandboxTabsProps = ComponentProps<typeof Tabs.Root>

export function SandboxTabs(props: SandboxTabsProps) {
  return <Tabs.Root data-scope={SCOPE} data-part="tabs" {...props} />
}

export type SandboxTabsBarProps = ComponentProps<'div'>

export function SandboxTabsBar({ children, ...props }: SandboxTabsBarProps) {
  return (
    <div data-scope={SCOPE} data-part="tabs-bar" {...props}>
      {children}
    </div>
  )
}

export type SandboxTabsListProps = ComponentProps<typeof Tabs.List>

export function SandboxTabsList(props: SandboxTabsListProps) {
  return <Tabs.List data-scope={SCOPE} data-part="tabs-list" {...props} />
}

export type SandboxTabsTriggerProps = ComponentProps<typeof Tabs.Trigger>

export function SandboxTabsTrigger(props: SandboxTabsTriggerProps) {
  return <Tabs.Trigger data-scope={SCOPE} data-part="tabs-trigger" {...props} />
}

export type SandboxTabContentProps = ComponentProps<typeof Tabs.Content>

export function SandboxTabContent(props: SandboxTabContentProps) {
  return <Tabs.Content data-scope={SCOPE} data-part="tab-content" {...props} />
}
