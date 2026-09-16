import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverArrowTipBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverArrowTipProps extends HTMLProps<'div'>, PopoverArrowTipBaseProps {}

export const PopoverArrowTip = (props: PopoverArrowTipProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().getArrowTipProps(), props)

  return <codesign.div {...mergedProps} />
}
