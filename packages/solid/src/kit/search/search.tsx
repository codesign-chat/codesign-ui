import type { JSX } from 'solid-js'

export type SearchProps = JSX.HTMLAttributes<HTMLDivElement>

export function Search(props: SearchProps) {
  return <div data-scope="search" data-part="root" {...props} />
}

export type SearchInputProps = JSX.InputHTMLAttributes<HTMLInputElement>

export function SearchInput(props: SearchInputProps) {
  return <input data-scope="search" data-part="input" {...props} />
}

export type SearchIconProps = JSX.HTMLAttributes<HTMLSpanElement>

export function SearchIcon(props: SearchIconProps) {
  return <span data-scope="search" data-part="icon" {...props} />
}

export type SearchClearTriggerProps = JSX.HTMLAttributes<HTMLButtonElement>

export function SearchClearTrigger(props: SearchClearTriggerProps) {
  return <button data-scope="search" data-part="clear" {...props} />
}
