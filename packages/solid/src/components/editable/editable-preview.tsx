import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useEditableContext } from './use-editable-context.ts'

export interface EditablePreviewBaseProps extends PolymorphicProps<'span'> {}
export interface EditablePreviewProps extends HTMLProps<'span'>, EditablePreviewBaseProps {}

export const EditablePreview = (props: EditablePreviewProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getPreviewProps(), props)

  return <codesign.span {...mergedProps} />
}
