<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FileUploadTriggerBaseProps extends PolymorphicProps {}
export interface FileUploadTriggerProps
  extends
    FileUploadTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FileUploadTriggerProps>()
const fileUpload = useFileUploadContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="fileUpload.getTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
