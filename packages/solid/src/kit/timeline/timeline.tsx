import type { JSX } from 'solid-js'

export type TimelineProps = JSX.HTMLAttributes<HTMLOListElement>

export function Timeline(props: TimelineProps) {
  return <ol data-scope="timeline" data-part="root" {...props} />
}

export type TimelineItemProps = JSX.HTMLAttributes<HTMLLIElement>

export function TimelineItem(props: TimelineItemProps) {
  return <li data-scope="timeline" data-part="item" {...props} />
}

export type TimelineIndicatorProps = JSX.HTMLAttributes<HTMLSpanElement>

export function TimelineIndicator(props: TimelineIndicatorProps) {
  return <span data-scope="timeline" data-part="indicator" {...props} />
}

export type TimelineContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function TimelineContent(props: TimelineContentProps) {
  return <div data-scope="timeline" data-part="content" {...props} />
}
