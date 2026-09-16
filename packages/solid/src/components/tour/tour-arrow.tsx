import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useTourContext } from './use-tour-context.ts'

export interface TourArrowBaseProps extends PolymorphicProps<'div'> {}
export interface TourArrowProps extends HTMLProps<'div'>, TourArrowBaseProps {}

export const TourArrow = (props: TourArrowProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(() => tour().getArrowProps(), props)

  return (
    <Show when={tour().step?.arrow}>
      <codesign.div {...mergedProps} />
    </Show>
  )
}
