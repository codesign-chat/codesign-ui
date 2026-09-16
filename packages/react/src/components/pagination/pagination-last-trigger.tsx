'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationLastTriggerBaseProps extends PolymorphicProps {}
export interface PaginationLastTriggerProps extends HTMLProps<'button'>, PaginationLastTriggerBaseProps {}

export const PaginationLastTrigger = forwardRef<HTMLButtonElement, PaginationLastTriggerProps>((props, ref) => {
  const pagination = usePaginationContext()
  const mergedProps = mergeProps(pagination.getLastTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

PaginationLastTrigger.displayName = 'PaginationLastTrigger'
