'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'

export interface SelectControlBaseProps extends PolymorphicProps {}
export interface SelectControlProps extends HTMLProps<'div'>, SelectControlBaseProps {}

export const SelectControl = forwardRef<HTMLDivElement, SelectControlProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getControlProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})
SelectControl.displayName = 'SelectControl'
