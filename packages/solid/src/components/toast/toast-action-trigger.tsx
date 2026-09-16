import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useToastContext } from './use-toast-context.ts'

export interface ToastActionTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ToastActionTriggerProps extends HTMLProps<'button'>, ToastActionTriggerBaseProps {}

export const ToastActionTrigger = (props: ToastActionTriggerProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getActionTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
