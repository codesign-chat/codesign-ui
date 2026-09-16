import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useTagsInputContext } from './use-tags-input-context.ts'

export interface TagsInputClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface TagsInputClearTriggerProps extends HTMLProps<'button'>, TagsInputClearTriggerBaseProps {}

export const TagsInputClearTrigger = (props: TagsInputClearTriggerProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getClearTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
