import type { JSX } from 'solid-js'

export type TableRowProps = JSX.HTMLAttributes<HTMLTableRowElement>

export function TableRow(props: TableRowProps) {
  return <tr data-scope="table-row" data-part="root" {...props} />
}

export type TableRowCellProps = JSX.HTMLAttributes<HTMLTableCellElement>

export function TableRowCell(props: TableRowCellProps) {
  return <td data-scope="table-row" data-part="cell" {...props} />
}
