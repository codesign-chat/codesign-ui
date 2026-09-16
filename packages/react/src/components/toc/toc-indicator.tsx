import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory'
import { useTocContext } from './use-toc-context'

export interface TocIndicatorBaseProps extends PolymorphicProps {}
export interface TocIndicatorProps extends HTMLProps<'div'>, TocIndicatorBaseProps {}

export const TocIndicator = forwardRef<HTMLDivElement, TocIndicatorProps>((props, ref) => {
  const toc = useTocContext()
  const mergedProps = mergeProps(toc.getIndicatorProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

TocIndicator.displayName = 'TocIndicator'
