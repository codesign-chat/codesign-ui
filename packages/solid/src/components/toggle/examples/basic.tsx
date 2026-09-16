import { Toggle } from '@codesign-ui/solid/toggle'
import { BoldIcon } from 'lucide-solid'
import styles from 'styles/toggle.module.css'

export const Basic = () => {
  return (
    <Toggle.Root class={styles.Root}>
      <BoldIcon />
    </Toggle.Root>
  )
}
