import { mergeProps } from '@zag-js/solid'
import { Index } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerYearSelectBaseProps extends PolymorphicProps<'select'> {}
export interface DatePickerYearSelectProps extends HTMLProps<'select'>, DatePickerYearSelectBaseProps {}

export const DatePickerYearSelect = (props: DatePickerYearSelectProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().getYearSelectProps(), props)

  return (
    <codesign.select {...mergedProps}>
      <Index each={datePicker().getYears()}>
        {(year) => <codesign.option value={year().value}>{year().label}</codesign.option>}
      </Index>
    </codesign.select>
  )
}
