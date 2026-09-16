'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTimerContext } from './use-timer-context.ts'

export interface TimerSeparatorBaseProps extends PolymorphicProps {}
export interface TimerSeparatorProps extends HTMLProps<'div'>, TimerSeparatorBaseProps {}

export const TimerSeparator = forwardRef<HTMLDivElement, TimerSeparatorProps>((props, ref) => {
  const timer = useTimerContext()

  const mergedProps = mergeProps(timer.getSeparatorProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

TimerSeparator.displayName = 'TimerSeparator'
