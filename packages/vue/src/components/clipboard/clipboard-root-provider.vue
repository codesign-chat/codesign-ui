<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseClipboardReturn } from './use-clipboard.ts'

interface RootProviderProps {
  value: UnwrapRef<UseClipboardReturn>
}

export interface ClipboardRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ClipboardRootProviderProps
  extends
    ClipboardRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { codesign } from '../factory.ts'
import { ClipboardProvider } from './use-clipboard-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ClipboardRootProviderProps>()
const clipboard = computed(() => props.value)

ClipboardProvider(clipboard)

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="clipboard.getRootProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
