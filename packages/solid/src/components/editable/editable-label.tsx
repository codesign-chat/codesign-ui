import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useEditableContext } from './use-editable-context.ts'

export interface EditableLabelBaseProps extends PolymorphicProps<'label'> {}
export interface EditableLabelProps extends HTMLProps<'label'>, EditableLabelBaseProps {}

export const EditableLabel = (props: EditableLabelProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <codesign.label {...mergedProps} />
}
