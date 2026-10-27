import type { JSX } from 'solid-js'

export type SheetProps = JSX.HTMLAttributes<HTMLDivElement>

export function Sheet(props: SheetProps) {
  return <div data-scope="sheet" data-part="root" {...props} />
}

export type SheetContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function SheetContent(props: SheetContentProps) {
  return <div data-scope="sheet" data-part="content" {...props} />
}

export type SheetHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function SheetHeader(props: SheetHeaderProps) {
  return <div data-scope="sheet" data-part="header" {...props} />
}

export type SheetTitleProps = JSX.HTMLAttributes<HTMLHeadingElement>

export function SheetTitle(props: SheetTitleProps) {
  return <h2 data-scope="sheet" data-part="title" {...props} />
}

export type SheetBodyProps = JSX.HTMLAttributes<HTMLDivElement>

export function SheetBody(props: SheetBodyProps) {
  return <div data-scope="sheet" data-part="body" {...props} />
}

export type SheetFooterProps = JSX.HTMLAttributes<HTMLDivElement>

export function SheetFooter(props: SheetFooterProps) {
  return <div data-scope="sheet" data-part="footer" {...props} />
}

export type SheetCloseTriggerProps = JSX.HTMLAttributes<HTMLButtonElement>

export function SheetCloseTrigger(props: SheetCloseTriggerProps) {
  return <button data-scope="sheet" data-part="close" {...props} />
}
