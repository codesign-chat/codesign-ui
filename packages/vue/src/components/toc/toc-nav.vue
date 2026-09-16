<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TocNavBaseProps extends PolymorphicProps {
  placement?: 'left' | 'right'
}
export interface TocNavProps
  extends
    TocNavBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useTocContext } from './use-toc-context'

defineProps<TocNavProps>()
const toc = useTocContext()

useForwardExpose()
</script>

<template>
  <codesign.nav v-bind="toc.getRootProps()" :data-placement="placement" :as-child="asChild">
    <slot />
  </codesign.nav>
</template>
