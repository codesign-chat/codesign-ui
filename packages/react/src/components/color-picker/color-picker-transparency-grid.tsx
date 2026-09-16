'use client'

import type { TransparencyGridProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerTransparencyGridBaseProps extends TransparencyGridProps, PolymorphicProps {}
export interface ColorPickerTransparencyGridProps extends HTMLProps<'div'>, ColorPickerTransparencyGridBaseProps {}

const splitTransparencyGridProps = createSplitProps<TransparencyGridProps>()

export const ColorPickerTransparencyGrid = forwardRef<HTMLDivElement, ColorPickerTransparencyGridProps>(
  (props, ref) => {
    const [gridProps, localProps] = splitTransparencyGridProps(props, ['size'])
    const colorPicker = useColorPickerContext()
    const mergedProps = mergeProps(colorPicker.getTransparencyGridProps(gridProps), localProps)

    return <codesign.div {...mergedProps} ref={ref} />
  },
)

ColorPickerTransparencyGrid.displayName = 'ColorPickerTransparencyGrid'
