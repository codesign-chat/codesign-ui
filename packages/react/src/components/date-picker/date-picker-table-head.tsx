'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context.ts'

export interface DatePickerTableHeadBaseProps extends PolymorphicProps {}
export interface DatePickerTableHeadProps extends HTMLProps<'thead'>, DatePickerTableHeadBaseProps {}

export const DatePickerTableHead = forwardRef<HTMLTableSectionElement, DatePickerTableHeadProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const tableProps = useDatePickerTablePropsContext()
  const mergedProps = mergeProps(datePicker.getTableHeadProps(tableProps), props)

  return <codesign.thead {...mergedProps} ref={ref} />
})

DatePickerTableHead.displayName = 'DatePickerTableHead'
