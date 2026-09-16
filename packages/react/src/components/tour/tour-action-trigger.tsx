'use client'

import { mergeProps } from '@zag-js/react'
import type { StepActionTriggerProps } from '@zag-js/tour'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'

export interface TourActionTriggerBaseProps extends PolymorphicProps, StepActionTriggerProps {}
export interface TourActionTriggerProps extends HTMLProps<'button'>, TourActionTriggerBaseProps {}

const splitActionTriggerProps = createSplitProps<StepActionTriggerProps>()

export const TourActionTrigger = forwardRef<HTMLButtonElement, TourActionTriggerProps>((props, ref) => {
  const [actionTriggerProps, localProps] = splitActionTriggerProps(props, ['action'])
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getActionTriggerProps(actionTriggerProps), localProps)

  return (
    <codesign.button {...mergedProps} ref={ref}>
      {mergedProps.children || actionTriggerProps.action.label}
    </codesign.button>
  )
})

TourActionTrigger.displayName = 'TourActionTrigger'
