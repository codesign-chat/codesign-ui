<script setup lang="ts">
import { JsonTreeView } from '@codesign-ui/vue/json-tree-view'
import { ChevronRightIcon } from 'lucide-vue-next'
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

<template>
  <JsonTreeView.Root :defaultExpandedDepth="1" :class="styles.Root" :data="data">
    <JsonTreeView.Tree :class="styles.Tree">
      <template #arrow>
        <ChevronRightIcon />
      </template>
    </JsonTreeView.Tree>
  </JsonTreeView.Root>
</template>
