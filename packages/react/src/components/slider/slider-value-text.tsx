'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'

export interface SliderValueTextBaseProps extends PolymorphicProps {}
export interface SliderValueTextProps extends HTMLProps<'span'>, SliderValueTextBaseProps {}

export const SliderValueText = forwardRef<HTMLDivElement, SliderValueTextProps>((props, ref) => {
  const { children, ...rest } = props
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getValueTextProps(), rest)

  return (
    <codesign.span {...mergedProps} ref={ref}>
      {children || slider.value.join(', ')}
    </codesign.span>
  )
})

SliderValueText.displayName = 'SliderValueText'
