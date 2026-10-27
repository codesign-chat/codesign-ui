import type { JSX } from 'solid-js'

export type NavItemProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement>

export function NavItem(props: NavItemProps) {
  return <a data-scope="nav-item" data-part="root" {...props} />
}

export type NavItemIconProps = JSX.HTMLAttributes<HTMLSpanElement>

export function NavItemIcon(props: NavItemIconProps) {
  return <span data-scope="nav-item" data-part="icon" {...props} />
}

export type NavItemLabelProps = JSX.HTMLAttributes<HTMLSpanElement>

export function NavItemLabel(props: NavItemLabelProps) {
  return <span data-scope="nav-item" data-part="label" {...props} />
}

export type NavItemTrailingProps = JSX.HTMLAttributes<HTMLSpanElement>

export function NavItemTrailing(props: NavItemTrailingProps) {
  return <span data-scope="nav-item" data-part="trailing" {...props} />
}
