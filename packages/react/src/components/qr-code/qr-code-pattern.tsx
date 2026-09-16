'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useQrCodeContext } from './use-qr-code-context.ts'

export interface QrCodePatternBaseProps extends PolymorphicProps {}
export interface QrCodePatternProps extends HTMLProps<'path'>, QrCodePatternBaseProps {}

export const QrCodePattern = forwardRef<SVGPathElement, QrCodePatternProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getPatternProps(), props)

  return <codesign.path {...mergedProps} ref={ref} />
})

QrCodePattern.displayName = 'QrCodePattern'
