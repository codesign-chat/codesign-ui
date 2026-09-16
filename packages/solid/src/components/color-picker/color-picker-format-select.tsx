import { mergeProps } from '@zag-js/solid'
import { Index } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerFormatSelectBaseProps extends PolymorphicProps<'select'> {}
export interface ColorPickerFormatSelectProps extends HTMLProps<'select'>, ColorPickerFormatSelectBaseProps {}

export const ColorPickerFormatSelect = (props: ColorPickerFormatSelectProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getFormatSelectProps(), props)

  return (
    <codesign.select {...mergedProps}>
      <Index each={['rgba', 'hsla', 'hsba']}>{(format) => <codesign.option value={format()}>{format()}</codesign.option>}</Index>
    </codesign.select>
  )
}
