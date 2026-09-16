<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FileUploadItemDeleteTriggerBaseProps extends PolymorphicProps {}
export interface FileUploadItemDeleteTriggerProps
  extends
    FileUploadItemDeleteTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FileUploadItemDeleteTriggerProps>()
const fileUpload = useFileUploadContext()
const itemProps = useFileUploadItemPropsContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="fileUpload.getItemDeleteTriggerProps(itemProps)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
