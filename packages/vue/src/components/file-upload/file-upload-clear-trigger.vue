<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FileUploadClearTriggerBaseProps extends PolymorphicProps {}
export interface FileUploadClearTriggerProps
  extends
    FileUploadClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FileUploadClearTriggerProps>()
const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="fileUpload.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
