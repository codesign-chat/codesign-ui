'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerTitleBaseProps extends PolymorphicProps {}
export interface DrawerTitleProps extends HTMLProps<'h2'>, DrawerTitleBaseProps {}

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>((props, ref) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getTitleProps(), props)

  return <codesign.h2 {...mergedProps} ref={ref} />
})

DrawerTitle.displayName = 'DrawerTitle'
