<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TocContentBaseProps extends PolymorphicProps {}
export interface TocContentProps
  extends
    TocContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<TocContentProps>()

useForwardExpose()
</script>

<template>
  <codesign.article :as-child="asChild">
    <slot />
  </codesign.article>
</template>
