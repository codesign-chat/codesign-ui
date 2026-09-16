'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'

export interface StepsProgressBaseProps extends PolymorphicProps {}
export interface StepsProgressProps extends HTMLProps<'div'>, StepsProgressBaseProps {}

export const StepsProgress = forwardRef<HTMLDivElement, StepsProgressProps>((props, ref) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getProgressProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

StepsProgress.displayName = 'StepsProgress'
