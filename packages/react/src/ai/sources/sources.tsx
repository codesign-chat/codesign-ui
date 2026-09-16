import type { ComponentProps } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'

export type SourcesProps = ComponentProps<typeof Collapsible.Root>

export function Sources(props: SourcesProps) {
  return <Collapsible.Root data-scope="sources" data-part="root" {...props} />
}

export type SourcesTriggerProps = Omit<ComponentProps<typeof Collapsible.Trigger>, 'onOpenChange'> & {
  count: number
}

export function SourcesTrigger({ children, count, ...props }: SourcesTriggerProps) {
  return (
    <Collapsible.Trigger data-scope="sources" data-part="trigger" {...props}>
      {children ?? <p data-part="count">Used {count} sources</p>}
    </Collapsible.Trigger>
  )
}

export type SourcesContentProps = ComponentProps<typeof Collapsible.Content>

export function SourcesContent(props: SourcesContentProps) {
  return <Collapsible.Content data-scope="sources" data-part="content" {...props} />
}

export type SourceProps = ComponentProps<'a'>

export function Source({ href, title, children, ...props }: SourceProps) {
  return (
    <a data-scope="sources" data-part="source" href={href} rel="noreferrer" target="_blank" {...props}>
      {children ?? <span>{title}</span>}
    </a>
  )
}
