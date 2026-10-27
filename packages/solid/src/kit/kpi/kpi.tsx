import type { JSX } from 'solid-js'

export type KpiRootProps = JSX.HTMLAttributes<HTMLDivElement>

export function KpiRoot(props: KpiRootProps) {
  return <div data-scope="kpi" data-part="root" {...props} />
}

export type KpiLabelProps = JSX.HTMLAttributes<HTMLSpanElement>

export function KpiLabel(props: KpiLabelProps) {
  return <span data-scope="kpi" data-part="label" {...props} />
}

export type KpiValueProps = JSX.HTMLAttributes<HTMLElement>

export function KpiValue(props: KpiValueProps) {
  return <strong data-scope="kpi" data-part="value" {...props} />
}

export type KpiDeltaProps = JSX.HTMLAttributes<HTMLSpanElement>

export function KpiDelta(props: KpiDeltaProps) {
  return <span data-scope="kpi" data-part="delta" {...props} />
}
