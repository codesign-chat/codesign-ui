'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'

export interface TourDescriptionBaseProps extends PolymorphicProps {}
export interface TourDescriptionProps extends HTMLProps<'div'>, TourDescriptionBaseProps {}

export const TourDescription = forwardRef<HTMLDivElement, TourDescriptionProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getDescriptionProps(), props)

  return (
    <codesign.div {...mergedProps} ref={ref}>
      {mergedProps.children || tour.step?.description}
    </codesign.div>
  )
})

TourDescription.displayName = 'TourDescription'
