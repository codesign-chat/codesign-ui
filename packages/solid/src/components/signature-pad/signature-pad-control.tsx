import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadControlBaseProps extends PolymorphicProps<'div'> {}
export interface SignaturePadControlProps extends HTMLProps<'div'>, SignaturePadControlBaseProps {}

export const SignaturePadControl = (props: SignaturePadControlProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getControlProps(), props)

  return <codesign.div {...mergedProps} />
}
