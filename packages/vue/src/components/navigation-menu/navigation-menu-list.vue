<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NavigationMenuListBaseProps extends PolymorphicProps {}
export interface NavigationMenuListProps
  extends
    NavigationMenuListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<NavigationMenuListProps>()
const navigationMenu = useNavigationMenuContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="navigationMenu.getListProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
