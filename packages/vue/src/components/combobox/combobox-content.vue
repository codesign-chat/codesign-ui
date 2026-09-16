<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'

export interface ComboboxContentBaseProps extends PolymorphicProps {}
export interface ComboboxContentProps
  extends
    ComboboxContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ComboboxContentProps>()
const combobox = useComboboxContext()
const presence = usePresenceContext()
const mergedProps = computed(() => mergeProps(combobox.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <codesign.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
