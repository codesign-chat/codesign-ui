import type { JSX } from 'solid-js'

export type ChipProps = JSX.HTMLAttributes<HTMLSpanElement>

export function Chip(props: ChipProps) {
  return <span data-scope="chip" data-part="root" {...props} />
}

export type ChipLabelProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ChipLabel(props: ChipLabelProps) {
  return <span data-scope="chip" data-part="label" {...props} />
}

export type ChipRemoveTriggerProps = JSX.HTMLAttributes<HTMLButtonElement>

export function ChipRemoveTrigger(props: ChipRemoveTriggerProps) {
  return <button data-scope="chip" data-part="remove" {...props} />
}
