import type { JSX } from 'solid-js'

export type TableHeaderProps = JSX.HTMLAttributes<HTMLTableSectionElement>

export function TableHeader(props: TableHeaderProps) {
  return <thead data-scope="table-header" data-part="root" {...props} />
}

export type TableHeaderCellProps = JSX.HTMLAttributes<HTMLTableCellElement>

export function TableHeaderCell(props: TableHeaderCellProps) {
  return <th data-scope="table-header" data-part="cell" {...props} />
}

export type TableHeaderSortTriggerProps = JSX.HTMLAttributes<HTMLButtonElement>

export function TableHeaderSortTrigger(props: TableHeaderSortTriggerProps) {
  return <button data-scope="table-header" data-part="sort" {...props} />
}
