'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'

export interface ClipboardControlBaseProps extends PolymorphicProps {}
export interface ClipboardControlProps extends HTMLProps<'div'>, ClipboardControlBaseProps {}

export const ClipboardControl = forwardRef<HTMLDivElement, ClipboardControlProps>((props, ref) => {
  const clipboard = useClipboardContext()
  const mergedProps = mergeProps(clipboard.getControlProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

ClipboardControl.displayName = 'ClipboardControl'
