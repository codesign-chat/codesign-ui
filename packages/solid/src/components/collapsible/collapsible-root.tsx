import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { type UseCollapsibleProps, useCollapsible } from './use-collapsible.ts'
import { CollapsibleProvider } from './use-collapsible-context.ts'

export interface CollapsibleRootBaseProps extends UseCollapsibleProps, PolymorphicProps<'div'> {}
export interface CollapsibleRootProps extends HTMLProps<'div'>, CollapsibleRootBaseProps {}

export const CollapsibleRoot = (props: CollapsibleRootProps) => {
  const [useCollapsibleProps, localProps] = createSplitProps<UseCollapsibleProps>()(props, [
    'collapsedHeight',
    'collapsedWidth',
    'defaultOpen',
    'disabled',
    'id',
    'ids',
    'lazyMount',
    'onExitComplete',
    'onOpenChange',
    'open',
    'unmountOnExit',
  ])

  const api = useCollapsible(useCollapsibleProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <CollapsibleProvider value={api}>
      <codesign.div {...mergedProps} />
    </CollapsibleProvider>
  )
}
