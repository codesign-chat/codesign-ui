import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useNumberInputContext } from './use-number-input-context.ts'

export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface NumberInputIncrementTriggerProps extends HTMLProps<'button'>, NumberInputIncrementTriggerBaseProps {}

export const NumberInputIncrementTrigger = (props: NumberInputIncrementTriggerProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getIncrementTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
