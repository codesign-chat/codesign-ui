import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerSwatchGroupBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerSwatchGroupProps extends HTMLProps<'div'>, ColorPickerSwatchGroupBaseProps {}

export const ColorPickerSwatchGroup = (props: ColorPickerSwatchGroupProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getSwatchGroupProps(), props)

  return <codesign.div {...mergedProps} />
}
