import { type HTMLProps, type PolymorphicProps, codesign } from '../factory'

export interface TocContentBaseProps extends PolymorphicProps<'article'> {}
export interface TocContentProps extends HTMLProps<'article'>, TocContentBaseProps {}

export const TocContent = (props: TocContentProps) => {
  return <codesign.article {...props} />
}
