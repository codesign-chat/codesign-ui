import { For } from 'solid-js'
import { Marquee } from '@codesign-ui/solid/marquee'
import styles from 'styles/marquee.module.css'

const items = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Banana', logo: '🍌' },
  { name: 'Cherry', logo: '🍒' },
]

export const AutoFill = () => (
  <Marquee.Root autoFill spacing="2rem" class={styles.Root}>
    <Marquee.Viewport class={styles.Viewport}>
      <Marquee.Content class={styles.Content}>
        <For each={items}>
          {(item) => (
            <Marquee.Item class={styles.Item}>
              <span class={styles.ItemLogo}>{item.logo}</span>
              <span class={styles.ItemName}>{item.name}</span>
            </Marquee.Item>
          )}
        </For>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)
