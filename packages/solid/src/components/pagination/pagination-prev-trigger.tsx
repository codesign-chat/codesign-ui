import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { usePaginationContext } from './use-pagination-context.ts'

export interface PaginationPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PaginationPrevTriggerProps extends HTMLProps<'button'>, PaginationPrevTriggerBaseProps {}

export const PaginationPrevTrigger = (props: PaginationPrevTriggerProps) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().getPrevTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
