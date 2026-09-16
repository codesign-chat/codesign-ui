'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselNextTriggerBaseProps extends PolymorphicProps {}
export interface CarouselNextTriggerProps extends HTMLProps<'button'>, CarouselNextTriggerBaseProps {}

export const CarouselNextTrigger = forwardRef<HTMLButtonElement, CarouselNextTriggerProps>((props, ref) => {
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getNextTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

CarouselNextTrigger.displayName = 'CarouselNextTrigger'
