import type { JSX } from 'solid-js'

export type TabBandProps = JSX.HTMLAttributes<HTMLDivElement>

export function TabBand(props: TabBandProps) {
  return <div data-scope="tab-band" data-part="root" {...props} />
}

export type TabBandListProps = JSX.HTMLAttributes<HTMLDivElement>

export function TabBandList(props: TabBandListProps) {
  return <div data-scope="tab-band" data-part="list" {...props} />
}

export type TabBandItemProps = JSX.HTMLAttributes<HTMLButtonElement>

export function TabBandItem(props: TabBandItemProps) {
  return <button data-scope="tab-band" data-part="item" {...props} />
}
