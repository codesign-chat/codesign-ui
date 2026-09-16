import { Clipboard } from '@codesign-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import styles from 'styles/clipboard.module.css'

export const ValueText = () => {
  return (
    <Clipboard.Root class={styles.Root} value="https://codesign.chat">
      <Clipboard.Control class={styles.Control}>
        <Clipboard.ValueText class={styles.ValueText} />
        <Clipboard.Trigger class={styles.Trigger}>
          <Clipboard.Indicator class={styles.Indicator} copied={<CheckIcon />}>
            <ClipboardCopyIcon />
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}
