import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverAnchorBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverAnchorProps extends HTMLProps<'div'>, PopoverAnchorBaseProps {}

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().getAnchorProps(), props)

  return <codesign.div {...mergedProps} />
}
