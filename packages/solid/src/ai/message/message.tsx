import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js'

export type MessageProps = JSX.HTMLAttributes<HTMLDivElement> & {
  from: 'assistant' | 'system' | 'user'
}

export function Message(props: MessageProps) {
  const [local, rest] = splitProps(props, ['from'])
  return <div data-role={local.from} data-scope="message" data-part="root" {...rest} />
}

export type MessageContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function MessageContent(props: MessageContentProps) {
  return <div data-scope="message" data-part="content" {...props} />
}

export type MessageActionsProps = JSX.HTMLAttributes<HTMLDivElement>

export function MessageActions(props: MessageActionsProps) {
  return <div data-scope="message" data-part="actions" {...props} />
}

export type MessageActionProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  label?: string
  tooltip?: string
}

export function MessageAction(props: MessageActionProps) {
  const [local, rest] = splitProps(props, ['label', 'tooltip'])
  const ariaLabel = local.label ?? local.tooltip
  return <button type="button" data-scope="message" data-part="action" aria-label={ariaLabel} {...rest} />
}

export type MessageToolbarProps = JSX.HTMLAttributes<HTMLDivElement>

export function MessageToolbar(props: MessageToolbarProps) {
  return <div data-scope="message" data-part="toolbar" {...props} />
}
