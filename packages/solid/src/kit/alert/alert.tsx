import type { JSX } from 'solid-js'

export type AlertProps = JSX.HTMLAttributes<HTMLDivElement>

export function Alert(props: AlertProps) {
  return <div data-scope="alert" data-part="root" {...props} />
}

export type AlertIconProps = JSX.HTMLAttributes<HTMLSpanElement>

export function AlertIcon(props: AlertIconProps) {
  return <span data-scope="alert" data-part="icon" {...props} />
}

export type AlertTitleProps = JSX.HTMLAttributes<HTMLHeadingElement>

export function AlertTitle(props: AlertTitleProps) {
  return <h3 data-scope="alert" data-part="title" {...props} />
}

export type AlertDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function AlertDescription(props: AlertDescriptionProps) {
  return <p data-scope="alert" data-part="description" {...props} />
}

export type AlertActionProps = JSX.HTMLAttributes<HTMLDivElement>

export function AlertAction(props: AlertActionProps) {
  return <div data-scope="alert" data-part="action" {...props} />
}
