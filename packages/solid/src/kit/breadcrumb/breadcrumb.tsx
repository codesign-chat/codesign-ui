import type { JSX } from 'solid-js'

export type BreadcrumbProps = JSX.HTMLAttributes<HTMLElement>

export function Breadcrumb(props: BreadcrumbProps) {
  return <nav data-scope="breadcrumb" data-part="root" {...props} />
}

export type BreadcrumbListProps = JSX.HTMLAttributes<HTMLOListElement>

export function BreadcrumbList(props: BreadcrumbListProps) {
  return <ol data-scope="breadcrumb" data-part="list" {...props} />
}

export type BreadcrumbItemProps = JSX.HTMLAttributes<HTMLLIElement>

export function BreadcrumbItem(props: BreadcrumbItemProps) {
  return <li data-scope="breadcrumb" data-part="item" {...props} />
}

export type BreadcrumbLinkProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement>

export function BreadcrumbLink(props: BreadcrumbLinkProps) {
  return <a data-scope="breadcrumb" data-part="link" {...props} />
}

export type BreadcrumbSeparatorProps = JSX.HTMLAttributes<HTMLSpanElement>

export function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
  return <span data-scope="breadcrumb" data-part="separator" {...props} />
}

export type BreadcrumbCurrentProps = JSX.HTMLAttributes<HTMLSpanElement>

export function BreadcrumbCurrent(props: BreadcrumbCurrentProps) {
  return <span data-scope="breadcrumb" data-part="current" {...props} />
}
