'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps {}
export interface DrawerSwipeAreaProps extends HTMLProps<'div'>, DrawerSwipeAreaBaseProps {}

export const DrawerSwipeArea = forwardRef<HTMLDivElement, DrawerSwipeAreaProps>((props, ref) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getSwipeAreaProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

DrawerSwipeArea.displayName = 'DrawerSwipeArea'
