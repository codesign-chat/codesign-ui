<script lang="ts">
import type { LabelHTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseSwitchReturn } from './use-switch.ts'

interface RootProviderProps {
  value: UnwrapRef<UseSwitchReturn>
}

export interface SwitchRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SwitchRootProviderProps
  extends
    SwitchRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { codesign } from '../factory.ts'
import { SwitchProvider } from './use-switch-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SwitchRootProviderProps>()
const api = computed(() => props.value)

SwitchProvider(api)

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="api.getRootProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
