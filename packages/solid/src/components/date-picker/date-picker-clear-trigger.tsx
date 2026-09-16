import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DatePickerClearTriggerProps extends HTMLProps<'button'>, DatePickerClearTriggerBaseProps {}

export const DatePickerClearTrigger = (props: DatePickerClearTriggerProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getClearTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
