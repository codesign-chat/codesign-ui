'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadClearTriggerBaseProps extends PolymorphicProps {}
export interface SignaturePadClearTriggerProps extends HTMLProps<'button'>, SignaturePadClearTriggerBaseProps {}

export const SignaturePadClearTrigger = forwardRef<HTMLButtonElement, SignaturePadClearTriggerProps>((props, ref) => {
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(signaturePad.getClearTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

SignaturePadClearTrigger.displayName = 'SignaturePadClearTrigger'
