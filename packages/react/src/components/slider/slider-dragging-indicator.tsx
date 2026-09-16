'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context.ts'

export interface SliderDraggingIndicatorBaseProps extends PolymorphicProps {}
export interface SliderDraggingIndicatorProps extends HTMLProps<'span'>, SliderDraggingIndicatorBaseProps {}

export const SliderDraggingIndicator = forwardRef<HTMLSpanElement, SliderDraggingIndicatorProps>((props, ref) => {
  const slider = useSliderContext()
  const { index } = useSliderThumbPropsContext()
  const mergedProps = mergeProps(slider.getDraggingIndicatorProps({ index }), props)

  return (
    <codesign.span {...mergedProps} ref={ref}>
      {props.children || slider.getThumbValue(index)}
    </codesign.span>
  )
})

SliderDraggingIndicator.displayName = 'SliderDraggingIndicator'
