import type { JSX } from 'solid-js'

export type TableStateProps = JSX.HTMLAttributes<HTMLDivElement>

export function TableState(props: TableStateProps) {
  return <div data-scope="table-state" data-part="root" {...props} />
}

export type TableStateIconProps = JSX.HTMLAttributes<HTMLSpanElement>

export function TableStateIcon(props: TableStateIconProps) {
  return <span data-scope="table-state" data-part="icon" {...props} />
}

export type TableStateTitleProps = JSX.HTMLAttributes<HTMLHeadingElement>

export function TableStateTitle(props: TableStateTitleProps) {
  return <h3 data-scope="table-state" data-part="title" {...props} />
}

export type TableStateDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function TableStateDescription(props: TableStateDescriptionProps) {
  return <p data-scope="table-state" data-part="description" {...props} />
}

export type TableStateActionProps = JSX.HTMLAttributes<HTMLDivElement>

export function TableStateAction(props: TableStateActionProps) {
  return <div data-scope="table-state" data-part="action" {...props} />
}
