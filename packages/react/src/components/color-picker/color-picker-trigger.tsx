'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerTriggerProps extends HTMLProps<'button'>, ColorPickerTriggerBaseProps {}

export const ColorPickerTrigger = forwardRef<HTMLButtonElement, ColorPickerTriggerProps>((props, ref) => {
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

ColorPickerTrigger.displayName = 'ColorPickerTrigger'
