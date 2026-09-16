<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TocIndicatorBaseProps extends PolymorphicProps {}
export interface TocIndicatorProps
  extends
    TocIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useTocContext } from './use-toc-context'

defineProps<TocIndicatorProps>()
const toc = useTocContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="toc.getIndicatorProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
