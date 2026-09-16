<script lang="ts">
import type { TriggerProps } from '@zag-js/drawer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DrawerTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface DrawerTriggerProps
  extends
    DrawerTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

const props = defineProps<DrawerTriggerProps>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <codesign.button v-bind="drawer.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
