import type { JSX } from 'solid-js'

export type SplitButtonProps = JSX.HTMLAttributes<HTMLDivElement>

export function SplitButton(props: SplitButtonProps) {
  return <div data-scope="split-button" data-part="root" {...props} />
}

export type SplitButtonActionProps = JSX.HTMLAttributes<HTMLButtonElement>

export function SplitButtonAction(props: SplitButtonActionProps) {
  return <button data-scope="split-button" data-part="action" {...props} />
}

export type SplitButtonTriggerProps = JSX.HTMLAttributes<HTMLButtonElement>

export function SplitButtonTrigger(props: SplitButtonTriggerProps) {
  return <button data-scope="split-button" data-part="trigger" {...props} />
}
