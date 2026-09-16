import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselNextTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface CarouselNextTriggerProps extends HTMLProps<'button'>, CarouselNextTriggerBaseProps {}

export const CarouselNextTrigger = (props: CarouselNextTriggerProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getNextTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
