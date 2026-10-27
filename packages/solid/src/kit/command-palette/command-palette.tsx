import type { JSX } from 'solid-js'

export type CommandPaletteProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommandPalette(props: CommandPaletteProps) {
  return <div data-scope="command-palette" data-part="root" {...props} />
}

export type CommandPaletteInputProps = JSX.InputHTMLAttributes<HTMLInputElement>

export function CommandPaletteInput(props: CommandPaletteInputProps) {
  return <input data-scope="command-palette" data-part="input" {...props} />
}

export type CommandPaletteListProps = JSX.HTMLAttributes<HTMLUListElement>

export function CommandPaletteList(props: CommandPaletteListProps) {
  return <ul data-scope="command-palette" data-part="list" {...props} />
}

export type CommandPaletteGroupProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommandPaletteGroup(props: CommandPaletteGroupProps) {
  return <div data-scope="command-palette" data-part="group" {...props} />
}

export type CommandPaletteItemProps = JSX.HTMLAttributes<HTMLLIElement>

export function CommandPaletteItem(props: CommandPaletteItemProps) {
  return <li data-scope="command-palette" data-part="item" {...props} />
}

export type CommandPaletteEmptyProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommandPaletteEmpty(props: CommandPaletteEmptyProps) {
  return <div data-scope="command-palette" data-part="empty" {...props} />
}
