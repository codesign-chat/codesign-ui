import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerAreaBackgroundBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerAreaBackgroundProps extends HTMLProps<'div'>, ColorPickerAreaBackgroundBaseProps {}

export const ColorPickerAreaBackground = (props: ColorPickerAreaBackgroundProps) => {
  const api = useColorPickerContext()
  const areaProps = useColorPickerAreaPropsContext()
  const mergedProps = mergeProps(() => api().getAreaBackgroundProps(areaProps), props)

  return <codesign.div {...mergedProps} />
}
