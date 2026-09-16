'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerFormatSelectBaseProps extends PolymorphicProps {}
export interface ColorPickerFormatSelectProps extends HTMLProps<'select'>, ColorPickerFormatSelectBaseProps {}

export const ColorPickerFormatSelect = forwardRef<HTMLSelectElement, ColorPickerFormatSelectProps>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getFormatSelectProps(), props)

  return (
    <codesign.select {...mergedProps} ref={ref}>
      {['rgba', 'hsla', 'hsba'].map((format) => (
        <codesign.option key={format} value={format}>
          {format}
        </codesign.option>
      ))}
    </codesign.select>
  )
})

ColorPickerFormatSelect.displayName = 'ColorPickerFormatSelect'
