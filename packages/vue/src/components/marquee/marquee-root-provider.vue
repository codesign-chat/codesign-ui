<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseMarqueeReturn } from './use-marquee.ts'

interface RootProviderProps {
  value: UnwrapRef<UseMarqueeReturn>
}

export interface MarqueeRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface MarqueeRootProviderProps
  extends
    MarqueeRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { MarqueeProvider } from './use-marquee-context.ts'

const props = defineProps<MarqueeRootProviderProps>()
const marquee = computed(() => props.value)

MarqueeProvider(marquee)

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="marquee.getRootProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
