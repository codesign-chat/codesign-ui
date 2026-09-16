'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverArrowBaseProps extends PolymorphicProps {}
export interface PopoverArrowProps extends HTMLProps<'div'>, PopoverArrowBaseProps {}

export const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getArrowProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

PopoverArrow.displayName = 'PopoverArrow'
