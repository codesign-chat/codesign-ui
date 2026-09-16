<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MenuContextTriggerBaseProps extends PolymorphicProps {}
export interface MenuContextTriggerProps
  extends
    MenuContextTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<MenuContextTriggerProps>()
const menu = useMenuContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="menu.getContextTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
