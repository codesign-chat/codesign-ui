import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useToastContext } from './use-toast-context.ts'

export interface ToastDescriptionBaseProps extends PolymorphicProps<'div'> {}
export interface ToastDescriptionProps extends HTMLProps<'div'>, ToastDescriptionBaseProps {}

export const ToastDescription = (props: ToastDescriptionProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getDescriptionProps(), props)

  return <codesign.div {...mergedProps} />
}
