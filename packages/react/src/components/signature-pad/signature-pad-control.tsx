'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadControlBaseProps extends PolymorphicProps {}
export interface SignaturePadControlProps extends HTMLProps<'div'>, SignaturePadControlBaseProps {}

export const SignaturePadControl = forwardRef<HTMLDivElement, SignaturePadControlProps>((props, ref) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(signaturePad.getControlProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

SignaturePadControl.displayName = 'SignaturePadControl'
