import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ColorPickerTriggerProps extends HTMLProps<'button'>, ColorPickerTriggerBaseProps {}

export const ColorPickerTrigger = (props: ColorPickerTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
