import type { HandleProps } from '@zag-js/image-cropper'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useImageCropperContext } from './use-image-cropper-context.ts'

export interface ImageCropperHandleBaseProps extends PolymorphicProps<'div'>, HandleProps {}
export interface ImageCropperHandleProps extends HTMLProps<'div'>, ImageCropperHandleBaseProps {}

export const ImageCropperHandle = (props: ImageCropperHandleProps) => {
  const api = useImageCropperContext()
  const mergedProps = mergeProps(() => api().getHandleProps({ position: props.position }), props)

  return <codesign.div {...mergedProps} />
}
