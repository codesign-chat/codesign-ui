import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface SignaturePadClearTriggerProps extends HTMLProps<'button'>, SignaturePadClearTriggerBaseProps {}

export const SignaturePadClearTrigger = (props: SignaturePadClearTriggerProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getClearTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
