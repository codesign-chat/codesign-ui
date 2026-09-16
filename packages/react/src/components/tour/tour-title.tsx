'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'

export interface TourTitleBaseProps extends PolymorphicProps {}
export interface TourTitleProps extends HTMLProps<'h2'>, TourTitleBaseProps {}

export const TourTitle = forwardRef<HTMLHeadingElement, TourTitleProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getTitleProps(), props)

  return (
    <codesign.h2 {...mergedProps} ref={ref}>
      {mergedProps.children || tour.step?.title}
    </codesign.h2>
  )
})

TourTitle.displayName = 'TourTitle'
