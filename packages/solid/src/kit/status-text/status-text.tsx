import type { JSX } from 'solid-js'

export type StatusTextProps = JSX.HTMLAttributes<HTMLSpanElement>

export function StatusText(props: StatusTextProps) {
  return <span data-scope="status-text" data-part="root" {...props} />
}

export type StatusTextIndicatorProps = JSX.HTMLAttributes<HTMLSpanElement>

export function StatusTextIndicator(props: StatusTextIndicatorProps) {
  return <span data-scope="status-text" data-part="indicator" {...props} />
}
