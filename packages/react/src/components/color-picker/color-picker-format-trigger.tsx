'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerFormatTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerFormatTriggerProps extends HTMLProps<'button'>, ColorPickerFormatTriggerBaseProps {}

export const ColorPickerFormatTrigger = forwardRef<HTMLButtonElement, ColorPickerFormatTriggerProps>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getFormatTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

ColorPickerFormatTrigger.displayName = 'ColorPickerFormatTrigger'
