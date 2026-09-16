import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useTourContext } from './use-tour-context.ts'

export interface TourDescriptionBaseProps extends PolymorphicProps<'div'> {}
export interface TourDescriptionProps extends HTMLProps<'div'>, TourDescriptionBaseProps {}

export const TourDescription = (props: TourDescriptionProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(() => tour().getDescriptionProps(), props)

  return <codesign.div {...mergedProps}>{mergedProps.children || tour().step?.description}</codesign.div>
}
