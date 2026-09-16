import type { ColorStringFormat } from '@zag-js/color-utils'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useColorPickerContext } from './use-color-picker-context.ts'

interface FormatProps {
  format?: ColorStringFormat
}

export interface ColorPickerValueTextBaseProps extends PolymorphicProps<'span'>, FormatProps {}
export interface ColorPickerValueTextProps extends HTMLProps<'span'>, ColorPickerValueTextBaseProps {}

export const ColorPickerValueText = (props: ColorPickerValueTextProps) => {
  const colorPicker = useColorPickerContext()
  const [formatProps, localProps] = createSplitProps<FormatProps>()(props, ['format'])
  const mergedProps = mergeProps(() => colorPicker().getValueTextProps(), localProps)
  const valueAsString = createMemo(() =>
    formatProps.format ? colorPicker().value.toString(formatProps.format) : colorPicker().valueAsString,
  )

  return <codesign.span {...mergedProps}>{props.children || valueAsString()}</codesign.span>
}
