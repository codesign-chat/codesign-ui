'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'

export interface SliderRangeBaseProps extends PolymorphicProps {}
export interface SliderRangeProps extends HTMLProps<'div'>, SliderRangeBaseProps {}

export const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getRangeProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

SliderRange.displayName = 'SliderRange'
