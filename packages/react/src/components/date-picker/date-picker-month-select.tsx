'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerMonthSelectBaseProps extends PolymorphicProps {}
export interface DatePickerMonthSelectProps extends HTMLProps<'select'>, DatePickerMonthSelectBaseProps {}

export const DatePickerMonthSelect = forwardRef<HTMLSelectElement, DatePickerMonthSelectProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getMonthSelectProps(), props)

  return (
    <codesign.select {...mergedProps} ref={ref}>
      {datePicker.getMonths().map((month, i) => (
        <option key={i} value={month.value}>
          {month.label}
        </option>
      ))}
    </codesign.select>
  )
})

DatePickerMonthSelect.displayName = 'DatePickerMonthSelect'
