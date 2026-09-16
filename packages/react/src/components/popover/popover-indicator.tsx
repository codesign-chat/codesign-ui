'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverIndicatorBaseProps extends PolymorphicProps {}
export interface PopoverIndicatorProps extends HTMLProps<'div'>, PopoverIndicatorBaseProps {}

export const PopoverIndicator = forwardRef<HTMLDivElement, PopoverIndicatorProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getIndicatorProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

PopoverIndicator.displayName = 'PopoverIndicator'
