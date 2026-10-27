import type { JSX } from 'solid-js'

export type ButtonGroupProps = JSX.HTMLAttributes<HTMLDivElement>

export function ButtonGroup(props: ButtonGroupProps) {
  return <div data-scope="button-group" data-part="root" {...props} />
}

export type ButtonGroupItemProps = JSX.HTMLAttributes<HTMLButtonElement>

export function ButtonGroupItem(props: ButtonGroupItemProps) {
  return <button data-scope="button-group" data-part="item" {...props} />
}
