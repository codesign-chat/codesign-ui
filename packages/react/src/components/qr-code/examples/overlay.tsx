import { QrCode } from '@codesign-ui/react/qr-code'
import styles from 'styles/qr-code.module.css'

export const Overlay = () => {
  return (
    <QrCode.Root className={styles.Root} defaultValue="http://codesign.chat" encoding={{ ecc: 'H' }}>
      <QrCode.Frame className={styles.Frame}>
        <QrCode.Pattern className={styles.Pattern} />
      </QrCode.Frame>
      <QrCode.Overlay className={styles.Overlay}>
        <img src="https://codesign.chat/icon-192.png" alt="Codesign UI Logo" />
      </QrCode.Overlay>
    </QrCode.Root>
  )
}
