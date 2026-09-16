<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MenuArrowBaseProps extends PolymorphicProps {}
export interface MenuArrowProps
  extends
    MenuArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<MenuArrowProps>()
const menu = useMenuContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="menu.getArrowProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
