import type { JSX } from 'solid-js'

export type MaskedInputProps = JSX.InputHTMLAttributes<HTMLInputElement>

export function MaskedInput(props: MaskedInputProps) {
  return <input data-scope="masked-input" data-part="root" {...props} />
}
