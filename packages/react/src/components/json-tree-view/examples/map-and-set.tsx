import { JsonTreeView } from '@codesign-ui/react/json-tree-view'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/json-tree-view.module.css'

const data = new Map<string, any>([
  ['name', 'codesign-ui-json-tree'],
  ['license', 'MIT'],
  ['elements', new Set(['codesign-ui', 123, false, true, null, undefined, 456n])],
  [
    'nested',
    new Map<string, any>([
      [
        'taglines',
        new Set([
          { name: 'codesign-ui', feature: 'headless components' },
          { name: 'codesign-ui', feature: 'framework agnostic' },
          { name: 'codesign-ui', feature: 'accessible by default' },
        ]),
      ],
    ]),
  ],
])

export const MapAndSet = () => {
  return (
    <JsonTreeView.Root defaultExpandedDepth={1} className={styles.Root} data={data}>
      <JsonTreeView.Tree className={styles.Tree} arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
