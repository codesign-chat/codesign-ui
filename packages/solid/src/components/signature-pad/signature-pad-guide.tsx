import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadGuideBaseProps extends PolymorphicProps<'div'> {}
export interface SignaturePadGuideProps extends HTMLProps<'div'>, SignaturePadGuideBaseProps {}

export const SignaturePadGuide = (props: SignaturePadGuideProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getGuideProps(), props)

  return <codesign.div {...mergedProps} />
}
