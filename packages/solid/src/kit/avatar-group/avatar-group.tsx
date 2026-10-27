import type { JSX } from 'solid-js'

export type AvatarGroupProps = JSX.HTMLAttributes<HTMLDivElement>

export function AvatarGroup(props: AvatarGroupProps) {
  return <div data-scope="avatar-group" data-part="root" {...props} />
}

export type AvatarGroupItemProps = JSX.HTMLAttributes<HTMLDivElement>

export function AvatarGroupItem(props: AvatarGroupItemProps) {
  return <div data-scope="avatar-group" data-part="item" {...props} />
}
