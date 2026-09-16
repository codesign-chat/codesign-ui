import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSliderContext } from './use-slider-context.ts'

export interface SliderRangeBaseProps extends PolymorphicProps<'div'> {}
export interface SliderRangeProps extends HTMLProps<'div'>, SliderRangeBaseProps {}

export const SliderRange = (props: SliderRangeProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getRangeProps(), props)

  return <codesign.div {...mergedProps} />
}
