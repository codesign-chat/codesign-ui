import { Show, splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'
import { TabsRoot, TabList, TabTrigger, TabContent } from '../../components/tabs/index.ts'

const SCOPE = 'sandbox'

export type SandboxProps = JSX.HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean
}

export function Sandbox(props: SandboxProps) {
  const [local, rest] = splitProps(props, ['defaultOpen'])
  return (
    <CollapsibleRoot defaultOpen={local.defaultOpen ?? true} data-scope={SCOPE} data-part="root" {...(rest as any)} />
  )
}

export type SandboxHeaderProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  indicator?: JSX.Element
  state?: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
  title?: JSX.Element
}

export function SandboxHeader(props: SandboxHeaderProps) {
  const [local, rest] = splitProps(props, ['indicator', 'state', 'title', 'children'])
  const statusText = () =>
    local.state === 'output-error' ? 'Error' : local.state === 'output-available' ? 'Done' : 'Running'

  const content = () =>
    local.children ?? (
      <span data-scope={SCOPE} data-part="header-identity">
        <span data-scope={SCOPE} data-part="title">
          {local.title}
        </span>
        <Show when={local.state}>
          <span data-scope={SCOPE} data-part="status" data-state={local.state}>
            {statusText()}
          </span>
        </Show>
        {local.indicator}
      </span>
    )

  return (
    <CollapsibleTrigger data-scope={SCOPE} data-part="header" {...(rest as any)}>
      {content() as any}
    </CollapsibleTrigger>
  )
}

export type SandboxContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function SandboxContent(props: SandboxContentProps) {
  return <CollapsibleContent data-scope={SCOPE} data-part="content" {...(props as any)} />
}

export type SandboxTabsProps = Record<string, unknown>

export function SandboxTabs(props: SandboxTabsProps) {
  return <TabsRoot data-scope={SCOPE} data-part="tabs" {...(props as any)} />
}

export type SandboxTabsBarProps = JSX.HTMLAttributes<HTMLDivElement>

export function SandboxTabsBar(props: SandboxTabsBarProps) {
  return <div data-scope={SCOPE} data-part="tabs-bar" {...props} />
}

export type SandboxTabListProps = Record<string, unknown>

export function SandboxTabList(props: SandboxTabListProps) {
  return <TabList data-scope={SCOPE} data-part="tabs-list" {...(props as any)} />
}

export type SandboxTabTriggerProps = Record<string, unknown>

export function SandboxTabTrigger(props: SandboxTabTriggerProps) {
  return <TabTrigger data-scope={SCOPE} data-part="tabs-trigger" {...(props as any)} />
}

export type SandboxTabContentProps = Record<string, unknown>

export function SandboxTabContent(props: SandboxTabContentProps) {
  return <TabContent data-scope={SCOPE} data-part="tab-content" {...(props as any)} />
}
