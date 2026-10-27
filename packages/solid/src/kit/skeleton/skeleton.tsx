import type { JSX } from 'solid-js'

export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement>

export function Skeleton(props: SkeletonProps) {
  return <div data-scope="skeleton" data-part="root" {...props} />
}
