'use client'

import type { EllipsisProps } from '@zag-js/pagination'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationEllipsisBaseProps extends EllipsisProps, PolymorphicProps {}
export interface PaginationEllipsisProps extends HTMLProps<'div'>, PaginationEllipsisBaseProps {}

const splitEllipsisProps = createSplitProps<EllipsisProps>()

export const PaginationEllipsis = forwardRef<HTMLDivElement, PaginationEllipsisProps>((props, ref) => {
  const [ellipsisProps, localProps] = splitEllipsisProps(props, ['index'])
  const pagination = usePaginationContext()
  const mergedProps = mergeProps(pagination.getEllipsisProps(ellipsisProps), localProps)

  return <codesign.div {...mergedProps} ref={ref} />
})

PaginationEllipsis.displayName = 'PaginationEllipsis'
