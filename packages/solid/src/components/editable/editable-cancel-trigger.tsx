import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useEditableContext } from './use-editable-context.ts'

export interface EditableCancelTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface EditableCancelTriggerProps extends HTMLProps<'button'>, EditableCancelTriggerBaseProps {}

export const EditableCancelTrigger = (props: EditableCancelTriggerProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getCancelTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
