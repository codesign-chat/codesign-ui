import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useToastContext } from './use-toast-context.ts'

export interface ToastCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ToastCloseTriggerProps extends HTMLProps<'button'>, ToastCloseTriggerBaseProps {}

export const ToastCloseTrigger = (props: ToastCloseTriggerProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getCloseTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
