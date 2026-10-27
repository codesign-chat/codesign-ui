import type { JSX } from 'solid-js'

export type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  return <button data-scope="button" data-part="root" {...props} />
}

export type ButtonIconProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ButtonIcon(props: ButtonIconProps) {
  return <span data-scope="button" data-part="icon" {...props} />
}

export type ButtonLabelProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ButtonLabel(props: ButtonLabelProps) {
  return <span data-scope="button" data-part="label" {...props} />
}
