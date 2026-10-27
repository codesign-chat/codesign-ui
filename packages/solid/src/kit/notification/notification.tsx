import type { JSX } from 'solid-js'

export type NotificationProps = JSX.HTMLAttributes<HTMLDivElement>

export function Notification(props: NotificationProps) {
  return <div data-scope="notification" data-part="root" {...props} />
}

export type NotificationIconProps = JSX.HTMLAttributes<HTMLSpanElement>

export function NotificationIcon(props: NotificationIconProps) {
  return <span data-scope="notification" data-part="icon" {...props} />
}

export type NotificationTitleProps = JSX.HTMLAttributes<HTMLHeadingElement>

export function NotificationTitle(props: NotificationTitleProps) {
  return <h4 data-scope="notification" data-part="title" {...props} />
}

export type NotificationDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function NotificationDescription(props: NotificationDescriptionProps) {
  return <p data-scope="notification" data-part="description" {...props} />
}

export type NotificationActionProps = JSX.HTMLAttributes<HTMLDivElement>

export function NotificationAction(props: NotificationActionProps) {
  return <div data-scope="notification" data-part="action" {...props} />
}

export type NotificationCloseTriggerProps = JSX.HTMLAttributes<HTMLButtonElement>

export function NotificationCloseTrigger(props: NotificationCloseTriggerProps) {
  return <button data-scope="notification" data-part="close" {...props} />
}
