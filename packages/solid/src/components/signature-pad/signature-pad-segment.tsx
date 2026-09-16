import { mergeProps } from '@zag-js/solid'
import { For, Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadSegmentBaseProps extends PolymorphicProps<'svg'> {}
export interface SignaturePadSegmentProps extends HTMLProps<'svg'>, SignaturePadSegmentBaseProps {}

export const SignaturePadSegment = (props: SignaturePadSegmentProps) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getSegmentProps(), props)

  return (
    <codesign.svg {...mergedProps}>
      <codesign.title>Signature</codesign.title>
      <For each={signaturePad().paths}>
        {(path) => <codesign.path {...signaturePad().getSegmentPathProps({ path })} />}
      </For>
      <Show when={signaturePad().currentPath}>
        {/* @ts-expect-error */}
        <codesign.path {...signaturePad().getSegmentPathProps({ path: signaturePad().currentPath })} />
      </Show>
    </codesign.svg>
  )
}
