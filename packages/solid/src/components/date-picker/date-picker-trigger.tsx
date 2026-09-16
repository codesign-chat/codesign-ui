import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DatePickerTriggerProps extends HTMLProps<'button'>, DatePickerTriggerBaseProps {}

export const DatePickerTrigger = (props: DatePickerTriggerProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
