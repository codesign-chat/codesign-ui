import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselControlBaseProps extends PolymorphicProps<'div'> {}
export interface CarouselControlProps extends HTMLProps<'div'>, CarouselControlBaseProps {}

export const CarouselControl = (props: CarouselControlProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <codesign.div {...mergedProps} />
}
