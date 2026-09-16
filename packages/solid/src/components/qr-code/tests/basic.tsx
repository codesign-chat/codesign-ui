import { QrCode } from '@codesign-ui/solid/qr-code'

export const ComponentUnderTest = () => {
  return (
    <QrCode.Root value="http://codesign.chat" encoding={{ ecc: 'H' }}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay>
        <img src="https://codesign.chat/icon-192.png" alt="" />
      </QrCode.Overlay>
      <QrCode.DownloadTrigger fileName="qr-code.png" mimeType="image/png">
        Download
      </QrCode.DownloadTrigger>
    </QrCode.Root>
  )
}
