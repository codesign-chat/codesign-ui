import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverArrowBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverArrowProps extends HTMLProps<'div'>, PopoverArrowBaseProps {}

export const PopoverArrow = (props: PopoverArrowProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().getArrowProps(), props)

  return <codesign.div {...mergedProps} />
}
