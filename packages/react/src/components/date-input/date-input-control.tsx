'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'

export interface DateInputControlBaseProps extends PolymorphicProps {}
export interface DateInputControlProps extends HTMLProps<'div'>, DateInputControlBaseProps {}

export const DateInputControl = forwardRef<HTMLDivElement, DateInputControlProps>((props, ref) => {
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(dateInput.getControlProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

DateInputControl.displayName = 'DateInputControl'
