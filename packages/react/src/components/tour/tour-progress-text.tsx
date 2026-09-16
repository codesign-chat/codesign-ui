'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'

export interface TourProgressTextBaseProps extends PolymorphicProps {}
export interface TourProgressTextProps extends HTMLProps<'div'>, TourProgressTextBaseProps {}

export const TourProgressText = forwardRef<HTMLDivElement, TourProgressTextProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getProgressTextProps(), props)

  return (
    <codesign.div {...mergedProps} ref={ref}>
      {mergedProps.children || tour.getProgressText()}
    </codesign.div>
  )
})

TourProgressText.displayName = 'TourProgressText'
