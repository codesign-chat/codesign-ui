<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourControlBaseProps extends PolymorphicProps {}
export interface TourControlProps
  extends
    TourControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { tourAnatomy } from './tour.anatomy.ts'

defineProps<TourControlProps>()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="{ ...tourAnatomy.build().control.attrs }" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
