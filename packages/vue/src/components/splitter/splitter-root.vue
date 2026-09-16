<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './splitter.types.ts'

export interface SplitterRootBaseProps extends RootProps, PolymorphicProps {}
export interface SplitterRootProps
  extends
    SplitterRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface SplitterRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSplitter } from './use-splitter.ts'
import { SplitterProvider } from './use-splitter-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SplitterRootProps>()
const emits = defineEmits<SplitterRootEmits>()

const splitter = useSplitter(props, emits)
SplitterProvider(splitter)

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="splitter.getRootProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
