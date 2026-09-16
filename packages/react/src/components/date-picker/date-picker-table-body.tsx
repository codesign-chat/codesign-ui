'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context.ts'

export interface DatePickerTableBodyBaseProps extends PolymorphicProps {}
export interface DatePickerTableBodyProps extends HTMLProps<'tbody'>, DatePickerTableBodyBaseProps {}

export const DatePickerTableBody = forwardRef<HTMLTableSectionElement, DatePickerTableBodyProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const tableProps = useDatePickerTablePropsContext()
  const mergedProps = mergeProps(datePicker.getTableBodyProps(tableProps), props)

  return <codesign.tbody {...mergedProps} ref={ref} />
})

DatePickerTableBody.displayName = 'DatePickerTableBody'
