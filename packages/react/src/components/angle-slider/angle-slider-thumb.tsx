'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderThumbBaseProps extends PolymorphicProps {}
export interface AngleSliderThumbProps extends HTMLProps<'div'>, AngleSliderThumbBaseProps {}

export const AngleSliderThumb = forwardRef<HTMLDivElement, AngleSliderThumbProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  const mergedProps = mergeProps(angleSlider.getThumbProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

AngleSliderThumb.displayName = 'AngleSliderThumb'
