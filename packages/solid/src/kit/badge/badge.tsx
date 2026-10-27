import type { JSX } from 'solid-js'

export type BadgeProps = JSX.HTMLAttributes<HTMLSpanElement>

export function Badge(props: BadgeProps) {
  return <span data-scope="badge" data-part="root" {...props} />
}
