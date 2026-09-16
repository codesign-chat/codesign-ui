'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselPrevTriggerBaseProps extends PolymorphicProps {}
export interface CarouselPrevTriggerProps extends HTMLProps<'button'>, CarouselPrevTriggerBaseProps {}

export const CarouselPrevTrigger = forwardRef<HTMLButtonElement, CarouselPrevTriggerProps>((props, ref) => {
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getPrevTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

CarouselPrevTrigger.displayName = 'CarouselPrevTrigger'
