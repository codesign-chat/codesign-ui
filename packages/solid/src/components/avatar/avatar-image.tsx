import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useAvatarContext } from './use-avatar-context.ts'

export interface AvatarImageBaseProps extends PolymorphicProps<'img'> {}
export interface AvatarImageProps extends HTMLProps<'img'>, AvatarImageBaseProps {}

export const AvatarImage = (props: AvatarImageProps) => {
  const context = useAvatarContext()
  const mergedProps = mergeProps(() => context().getImageProps(), props)
  return <codesign.img {...mergedProps} />
}
