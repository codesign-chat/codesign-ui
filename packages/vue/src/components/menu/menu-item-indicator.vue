<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MenuItemIndicatorBaseProps extends PolymorphicProps {}
export interface MenuItemIndicatorProps
  extends
    MenuItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { useMenuItemPropsContext } from './use-menu-option-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<MenuItemIndicatorProps>()

const menu = useMenuContext()
const itemProps = useMenuItemPropsContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="menu.getItemIndicatorProps(itemProps)" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
