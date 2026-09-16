import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useToastContext } from './use-toast-context.ts'

export interface ToastRootBaseProps extends PolymorphicProps<'div'> {}
export interface ToastRootProps extends HTMLProps<'div'>, ToastRootBaseProps {}

export const ToastRoot = (props: ToastRootProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getRootProps(), props)

  return (
    <codesign.div {...mergedProps}>
      <codesign.div {...toast().getGhostBeforeProps()} />
      {props.children}
      <codesign.div {...toast().getGhostAfterProps()} />
    </codesign.div>
  )
}
