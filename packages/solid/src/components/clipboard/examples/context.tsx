import { Clipboard } from '@codesign-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import { Show } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/clipboard.module.css'

export const Context = () => {
  return (
    <Clipboard.Root class={styles.Root} value="https://codesign.chat">
      <Clipboard.Label class={styles.Label}>Copy this link</Clipboard.Label>
      <Clipboard.Context>
        {(clipboard) => (
          <button class={button.Root} onClick={() => clipboard().copy()}>
            <Show when={clipboard().copied} fallback={<ClipboardCopyIcon />}>
              <CheckIcon />
            </Show>
            <Show when={clipboard().copied} fallback="Copy">
              Copied!
            </Show>
          </button>
        )}
      </Clipboard.Context>
    </Clipboard.Root>
  )
}
