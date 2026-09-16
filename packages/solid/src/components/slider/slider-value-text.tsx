import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSliderContext } from './use-slider-context.ts'

export interface SliderValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface SliderValueTextProps extends HTMLProps<'span'>, SliderValueTextBaseProps {}

export const SliderValueText = (props: SliderValueTextProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getValueTextProps(), props)

  return <codesign.span {...mergedProps}>{props.children || api().value.join(',')}</codesign.span>
}
