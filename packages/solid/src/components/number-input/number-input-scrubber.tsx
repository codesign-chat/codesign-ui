import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useNumberInputContext } from './use-number-input-context.ts'

export interface NumberInputScrubberBaseProps extends PolymorphicProps<'div'> {}
export interface NumberInputScrubberProps extends HTMLProps<'div'>, NumberInputScrubberBaseProps {}

export const NumberInputScrubber = (props: NumberInputScrubberProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getScrubberProps(), props)

  return <codesign.div {...mergedProps} />
}
