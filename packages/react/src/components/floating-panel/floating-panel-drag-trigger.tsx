'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

export interface FloatingPanelDragTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelDragTriggerProps extends HTMLProps<'div'>, FloatingPanelDragTriggerBaseProps {}

export const FloatingPanelDragTrigger = forwardRef<HTMLDivElement, FloatingPanelDragTriggerProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getDragTriggerProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

FloatingPanelDragTrigger.displayName = 'FloatingPanelDragTrigger'
