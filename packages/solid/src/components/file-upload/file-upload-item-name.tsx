import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'

export interface FileUploadItemNameBaseProps extends PolymorphicProps<'div'> {}
export interface FileUploadItemNameProps extends HTMLProps<'div'>, FileUploadItemNameBaseProps {}

export const FileUploadItemName = (props: FileUploadItemNameProps) => {
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = mergeProps(() => fileUpload().getItemNameProps(itemProps()), props)

  return <codesign.div {...mergedProps}>{props.children || itemProps().file.name}</codesign.div>
}
