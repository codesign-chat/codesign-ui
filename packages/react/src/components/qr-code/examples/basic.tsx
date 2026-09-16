import { QrCode } from '@codesign-ui/react/qr-code'
import styles from 'styles/qr-code.module.css'

export const Basic = () => {
  return (
    <QrCode.Root className={styles.Root} defaultValue="http://codesign.chat">
      <QrCode.Frame className={styles.Frame}>
        <QrCode.Pattern className={styles.Pattern} />
      </QrCode.Frame>
    </QrCode.Root>
  )
}
