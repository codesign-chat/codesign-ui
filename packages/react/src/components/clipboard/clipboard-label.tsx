'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'

export interface ClipboardLabelBaseProps extends PolymorphicProps {}
export interface ClipboardLabelProps extends HTMLProps<'label'>, ClipboardLabelBaseProps {}

export const ClipboardLabel = forwardRef<HTMLLabelElement, ClipboardLabelProps>((props, ref) => {
  const clipboard = useClipboardContext()
  const mergedProps = mergeProps(clipboard.getLabelProps(), props)

  return <codesign.label {...mergedProps} ref={ref} />
})

ClipboardLabel.displayName = 'ClipboardLabel'
