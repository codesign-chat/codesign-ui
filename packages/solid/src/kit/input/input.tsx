import type { JSX } from 'solid-js'

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  return <input data-scope="input" data-part="root" {...props} />
}
