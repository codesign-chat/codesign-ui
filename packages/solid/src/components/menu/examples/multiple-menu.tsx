import { Menu as CodesignMenu } from '@codesign-ui/solid'
import { ChevronDownIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/menu.module.css'

interface MenuItem {
  label: string
  value: string
}

interface MenuProps {
  id: string
  label: string
  items: MenuItem[]
  onSelect?: (value: string) => void
}

const Menu = (props: MenuProps) => {
  return (
    <CodesignMenu.Root onSelect={(e) => props.onSelect?.(e.value)} id={props.id}>
      <CodesignMenu.Trigger class={styles.Trigger}>
        {props.label}
        <CodesignMenu.Indicator class={styles.Indicator}>
          <ChevronDownIcon />
        </CodesignMenu.Indicator>
      </CodesignMenu.Trigger>
      <CodesignMenu.Positioner>
        <CodesignMenu.Content class={styles.Content}>
          <For each={props.items}>
            {(item) => (
              <CodesignMenu.Item class={styles.Item} value={item.value}>
                {item.label}
              </CodesignMenu.Item>
            )}
          </For>
        </CodesignMenu.Content>
      </CodesignMenu.Positioner>
    </CodesignMenu.Root>
  )
}

const fileItems = [
  { label: 'New File', value: 'new' },
  { label: 'Open...', value: 'open' },
  { label: 'Save', value: 'save' },
]

const editItems = [
  { label: 'Undo', value: 'undo' },
  { label: 'Redo', value: 'redo' },
  { label: 'Cut', value: 'cut' },
  { label: 'Copy', value: 'copy' },
]

export const MultipleMenu = () => (
  <div style={{ display: 'flex', gap: '0.5rem' }}>
    <Menu id="file" label="File" items={fileItems} />
    <Menu id="edit" label="Edit" items={editItems} />
  </div>
)
