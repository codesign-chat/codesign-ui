'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerEyeDropperTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerEyeDropperTriggerProps extends HTMLProps<'button'>, ColorPickerEyeDropperTriggerBaseProps {}

export const ColorPickerEyeDropperTrigger = forwardRef<HTMLButtonElement, ColorPickerEyeDropperTriggerProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getEyeDropperTriggerProps(), props)

    return <codesign.button {...mergedProps} ref={ref} />
  },
)

ColorPickerEyeDropperTrigger.displayName = 'ColorPickerEyeDropperTrigger'
