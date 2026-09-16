import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useCollapsibleContext } from './use-collapsible-context.ts'

export interface CollapsibleTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface CollapsibleTriggerProps extends HTMLProps<'button'>, CollapsibleTriggerBaseProps {}

export const CollapsibleTrigger = (props: CollapsibleTriggerProps) => {
  const api = useCollapsibleContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)
  return <codesign.button {...mergedProps} />
}
