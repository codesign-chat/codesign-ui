'use client'

import type { DownloadTriggerProps } from '@zag-js/qr-code'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useQrCodeContext } from './use-qr-code-context.ts'

export interface QrCodeDownloadTriggerBaseProps extends DownloadTriggerProps, PolymorphicProps {}
export interface QrCodeDownloadTriggerProps extends HTMLProps<'button'>, QrCodeDownloadTriggerBaseProps {}

const splitDownloadTriggerProps = createSplitProps<DownloadTriggerProps>()

export const QrCodeDownloadTrigger = forwardRef<HTMLButtonElement, QrCodeDownloadTriggerProps>((props, ref) => {
  const [downloadTriggerProps, localProps] = splitDownloadTriggerProps(props, ['fileName', 'mimeType', 'quality'])
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getDownloadTriggerProps(downloadTriggerProps), localProps)

  return <codesign.button {...mergedProps} ref={ref} />
})

QrCodeDownloadTrigger.displayName = 'QrCodeDownloadTrigger'
