<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'

export interface DialogContentBaseProps extends PolymorphicProps {}
export interface DialogContentProps
  extends
    DialogContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDialogContext } from './use-dialog-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DialogContentProps>()

const dialog = useDialogContext()
const presence = usePresenceContext()
const mergedProps = computed(() => mergeProps(dialog.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <codesign.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
