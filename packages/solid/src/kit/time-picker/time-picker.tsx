import type { JSX } from 'solid-js'

export type TimePickerProps = JSX.HTMLAttributes<HTMLDivElement>

export function TimePicker(props: TimePickerProps) {
  return <div data-scope="time-picker" data-part="root" {...props} />
}

export type TimePickerInputProps = JSX.InputHTMLAttributes<HTMLInputElement>

export function TimePickerInput(props: TimePickerInputProps) {
  return <input data-scope="time-picker" data-part="input" {...props} />
}

export type TimePickerTriggerProps = JSX.HTMLAttributes<HTMLButtonElement>

export function TimePickerTrigger(props: TimePickerTriggerProps) {
  return <button data-scope="time-picker" data-part="trigger" {...props} />
}

export type TimePickerContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function TimePickerContent(props: TimePickerContentProps) {
  return <div data-scope="time-picker" data-part="content" {...props} />
}
