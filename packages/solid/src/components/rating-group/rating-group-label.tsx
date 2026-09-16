import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useRatingGroupContext } from './use-rating-group-context.ts'

export interface RatingGroupLabelBaseProps extends PolymorphicProps<'label'> {}
export interface RatingGroupLabelProps extends HTMLProps<'label'>, RatingGroupLabelBaseProps {}

export const RatingGroupLabel = (props: RatingGroupLabelProps) => {
  const api = useRatingGroupContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <codesign.label {...mergedProps} />
}
