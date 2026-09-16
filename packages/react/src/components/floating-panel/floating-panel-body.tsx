'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

export interface FloatingPanelBodyBaseProps extends PolymorphicProps {}
export interface FloatingPanelBodyProps extends HTMLProps<'div'>, FloatingPanelBodyBaseProps {}

export const FloatingPanelBody = forwardRef<HTMLDivElement, FloatingPanelBodyProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getBodyProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

FloatingPanelBody.displayName = 'FloatingPanelBody'
