<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { HandleProps } from '@zag-js/image-cropper'

export interface ImageCropperHandleBaseProps extends PolymorphicProps, HandleProps {}
export interface ImageCropperHandleProps
  extends
    ImageCropperHandleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useImageCropperContext } from './use-image-cropper-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ImageCropperHandleProps>()
const imageCropper = useImageCropperContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="imageCropper.getHandleProps({ position: props.position })" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
