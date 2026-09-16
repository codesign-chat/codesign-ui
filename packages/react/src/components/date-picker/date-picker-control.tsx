'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerControlBaseProps extends PolymorphicProps {}
export interface DatePickerControlProps extends HTMLProps<'div'>, DatePickerControlBaseProps {}

export const DatePickerControl = forwardRef<HTMLDivElement, DatePickerControlProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getControlProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

DatePickerControl.displayName = 'DatePickerControl'
