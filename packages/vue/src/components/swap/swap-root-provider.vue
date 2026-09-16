<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseSwapReturn } from './use-swap.ts'

export interface SwapRootProviderBaseProps extends PolymorphicProps {
  value: UseSwapReturn
}
export interface SwapRootProviderProps
  extends
    SwapRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { mergeProps } from '@zag-js/vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { SwapProvider } from './use-swap-context.ts'

const props = defineProps<SwapRootProviderProps>()

SwapProvider(props.value)

const mergedProps = computed(() => mergeProps(props.value.getRootProps()))

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="mergedProps" :as-child="asChild">
    <slot />
  </codesign.span>
</template>
