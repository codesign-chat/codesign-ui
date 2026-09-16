import { Marquee } from '@codesign-ui/react/marquee'
import styles from 'styles/marquee.module.css'

const items = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Banana', logo: '🍌' },
  { name: 'Cherry', logo: '🍒' },
  { name: 'Grape', logo: '🍇' },
  { name: 'Watermelon', logo: '🍉' },
  { name: 'Strawberry', logo: '🍓' },
]

export const Vertical = () => (
  <Marquee.Root side="bottom" className={styles.Root}>
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
  </Marquee.Root>
)
