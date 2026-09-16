import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxInputBaseProps extends PolymorphicProps<'input'> {}
export interface ComboboxInputProps extends HTMLProps<'input'>, ComboboxInputBaseProps {}

export const ComboboxInput = (props: ComboboxInputProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getInputProps(), props)
  const field = useFieldContext()

  return <codesign.input aria-describedby={field?.().ariaDescribedby} {...mergedProps} />
}
