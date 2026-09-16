<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import { useMenuTriggerItemContext } from './use-menu-trigger-item-context.ts'

export interface MenuTriggerItemBaseProps extends PolymorphicProps {}
export interface MenuTriggerItemProps
  extends
    MenuTriggerItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { codesign } from '../factory.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { MenuItemPropsProvider } from './use-menu-option-item-props-context.ts'

defineProps<MenuTriggerItemProps>()
const triggerItemProps = useMenuTriggerItemContext()

MenuItemPropsProvider(computed(() => ({ value: (triggerItemProps.value as any)?.['data-value'] })))

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="triggerItemProps" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
