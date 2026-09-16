'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'

export interface SelectListBaseProps extends PolymorphicProps {}
export interface SelectListProps extends HTMLProps<'div'>, SelectListBaseProps {}

export const SelectList = forwardRef<HTMLDivElement, SelectListProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getListProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

SelectList.displayName = 'SelectList'
