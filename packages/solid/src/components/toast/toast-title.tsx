import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useToastContext } from './use-toast-context.ts'

export interface ToastTitleBaseProps extends PolymorphicProps<'div'> {}
export interface ToastTitleProps extends HTMLProps<'div'>, ToastTitleBaseProps {}

export const ToastTitle = (props: ToastTitleProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getTitleProps(), props)

  return <codesign.div {...mergedProps} />
}
