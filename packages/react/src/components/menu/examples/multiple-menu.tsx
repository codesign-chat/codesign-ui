import { Menu as CodesignMenu } from '@codesign-ui/react'
import { ChevronDownIcon } from 'lucide-react'
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
  const { id, label, items, onSelect } = props
  return (
    <CodesignMenu.Root onSelect={(e) => onSelect?.(e.value)} id={id}>
      <CodesignMenu.Trigger className={styles.Trigger}>
        {label}
        <CodesignMenu.Indicator className={styles.Indicator}>
          <ChevronDownIcon />
        </CodesignMenu.Indicator>
      </CodesignMenu.Trigger>
      <CodesignMenu.Positioner>
        <CodesignMenu.Content className={styles.Content}>
          {items.map((item) => (
            <CodesignMenu.Item className={styles.Item} key={item.value} value={item.value}>
              {item.label}
            </CodesignMenu.Item>
          ))}
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
