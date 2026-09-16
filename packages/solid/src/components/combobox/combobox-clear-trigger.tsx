import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ComboboxClearTriggerProps extends HTMLProps<'button'>, ComboboxClearTriggerBaseProps {}

export const ComboboxClearTrigger = (props: ComboboxClearTriggerProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getClearTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
