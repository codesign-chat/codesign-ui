'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'

export interface SliderLabelBaseProps extends PolymorphicProps {}
export interface SliderLabelProps extends HTMLProps<'label'>, SliderLabelBaseProps {}

export const SliderLabel = forwardRef<HTMLLabelElement, SliderLabelProps>((props, ref) => {
  const slider = useSliderContext()
  const mergedProps = mergeProps(slider.getLabelProps(), props)

  return <codesign.label {...mergedProps} ref={ref} />
})

SliderLabel.displayName = 'SliderLabel'
