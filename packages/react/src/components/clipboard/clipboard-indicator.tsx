'use client'

import { mergeProps } from '@zag-js/react'
import { type ReactNode, forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'

export interface ClipboardIndicatorBaseProps extends PolymorphicProps {
  copied?: ReactNode | undefined
}
export interface ClipboardIndicatorProps extends HTMLProps<'div'>, ClipboardIndicatorBaseProps {}

export const ClipboardIndicator = forwardRef<HTMLDivElement, ClipboardIndicatorProps>((props, ref) => {
  const { children, copied, ...localProps } = props
  const clipboard = useClipboardContext()
  const mergedProps = mergeProps(clipboard.getIndicatorProps({ copied: clipboard.copied }), localProps)

  return (
    <codesign.div {...mergedProps} ref={ref}>
      {clipboard.copied ? copied : children}
    </codesign.div>
  )
})

ClipboardIndicator.displayName = 'ClipboardIndicator'
