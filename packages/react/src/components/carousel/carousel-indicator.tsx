'use client'

import type { IndicatorProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselIndicatorBaseProps extends IndicatorProps, PolymorphicProps {}
export interface CarouselIndicatorProps extends HTMLProps<'button'>, CarouselIndicatorBaseProps {}

const splitIndicatorProps = createSplitProps<IndicatorProps>()

export const CarouselIndicator = forwardRef<HTMLButtonElement, CarouselIndicatorProps>((props, ref) => {
  const [indicatorProps, localProps] = splitIndicatorProps(props, ['readOnly', 'index'])

  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getIndicatorProps(indicatorProps), localProps)

  return <codesign.button {...mergedProps} ref={ref} />
})

CarouselIndicator.displayName = 'CarouselIndicator'
