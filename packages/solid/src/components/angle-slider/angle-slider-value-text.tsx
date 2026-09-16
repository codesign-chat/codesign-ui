import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderValueTextBaseProps extends PolymorphicProps<'div'> {}
export interface AngleSliderValueTextProps extends HTMLProps<'div'>, AngleSliderValueTextBaseProps {}

export const AngleSliderValueText = (props: AngleSliderValueTextProps) => {
  const api = useAngleSliderContext()
  const mergedProps = mergeProps(() => api().getValueTextProps(), props)

  return <codesign.div {...mergedProps}>{props.children || api().valueAsDegree}</codesign.div>
}
