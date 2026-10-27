import type { JSX } from 'solid-js'

export type PopconfirmProps = JSX.HTMLAttributes<HTMLDivElement>

export function Popconfirm(props: PopconfirmProps) {
  return <div data-scope="popconfirm" data-part="root" {...props} />
}

export type PopconfirmTriggerProps = JSX.HTMLAttributes<HTMLButtonElement>

export function PopconfirmTrigger(props: PopconfirmTriggerProps) {
  return <button data-scope="popconfirm" data-part="trigger" {...props} />
}

export type PopconfirmContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function PopconfirmContent(props: PopconfirmContentProps) {
  return <div data-scope="popconfirm" data-part="content" {...props} />
}

export type PopconfirmTitleProps = JSX.HTMLAttributes<HTMLHeadingElement>

export function PopconfirmTitle(props: PopconfirmTitleProps) {
  return <h3 data-scope="popconfirm" data-part="title" {...props} />
}

export type PopconfirmDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function PopconfirmDescription(props: PopconfirmDescriptionProps) {
  return <p data-scope="popconfirm" data-part="description" {...props} />
}

export type PopconfirmActionsProps = JSX.HTMLAttributes<HTMLDivElement>

export function PopconfirmActions(props: PopconfirmActionsProps) {
  return <div data-scope="popconfirm" data-part="actions" {...props} />
}
