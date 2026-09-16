'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { type UseScrollAreaProps, useScrollArea } from './use-scroll-area.ts'
import { ScrollAreaProvider } from './use-scroll-area-context.ts'

export interface ScrollAreaRootBaseProps extends UseScrollAreaProps, PolymorphicProps {}
export interface ScrollAreaRootProps extends HTMLProps<'div'>, ScrollAreaRootBaseProps {}

const splitRootProps = createSplitProps<UseScrollAreaProps>()

export const ScrollAreaRoot = forwardRef<HTMLDivElement, ScrollAreaRootProps>((props, ref) => {
  const [useScrollAreaProps, localProps] = splitRootProps(props, ['id', 'ids'])
  const scrollArea = useScrollArea(useScrollAreaProps)
  const mergedProps = mergeProps(scrollArea.getRootProps(), localProps)

  return (
    <ScrollAreaProvider value={scrollArea}>
      <codesign.div {...mergedProps} ref={ref} />
    </ScrollAreaProvider>
  )
})

ScrollAreaRoot.displayName = 'ScrollAreaRoot'
