'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'

export interface ClipboardValueTextBaseProps extends PolymorphicProps {}
export interface ClipboardValueTextProps extends HTMLProps<'span'>, ClipboardValueTextBaseProps {}

export const ClipboardValueText = forwardRef<HTMLDivElement, ClipboardValueTextProps>((props, ref) => {
  const clipboard = useClipboardContext()
  return (
    <codesign.span {...props} ref={ref}>
      {props.children || clipboard.value}
    </codesign.span>
  )
})

ClipboardValueText.displayName = 'ClipboardValueText'
