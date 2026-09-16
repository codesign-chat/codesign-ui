import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory'
import { useTocContext } from './use-toc-context'

export interface TocNavBaseProps extends PolymorphicProps<'nav'> {
  placement?: 'left' | 'right'
}
export interface TocNavProps extends HTMLProps<'nav'>, TocNavBaseProps {}

export const TocNav = (props: TocNavProps) => {
  const { placement, ...rest } = props
  const toc = useTocContext()
  const mergedProps = mergeProps(() => toc().getRootProps(), rest)
  return <codesign.nav {...mergedProps} data-placement={placement} />
}
