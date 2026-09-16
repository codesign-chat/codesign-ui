<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DialogDescriptionBaseProps extends PolymorphicProps {}
export interface DialogDescriptionProps
  extends
    DialogDescriptionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDialogContext } from './use-dialog-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DialogDescriptionProps>()
const dialog = useDialogContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="dialog.getDescriptionProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
