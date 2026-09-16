import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useEditableContext } from './use-editable-context.ts'

export interface EditableInputBaseProps extends PolymorphicProps<'input'> {}
export interface EditableInputProps extends HTMLProps<'input'>, EditableInputBaseProps {}

export const EditableInput = (props: EditableInputProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getInputProps(), props)
  const field = useFieldContext()

  return <codesign.input aria-describedby={field?.().ariaDescribedby} {...mergedProps} />
}
