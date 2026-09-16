<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DialogPositionerBaseProps extends PolymorphicProps {}
export interface DialogPositionerProps
  extends
    DialogPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useDialogContext } from './use-dialog-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DialogPositionerProps>()

const dialog = useDialogContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-if="!presence.unmounted" v-bind="dialog.getPositionerProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
