import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useHoverCardContext } from './use-hover-card-context.ts'

export interface HoverCardArrowBaseProps extends PolymorphicProps<'div'> {}
export interface HoverCardArrowProps extends HTMLProps<'div'>, HoverCardArrowBaseProps {}

export const HoverCardArrow = (props: HoverCardArrowProps) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(() => hoverCard().getArrowProps(), props)

  return <codesign.div {...mergedProps} />
}
