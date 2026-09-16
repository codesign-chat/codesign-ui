'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselItemGroupBaseProps extends PolymorphicProps {}
export interface CarouselItemGroupProps extends HTMLProps<'div'>, CarouselItemGroupBaseProps {}

export const CarouselItemGroup = forwardRef<HTMLDivElement, CarouselItemGroupProps>((props, ref) => {
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getItemGroupProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

CarouselItemGroup.displayName = 'CarouselItemGroup'
