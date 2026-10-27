import type { JSX } from 'solid-js'

export type SpinProps = JSX.HTMLAttributes<HTMLDivElement>

export function Spin(props: SpinProps) {
  return <div data-scope="spin" data-part="root" {...props} />
}

export type SpinIndicatorProps = JSX.HTMLAttributes<HTMLSpanElement>

export function SpinIndicator(props: SpinIndicatorProps) {
  return <span data-scope="spin" data-part="indicator" {...props} />
}

export type SpinLabelProps = JSX.HTMLAttributes<HTMLSpanElement>

export function SpinLabel(props: SpinLabelProps) {
  return <span data-scope="spin" data-part="label" {...props} />
}
