<script lang="ts">
import type { TriggerProps } from '@zag-js/menu'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MenuTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface MenuTriggerProps
  extends
    MenuTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<MenuTriggerProps>()
const menu = useMenuContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="menu.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
