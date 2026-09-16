import type { MarkerProps } from '@zag-js/slider'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSliderContext } from './use-slider-context.ts'

export interface SliderMarkerBaseProps extends MarkerProps, PolymorphicProps<'span'> {}
export interface SliderMarkerProps extends HTMLProps<'span'>, SliderMarkerBaseProps {}

export const SliderMarker = (props: SliderMarkerProps) => {
  const [markerProps, localProps] = createSplitProps<MarkerProps>()(props, ['value'])
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getMarkerProps(markerProps), localProps)

  return <codesign.span {...mergedProps} />
}
