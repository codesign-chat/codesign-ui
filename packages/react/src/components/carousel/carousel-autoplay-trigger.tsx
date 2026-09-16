'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselAutoplayTriggerBaseProps extends PolymorphicProps {}
export interface CarouselAutoplayTriggerProps extends HTMLProps<'button'>, CarouselAutoplayTriggerBaseProps {}

export const CarouselAutoplayTrigger = forwardRef<HTMLButtonElement, CarouselAutoplayTriggerProps>((props, ref) => {
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getAutoplayTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

CarouselAutoplayTrigger.displayName = 'CarouselAutoplayTrigger'
