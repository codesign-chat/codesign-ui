import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import { Collapsible } from '../../components/collapsible/index.ts'

export type SourcesProps = JSX.HTMLAttributes<HTMLDivElement>

export function Sources(props: SourcesProps) {
  return <Collapsible.Root data-scope="sources" data-part="root" {...props} />
}

export type SourcesTriggerProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  count: number
}

export function SourcesTrigger(props: SourcesTriggerProps) {
  const [local, rest] = splitProps(props, ['children', 'count'])

  return (
    <Collapsible.Trigger data-scope="sources" data-part="trigger" {...rest}>
      {local.children ?? (
        <p data-scope="sources" data-part="count">
          Used {local.count} sources
        </p>
      )}
    </Collapsible.Trigger>
  )
}

export type SourcesContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function SourcesContent(props: SourcesContentProps) {
  return <Collapsible.Content data-scope="sources" data-part="content" {...props} />
}

export type SourceProps = JSX.HTMLAttributes<HTMLAnchorElement> & {
  href?: string
  title?: string
}

export function Source(props: SourceProps) {
  const [local, rest] = splitProps(props, ['children', 'href', 'title'])

  return (
    <a data-scope="sources" data-part="source" href={local.href} rel="noreferrer" target="_blank" {...rest}>
      {local.children ?? <span>{local.title}</span>}
    </a>
  )
}
