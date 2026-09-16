import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory'

export interface TocContentBaseProps extends PolymorphicProps {}
export interface TocContentProps extends HTMLProps<'article'>, TocContentBaseProps {}

export const TocContent = forwardRef<HTMLElement, TocContentProps>((props, ref) => {
  return <codesign.article {...props} ref={ref} />
})

TocContent.displayName = 'TocContent'
