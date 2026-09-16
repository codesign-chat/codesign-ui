<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ImageCropperSelectionBaseProps extends PolymorphicProps {}
export interface ImageCropperSelectionProps
  extends
    ImageCropperSelectionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useImageCropperContext } from './use-image-cropper-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ImageCropperSelectionProps>()
const imageCropper = useImageCropperContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="imageCropper.getSelectionProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
