import type { JSX } from 'solid-js'

export type LinkProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement>

export function Link(props: LinkProps) {
  return <a data-scope="link" data-part="root" {...props} />
}
