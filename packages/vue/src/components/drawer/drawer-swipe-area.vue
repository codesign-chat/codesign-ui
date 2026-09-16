<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps {}
export interface DrawerSwipeAreaProps
  extends
    DrawerSwipeAreaBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

defineProps<DrawerSwipeAreaProps>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <codesign.div v-bind="drawer.getSwipeAreaProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
