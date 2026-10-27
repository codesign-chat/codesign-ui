import type { JSX } from 'solid-js'

export type TransferProps = JSX.HTMLAttributes<HTMLDivElement>

export function Transfer(props: TransferProps) {
  return <div data-scope="transfer" data-part="root" {...props} />
}

export type TransferPanelProps = JSX.HTMLAttributes<HTMLDivElement>

export function TransferPanel(props: TransferPanelProps) {
  return <div data-scope="transfer" data-part="panel" {...props} />
}

export type TransferListProps = JSX.HTMLAttributes<HTMLUListElement>

export function TransferList(props: TransferListProps) {
  return <ul data-scope="transfer" data-part="list" {...props} />
}

export type TransferItemProps = JSX.HTMLAttributes<HTMLLIElement>

export function TransferItem(props: TransferItemProps) {
  return <li data-scope="transfer" data-part="item" {...props} />
}

export type TransferActionsProps = JSX.HTMLAttributes<HTMLDivElement>

export function TransferActions(props: TransferActionsProps) {
  return <div data-scope="transfer" data-part="actions" {...props} />
}
