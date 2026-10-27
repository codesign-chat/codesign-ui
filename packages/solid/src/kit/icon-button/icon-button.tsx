import type { JSX } from 'solid-js'

export type IconButtonProps = JSX.HTMLAttributes<HTMLButtonElement>

export function IconButton(props: IconButtonProps) {
  return <button data-scope="icon-button" data-part="root" {...props} />
}

export type IconButtonIconProps = JSX.HTMLAttributes<HTMLSpanElement>

export function IconButtonIcon(props: IconButtonIconProps) {
  return <span data-scope="icon-button" data-part="icon" {...props} />
}
