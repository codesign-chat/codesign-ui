'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerPositionerBaseProps extends PolymorphicProps {}
export interface DrawerPositionerProps extends HTMLProps<'div'>, DrawerPositionerBaseProps {}

export const DrawerPositioner = forwardRef<HTMLDivElement, DrawerPositionerProps>((props, ref) => {
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(drawer.getPositionerProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <codesign.div {...mergedProps} ref={ref} />
})

DrawerPositioner.displayName = 'DrawerPositioner'
