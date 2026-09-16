import { mergeProps } from '@zag-js/solid'
import { Index } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerMonthSelectBaseProps extends PolymorphicProps<'select'> {}
export interface DatePickerMonthSelectProps extends HTMLProps<'select'>, DatePickerMonthSelectBaseProps {}

export const DatePickerMonthSelect = (props: DatePickerMonthSelectProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().getMonthSelectProps(), props)

  return (
    <codesign.select {...mergedProps}>
      <Index each={datePicker().getMonths()}>
        {(month) => <codesign.option value={month().value}>{month().label}</codesign.option>}
      </Index>
    </codesign.select>
  )
}
