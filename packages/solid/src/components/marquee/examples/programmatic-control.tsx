import { For } from 'solid-js'
import { Marquee, useMarquee } from '@codesign-ui/solid/marquee'
import button from 'styles/button.module.css'
import styles from 'styles/marquee.module.css'

const items = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Banana', logo: '🍌' },
  { name: 'Cherry', logo: '🍒' },
  { name: 'Grape', logo: '🍇' },
  { name: 'Watermelon', logo: '🍉' },
  { name: 'Strawberry', logo: '🍓' },
]

export const ProgrammaticControl = () => {
  const marquee = useMarquee()

  return (
    <div class="stack">
      <Marquee.RootProvider value={marquee} class={styles.Root}>
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
      </Marquee.RootProvider>

      <div class="hstack">
        <button class={button.Root} onClick={() => marquee().pause()}>
          Pause
        </button>
        <button class={button.Root} onClick={() => marquee().resume()}>
          Resume
        </button>
      </div>
    </div>
  )
}
