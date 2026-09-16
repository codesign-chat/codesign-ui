<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import type { PolymorphicProps } from '../factory.ts'
import { useToggleContext } from './use-toggle-context.ts'

export interface ToggleIndicatorBaseProps extends PolymorphicProps {}
export interface ToggleIndicatorProps
  extends
    ToggleIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

defineProps<ToggleIndicatorProps>()
const toggle = useToggleContext()

const fallback = computed(() => !toggle.value.pressed)

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="toggle.getIndicatorProps()" :as-child="asChild">
    <slot v-if="!fallback" />
    <slot v-else name="fallback" />
  </codesign.span>
</template>
