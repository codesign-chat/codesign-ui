import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSliderContext } from './use-slider-context.ts'
import { useSliderThumbPropsContext } from './use-slider-thumb-props-context.ts'

export interface SliderDraggingIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface SliderDraggingIndicatorProps extends HTMLProps<'span'>, SliderDraggingIndicatorBaseProps {}

export const SliderDraggingIndicator = (props: SliderDraggingIndicatorProps) => {
  const slider = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  const mergedProps = mergeProps(() => slider().getDraggingIndicatorProps(thumbProps), props)

  return <codesign.span {...mergedProps}>{props.children || slider().getThumbValue(thumbProps.index)}</codesign.span>
}
