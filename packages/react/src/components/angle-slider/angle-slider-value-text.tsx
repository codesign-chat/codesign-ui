'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderValueTextBaseProps extends PolymorphicProps {}
export interface AngleSliderValueTextProps extends HTMLProps<'div'>, AngleSliderValueTextBaseProps {}

export const AngleSliderValueText = forwardRef<HTMLDivElement, AngleSliderValueTextProps>((props, ref) => {
  const angleSlider = useAngleSliderContext()
  return (
    <codesign.div {...props} ref={ref}>
      {props.children || angleSlider.valueAsDegree}
    </codesign.div>
  )
})

AngleSliderValueText.displayName = 'AngleSliderValueText'
