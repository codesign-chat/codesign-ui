<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DialogTitleBaseProps extends PolymorphicProps {}
export interface DialogTitleProps
  extends
    DialogTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDialogContext } from './use-dialog-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DialogTitleProps>()
const dialog = useDialogContext()

useForwardExpose()
</script>

<template>
  <codesign.h2 v-bind="dialog.getTitleProps()" :as-child="asChild">
    <slot />
  </codesign.h2>
</template>
