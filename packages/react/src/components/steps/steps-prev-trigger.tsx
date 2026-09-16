'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'

export interface StepsPrevTriggerBaseProps extends PolymorphicProps {}
export interface StepsPrevTriggerProps extends HTMLProps<'button'>, StepsPrevTriggerBaseProps {}

export const StepsPrevTrigger = forwardRef<HTMLButtonElement, StepsPrevTriggerProps>((props, ref) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getPrevTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

StepsPrevTrigger.displayName = 'StepsPrevTrigger'
