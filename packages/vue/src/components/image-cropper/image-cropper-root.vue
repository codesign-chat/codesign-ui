<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './image-cropper.types.ts'

export interface ImageCropperRootBaseProps extends RootProps, PolymorphicProps {}
export interface ImageCropperRootProps
  extends
    ImageCropperRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ImageCropperRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useImageCropper } from './use-image-cropper.ts'
import { ImageCropperProvider } from './use-image-cropper-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ImageCropperRootProps>()

const emits = defineEmits<ImageCropperRootEmits>()

const imageCropper = useImageCropper({}, emits)
ImageCropperProvider(imageCropper)

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="imageCropper.getRootProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
