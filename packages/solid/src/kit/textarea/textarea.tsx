import type { JSX } from 'solid-js'

export type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea(props: TextareaProps) {
  return <textarea data-scope="textarea" data-part="root" {...props} />
}
