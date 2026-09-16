import { Marquee, useMarquee } from '@codesign-ui/react/marquee'
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
    <div className="stack">
      <Marquee.RootProvider value={marquee} className={styles.Root}>
        <Marquee.Viewport className={styles.Viewport}>
          <Marquee.Content className={styles.Content}>
            {items.map((item, i) => (
              <Marquee.Item key={i} className={styles.Item}>
                <span className={styles.ItemLogo}>{item.logo}</span>
                <span className={styles.ItemName}>{item.name}</span>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>

      <div className="hstack">
        <button className={button.Root} onClick={() => marquee.pause()}>
          Pause
        </button>
        <button className={button.Root} onClick={() => marquee.resume()}>
          Resume
        </button>
      </div>
    </div>
  )
}
