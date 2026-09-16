'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerGrabberIndicatorBaseProps extends PolymorphicProps {}
export interface DrawerGrabberIndicatorProps extends HTMLProps<'div'>, DrawerGrabberIndicatorBaseProps {}

export const DrawerGrabberIndicator = forwardRef<HTMLDivElement, DrawerGrabberIndicatorProps>((props, ref) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getGrabberIndicatorProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

DrawerGrabberIndicator.displayName = 'DrawerGrabberIndicator'
