<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DrawerCloseTriggerBaseProps extends PolymorphicProps {}
export interface DrawerCloseTriggerProps
  extends
    DrawerCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

defineProps<DrawerCloseTriggerProps>()
const drawer = useDrawerContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="drawer.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
