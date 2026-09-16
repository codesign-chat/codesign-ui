<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NavigationMenuArrowBaseProps extends PolymorphicProps {}
export interface NavigationMenuArrowProps
  extends
    NavigationMenuArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<NavigationMenuArrowProps>()
const navigationMenu = useNavigationMenuContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="navigationMenu.getArrowProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
