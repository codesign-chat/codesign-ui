'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerCloseTriggerBaseProps extends PolymorphicProps {}
export interface DrawerCloseTriggerProps extends HTMLProps<'button'>, DrawerCloseTriggerBaseProps {}

export const DrawerCloseTrigger = forwardRef<HTMLButtonElement, DrawerCloseTriggerProps>((props, ref) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getCloseTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

DrawerCloseTrigger.displayName = 'DrawerCloseTrigger'
