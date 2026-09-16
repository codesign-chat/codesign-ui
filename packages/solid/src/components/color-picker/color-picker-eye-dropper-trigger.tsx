import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerEyeDropperTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ColorPickerEyeDropperTriggerProps extends HTMLProps<'button'>, ColorPickerEyeDropperTriggerBaseProps {}

export const ColorPickerEyeDropperTrigger = (props: ColorPickerEyeDropperTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getEyeDropperTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
