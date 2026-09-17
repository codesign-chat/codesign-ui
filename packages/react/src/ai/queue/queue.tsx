import type { ComponentProps, ReactNode } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'

const SCOPE = 'queue'

export type QueueProps = ComponentProps<'div'>

export function Queue(props: QueueProps) {
  return <div data-scope={SCOPE} data-part="root" {...props} />
}

export type QueueSectionProps = ComponentProps<typeof Collapsible.Root> & {
  defaultOpen?: boolean
}

export function QueueSection({ defaultOpen = true, ...props }: QueueSectionProps) {
  return <Collapsible.Root data-scope={SCOPE} data-part="section" defaultOpen={defaultOpen} {...props} />
}

export type QueueSectionTriggerProps = ComponentProps<typeof Collapsible.Trigger>

export function QueueSectionTrigger(props: QueueSectionTriggerProps) {
  return <Collapsible.Trigger data-scope={SCOPE} data-part="section-trigger" {...props} />
}

export type QueueSectionLabelProps = ComponentProps<'span'> & {
  count?: number
  icon?: ReactNode
  indicator?: ReactNode
  label: string
}

export function QueueSectionLabel({ count, icon, indicator, label, children, ...props }: QueueSectionLabelProps) {
  return (
    <span data-scope={SCOPE} data-part="section-label" {...props}>
      {indicator}
      {icon}
      {children ?? (count === undefined ? label : `${count} ${label}`)}
    </span>
  )
}

export type QueueSectionContentProps = ComponentProps<typeof Collapsible.Content>

export function QueueSectionContent(props: QueueSectionContentProps) {
  return <Collapsible.Content data-scope={SCOPE} data-part="section-content" {...props} />
}

export type QueueListProps = ComponentProps<'div'>

export function QueueList({ children, ...props }: QueueListProps) {
  return (
    <div data-scope={SCOPE} data-part="list" {...props}>
      <ul>{children}</ul>
    </div>
  )
}

export type QueueItemProps = ComponentProps<'li'>

export function QueueItem(props: QueueItemProps) {
  return <li data-scope={SCOPE} data-part="item" {...props} />
}

export type QueueItemIndicatorProps = ComponentProps<'span'> & {
  completed?: boolean
}

export function QueueItemIndicator({ completed = false, ...props }: QueueItemIndicatorProps) {
  return <span data-completed={completed} data-scope={SCOPE} data-part="item-indicator" {...props} />
}

export type QueueItemContentProps = ComponentProps<'span'> & {
  completed?: boolean
}

export function QueueItemContent({ completed = false, children, ...props }: QueueItemContentProps) {
  return (
    <span data-completed={completed} data-scope={SCOPE} data-part="item-content" {...props}>
      {children}
    </span>
  )
}

export type QueueItemDescriptionProps = ComponentProps<'div'> & {
  completed?: boolean
}

export function QueueItemDescription({ completed = false, ...props }: QueueItemDescriptionProps) {
  return <div data-completed={completed} data-scope={SCOPE} data-part="item-description" {...props} />
}

export type QueueItemActionsProps = ComponentProps<'div'>

export function QueueItemActions(props: QueueItemActionsProps) {
  return <div data-scope={SCOPE} data-part="item-actions" {...props} />
}

export type QueueItemActionProps = ComponentProps<'button'>

export function QueueItemAction(props: QueueItemActionProps) {
  return <button data-scope={SCOPE} data-part="item-action" type="button" {...props} />
}

export type QueueItemAttachmentProps = ComponentProps<'div'>

export function QueueItemAttachment(props: QueueItemAttachmentProps) {
  return <div data-scope={SCOPE} data-part="item-attachment" {...props} />
}

export type QueueItemImageProps = ComponentProps<'img'> & { src: string }

export function QueueItemImage(props: QueueItemImageProps) {
  return <img alt="" data-scope={SCOPE} data-part="item-image" height={32} width={32} {...props} />
}

export type QueueItemFileProps = ComponentProps<'span'> & {
  icon?: ReactNode
}

export function QueueItemFile({ icon, children, ...props }: QueueItemFileProps) {
  return (
    <span data-scope={SCOPE} data-part="item-file" {...props}>
      {icon}
      <span>{children}</span>
    </span>
  )
}
