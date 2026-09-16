import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useDialogContext } from './use-dialog-context.ts'

export interface DialogTitleBaseProps extends PolymorphicProps<'h2'> {}
export interface DialogTitleProps extends HTMLProps<'h2'>, DialogTitleBaseProps {}

export const DialogTitle = (props: DialogTitleProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().getTitleProps(), props)

  return <codesign.h2 {...mergedProps} />
}
