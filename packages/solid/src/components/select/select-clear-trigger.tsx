import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSelectContext } from './use-select-context.ts'

export interface SelectClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface SelectClearTriggerProps extends HTMLProps<'button'>, SelectClearTriggerBaseProps {}

export const SelectClearTrigger = (props: SelectClearTriggerProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getClearTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
