<script lang="ts">
import type { TriggerProps } from '@zag-js/dialog'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DialogTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface DialogTriggerProps
  extends
    DialogTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDialogContext } from './use-dialog-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<DialogTriggerProps>()
const dialog = useDialogContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="dialog.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
