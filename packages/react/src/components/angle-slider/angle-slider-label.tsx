'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderLabelBaseProps extends PolymorphicProps {}
export interface AngleSliderLabelProps extends HTMLProps<'label'>, AngleSliderLabelBaseProps {}

export const AngleSliderLabel = forwardRef<HTMLLabelElement, AngleSliderLabelProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getLabelProps(), props)

  return <codesign.label {...mergedProps} ref={ref} />
})

AngleSliderLabel.displayName = 'AngleSliderLabel'
