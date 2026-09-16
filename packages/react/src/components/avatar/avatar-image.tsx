'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useAvatarContext } from './use-avatar-context.ts'

export interface AvatarImageBaseProps extends PolymorphicProps {}
export interface AvatarImageProps extends HTMLProps<'img'>, AvatarImageBaseProps {}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>((props, ref) => {
  const avatar = useAvatarContext()
  const mergedProps = mergeProps(avatar.getImageProps(), props)

  return <codesign.img {...mergedProps} ref={ref} />
})

AvatarImage.displayName = 'AvatarImage'
