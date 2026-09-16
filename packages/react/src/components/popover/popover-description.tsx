'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverDescriptionBaseProps extends PolymorphicProps {}
export interface PopoverDescriptionProps extends HTMLProps<'div'>, PopoverDescriptionBaseProps {}

export const PopoverDescription = forwardRef<HTMLDivElement, PopoverDescriptionProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getDescriptionProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

PopoverDescription.displayName = 'PopoverDescription'
