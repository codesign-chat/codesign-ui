import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselIndicatorGroupBaseProps extends PolymorphicProps<'div'> {}
export interface CarouselIndicatorGroupProps extends HTMLProps<'div'>, CarouselIndicatorGroupBaseProps {}

export const CarouselIndicatorGroup = (props: CarouselIndicatorGroupProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getIndicatorGroupProps(), props)

  return <codesign.div {...mergedProps} />
}
