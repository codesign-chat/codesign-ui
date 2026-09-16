import { QrCode } from '@codesign-ui/solid/qr-code'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/qr-code.module.css'

export const Controlled = () => {
  const [value, setValue] = createSignal('http://codesign.chat')

  return (
    <div class="stack">
      <QrCode.Root class={styles.Root} value={value()} onValueChange={(e) => setValue(e.value)}>
        <QrCode.Frame class={styles.Frame}>
          <QrCode.Pattern class={styles.Pattern} />
        </QrCode.Frame>
      </QrCode.Root>
      <button class={button.Root} onClick={() => setValue('https://chakra-ui.com')}>
        Set to chakra-ui.com
      </button>
    </div>
  )
}
