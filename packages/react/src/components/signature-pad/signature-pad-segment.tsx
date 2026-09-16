'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadSegmentBaseProps extends PolymorphicProps {}
export interface SignaturePadSegmentProps extends HTMLProps<'svg'>, SignaturePadSegmentBaseProps {}

export const SignaturePadSegment = forwardRef<SVGSVGElement, SignaturePadSegmentProps>((props, ref) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(signaturePad.getSegmentProps(), props)

  return (
    <codesign.svg {...mergedProps} ref={ref}>
      <title>Signature</title>
      {signaturePad.paths.map((path, i) => (
        <path key={i} {...signaturePad.getSegmentPathProps({ path })} />
      ))}
      {signaturePad.currentPath && <path {...signaturePad.getSegmentPathProps({ path: signaturePad.currentPath })} />}
    </codesign.svg>
  )
})

SignaturePadSegment.displayName = 'SignaturePadSegment'
