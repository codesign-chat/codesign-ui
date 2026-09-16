'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerTriggerProps extends HTMLProps<'button'>, DatePickerTriggerBaseProps {}

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

DatePickerTrigger.displayName = 'DatePickerTrigger'
