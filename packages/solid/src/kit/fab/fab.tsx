import type { JSX } from 'solid-js'

export type FabRootProps = JSX.HTMLAttributes<HTMLButtonElement>

export function FabRoot(props: FabRootProps) {
  return <button data-scope="fab" data-part="root" {...props} />
}

export type FabIconProps = JSX.HTMLAttributes<HTMLSpanElement>

export function FabIcon(props: FabIconProps) {
  return <span data-scope="fab" data-part="icon" {...props} />
}

export type FabLabelProps = JSX.HTMLAttributes<HTMLSpanElement>

export function FabLabel(props: FabLabelProps) {
  return <span data-scope="fab" data-part="label" {...props} />
}
