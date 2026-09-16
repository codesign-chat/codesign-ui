<script lang="ts">
  import { JsonTreeView } from '@codesign-ui/svelte/json-tree-view'
  import { ChevronRightIcon } from 'lucide-svelte'
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
</script>

<JsonTreeView.Root defaultExpandedDepth={1} class={styles.Root} {data}>
  <JsonTreeView.Tree class={styles.Tree}>
    {#snippet arrow()}
      <ChevronRightIcon />
    {/snippet}
  </JsonTreeView.Tree>
</JsonTreeView.Root>
