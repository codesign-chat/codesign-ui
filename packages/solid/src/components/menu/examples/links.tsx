import { Menu } from '@codesign-ui/solid/menu'
import { ChevronDownIcon } from 'lucide-solid'
import styles from 'styles/menu.module.css'

export const Links = () => (
  <Menu.Root>
    <Menu.Trigger class={styles.Trigger}>
      Help
      <Menu.Indicator class={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        <Menu.Item
          class={styles.Item}
          value="docs"
          asChild={(props) => <a href="https://codesign.chat" {...props()} />}
        >
          Documentation
        </Menu.Item>
        <Menu.Item
          class={styles.Item}
          value="github"
          asChild={(props) => <a href="https://github.com/codesign-chat/codesign-ui" {...props()} />}
        >
          GitHub
        </Menu.Item>
        <Menu.Separator class={styles.Separator} />
        <Menu.Item
          class={styles.Item}
          value="changelog"
          asChild={(props) => <a href="https://github.com/codesign-chat/codesign-ui/releases" {...props()} />}
        >
          Changelog
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
