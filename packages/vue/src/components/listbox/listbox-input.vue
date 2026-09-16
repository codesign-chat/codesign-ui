<script lang="ts">
import type { InputProps } from '@zag-js/listbox'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ListboxInputBaseProps extends InputProps, PolymorphicProps {}
export interface ListboxInputProps
  extends
    ListboxInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'

const props = defineProps<ListboxInputProps>()
const listbox = useListboxContext()
useForwardExpose()
</script>

<template>
  <codesign.input
    v-bind="listbox.getInputProps({ autoHighlight: props.autoHighlight, keyboardPriority: props.keyboardPriority })"
    :as-child="asChild"
  >
    <slot />
  </codesign.input>
</template>
