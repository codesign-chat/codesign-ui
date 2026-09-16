'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useCollapsibleContext } from './use-collapsible-context.ts'

export interface CollapsibleIndicatorBaseProps extends PolymorphicProps {}
export interface CollapsibleIndicatorProps extends HTMLProps<'div'>, CollapsibleIndicatorBaseProps {}

export const CollapsibleIndicator = forwardRef<HTMLDivElement, CollapsibleIndicatorProps>((props, ref) => {
  const collapsible = useCollapsibleContext()
  const mergedProps = mergeProps(collapsible.getIndicatorProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

CollapsibleIndicator.displayName = 'CollapsibleIndicator'
