import type { JSX } from 'solid-js'

export type MiniCalendarProps = JSX.HTMLAttributes<HTMLDivElement>

export function MiniCalendar(props: MiniCalendarProps) {
  return <div data-scope="mini-calendar" data-part="root" {...props} />
}

export type MiniCalendarGridProps = JSX.HTMLAttributes<HTMLDivElement>

export function MiniCalendarGrid(props: MiniCalendarGridProps) {
  return <div data-scope="mini-calendar" data-part="grid" {...props} />
}

export type MiniCalendarDayProps = JSX.HTMLAttributes<HTMLButtonElement>

export function MiniCalendarDay(props: MiniCalendarDayProps) {
  return <button data-scope="mini-calendar" data-part="day" {...props} />
}
