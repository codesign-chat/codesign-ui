import type { JSX } from 'solid-js'

export type ListItemProps = JSX.HTMLAttributes<HTMLDivElement>

export function ListItem(props: ListItemProps) {
  return <div data-scope="list-item" data-part="root" {...props} />
}

export type ListItemContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function ListItemContent(props: ListItemContentProps) {
  return <div data-scope="list-item" data-part="content" {...props} />
}

export type ListItemTitleProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ListItemTitle(props: ListItemTitleProps) {
  return <span data-scope="list-item" data-part="title" {...props} />
}

export type ListItemDescriptionProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ListItemDescription(props: ListItemDescriptionProps) {
  return <span data-scope="list-item" data-part="description" {...props} />
}

export type ListItemTrailingProps = JSX.HTMLAttributes<HTMLDivElement>

export function ListItemTrailing(props: ListItemTrailingProps) {
  return <div data-scope="list-item" data-part="trailing" {...props} />
}
