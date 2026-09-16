<script lang="ts">
import type { ItemProps } from '@zag-js/toggle-group'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ToggleGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface ToggleGroupItemProps
  extends
    ToggleGroupItemBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useToggleGroupContext } from './use-toggle-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ToggleGroupItemProps>()
const toggleGroup = useToggleGroupContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="toggleGroup.getItemProps(props)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
