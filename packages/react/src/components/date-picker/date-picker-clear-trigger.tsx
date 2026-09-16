'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerClearTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerClearTriggerProps extends HTMLProps<'button'>, DatePickerClearTriggerBaseProps {}

export const DatePickerClearTrigger = forwardRef<HTMLButtonElement, DatePickerClearTriggerProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(datePicker.getClearTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

DatePickerClearTrigger.displayName = 'DatePickerClearTrigger'
