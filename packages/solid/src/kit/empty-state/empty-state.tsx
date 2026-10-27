import type { JSX } from 'solid-js'

export type EmptyStateProps = JSX.HTMLAttributes<HTMLDivElement>

export function EmptyState(props: EmptyStateProps) {
  return <div data-scope="empty-state" data-part="root" {...props} />
}

export type EmptyStateIconProps = JSX.HTMLAttributes<HTMLDivElement>

export function EmptyStateIcon(props: EmptyStateIconProps) {
  return <div data-scope="empty-state" data-part="icon" {...props} />
}

export type EmptyStateTitleProps = JSX.HTMLAttributes<HTMLHeadingElement>

export function EmptyStateTitle(props: EmptyStateTitleProps) {
  return <h3 data-scope="empty-state" data-part="title" {...props} />
}

export type EmptyStateDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function EmptyStateDescription(props: EmptyStateDescriptionProps) {
  return <p data-scope="empty-state" data-part="description" {...props} />
}

export type EmptyStateActionProps = JSX.HTMLAttributes<HTMLDivElement>

export function EmptyStateAction(props: EmptyStateActionProps) {
  return <div data-scope="empty-state" data-part="action" {...props} />
}
