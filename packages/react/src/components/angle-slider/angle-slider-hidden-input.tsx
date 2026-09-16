'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderHiddenInputBaseProps extends PolymorphicProps {}
export interface AngleSliderHiddenInputProps extends HTMLProps<'input'>, AngleSliderHiddenInputBaseProps {}

export const AngleSliderHiddenInput = forwardRef<HTMLInputElement, AngleSliderHiddenInputProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getHiddenInputProps(), props)

  return <codesign.input {...mergedProps} ref={ref} />
})

AngleSliderHiddenInput.displayName = 'AngleSliderHiddenInput'
