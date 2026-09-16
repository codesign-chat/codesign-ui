import { QrCode } from '@codesign-ui/solid/qr-code'
import button from 'styles/button.module.css'
import styles from 'styles/qr-code.module.css'

export const Download = () => {
  return (
    <QrCode.Root class={styles.Root} defaultValue="http://codesign.chat">
      <QrCode.Frame class={styles.Frame}>
        <QrCode.Pattern class={styles.Pattern} />
      </QrCode.Frame>
      <QrCode.DownloadTrigger class={button.Root} fileName="qr-code.png" mimeType="image/png">
        Download
      </QrCode.DownloadTrigger>
    </QrCode.Root>
  )
}
