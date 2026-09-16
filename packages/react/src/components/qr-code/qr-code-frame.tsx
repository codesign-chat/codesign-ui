'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useQrCodeContext } from './use-qr-code-context.ts'

export interface QrCodeFrameBaseProps extends PolymorphicProps {}
export interface QrCodeFrameProps extends HTMLProps<'svg'>, QrCodeFrameBaseProps {}

export const QrCodeFrame = forwardRef<SVGSVGElement, QrCodeFrameProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getFrameProps(), props)

  return <codesign.svg {...mergedProps} ref={ref} />
})

QrCodeFrame.displayName = 'QrCodeFrame'
