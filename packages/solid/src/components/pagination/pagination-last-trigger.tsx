import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationLastTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PaginationLastTriggerProps extends HTMLProps<'button'>, PaginationLastTriggerBaseProps {}

export const PaginationLastTrigger = (props: PaginationLastTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getLastTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
