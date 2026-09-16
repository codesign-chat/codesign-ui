import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverDescriptionBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverDescriptionProps extends HTMLProps<'div'>, PopoverDescriptionBaseProps {}

export const PopoverDescription = (props: PopoverDescriptionProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().getDescriptionProps(), props)

  return <codesign.div {...mergedProps} />
}
