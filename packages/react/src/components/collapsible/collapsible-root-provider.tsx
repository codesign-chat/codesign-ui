'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import type { UseCollapsibleReturn } from './use-collapsible.ts'
import { CollapsibleProvider } from './use-collapsible-context.ts'

interface RootProviderProps {
  value: UseCollapsibleReturn
}

export interface CollapsibleRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface CollapsibleRootProviderProps extends HTMLProps<'div'>, CollapsibleRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const CollapsibleRootProvider = forwardRef<HTMLDivElement, CollapsibleRootProviderProps>((props, ref) => {
  const [{ value: collapsible }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(collapsible.getRootProps(), localProps)

  return (
    <CollapsibleProvider value={collapsible}>
      <codesign.div {...mergedProps} ref={ref} />
    </CollapsibleProvider>
  )
})

CollapsibleRootProvider.displayName = 'CollapsibleRootProvider'
