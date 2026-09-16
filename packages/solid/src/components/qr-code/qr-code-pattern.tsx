import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useQrCodeContext } from './use-qr-code-context.ts'

export interface QrCodePatternBaseProps extends PolymorphicProps<'path'> {}
export interface QrCodePatternProps extends HTMLProps<'path'>, QrCodePatternBaseProps {}

export const QrCodePattern = (props: QrCodePatternProps) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(() => qrCode().getPatternProps(), props)

  return <codesign.path {...mergedProps} />
}
