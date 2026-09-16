'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useScrollAreaContext } from './use-scroll-area-context.ts'

export interface ScrollAreaContentBaseProps extends PolymorphicProps {}
export interface ScrollAreaContentProps extends HTMLProps<'div'>, ScrollAreaContentBaseProps {}

export const ScrollAreaContent = forwardRef<HTMLDivElement, ScrollAreaContentProps>((props, ref) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(scrollArea.getContentProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

ScrollAreaContent.displayName = 'ScrollAreaContent'
