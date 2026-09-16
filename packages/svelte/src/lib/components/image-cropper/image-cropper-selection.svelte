<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ImageCropperSelectionBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ImageCropperSelectionProps extends Assign<HTMLProps<'div'>, ImageCropperSelectionBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useImageCropperContext } from './use-image-cropper-context.ts'

  let { ref = $bindable(null), ...props }: ImageCropperSelectionProps = $props()
  const imageCropper = useImageCropperContext()
  const mergedProps = $derived(mergeProps(imageCropper().getSelectionProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
