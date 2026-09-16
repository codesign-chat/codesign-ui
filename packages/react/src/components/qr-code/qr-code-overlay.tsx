'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useQrCodeContext } from './use-qr-code-context.ts'

export interface QrCodeOverlayBaseProps extends PolymorphicProps {}
export interface QrCodeOverlayProps extends HTMLProps<'div'>, QrCodeOverlayBaseProps {}

export const QrCodeOverlay = forwardRef<HTMLDivElement, QrCodeOverlayProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getOverlayProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

QrCodeOverlay.displayName = 'QrCodeOverlay'
