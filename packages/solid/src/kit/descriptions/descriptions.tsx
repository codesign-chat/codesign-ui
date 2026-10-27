import type { JSX } from 'solid-js'

export type DescriptionsProps = JSX.HTMLAttributes<HTMLDListElement>

export function Descriptions(props: DescriptionsProps) {
  return <dl data-scope="descriptions" data-part="root" {...props} />
}

export type DescriptionsItemProps = JSX.HTMLAttributes<HTMLDivElement>

export function DescriptionsItem(props: DescriptionsItemProps) {
  return <div data-scope="descriptions" data-part="item" {...props} />
}

export type DescriptionsLabelProps = JSX.HTMLAttributes<HTMLElement>

export function DescriptionsLabel(props: DescriptionsLabelProps) {
  return <dt data-scope="descriptions" data-part="label" {...props} />
}

export type DescriptionsValueProps = JSX.HTMLAttributes<HTMLElement>

export function DescriptionsValue(props: DescriptionsValueProps) {
  return <dd data-scope="descriptions" data-part="value" {...props} />
}
