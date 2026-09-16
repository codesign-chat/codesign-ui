<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MenuItemGroupLabelBaseProps extends PolymorphicProps {}
export interface MenuItemGroupLabelProps
  extends
    MenuItemGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { useMenuItemGroupContext } from './use-menu-item-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<MenuItemGroupLabelProps>()

const menu = useMenuContext()
const itemGroup = useMenuItemGroupContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="menu.getItemGroupLabelProps({ htmlFor: itemGroup.id })" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
