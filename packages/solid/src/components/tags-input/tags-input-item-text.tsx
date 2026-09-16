import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context.ts'

export interface TagsInputItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface TagsInputItemTextProps extends HTMLProps<'span'>, TagsInputItemTextBaseProps {}

export const TagsInputItemText = (props: TagsInputItemTextProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <codesign.span {...mergedProps} />
}
