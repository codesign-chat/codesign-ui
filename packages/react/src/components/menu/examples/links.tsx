import { Menu } from '@codesign-ui/react/menu'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/menu.module.css'

export const Links = () => (
  <Menu.Root>
    <Menu.Trigger className={styles.Trigger}>
      Help
      <Menu.Indicator className={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content className={styles.Content}>
        <Menu.Item className={styles.Item} value="docs" asChild>
          <a href="https://codesign.chat">Documentation</a>
        </Menu.Item>
        <Menu.Item className={styles.Item} value="github" asChild>
          <a href="https://github.com/codesign-chat/codesign-ui">GitHub</a>
        </Menu.Item>
        <Menu.Separator className={styles.Separator} />
        <Menu.Item className={styles.Item} value="changelog" asChild>
          <a href="https://github.com/codesign-chat/codesign-ui/releases">Changelog</a>
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
