import type { ViewProps } from '@zag-js/progress'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useProgressContext } from './use-progress-context.ts'

export interface ProgressViewBaseProps extends ViewProps, PolymorphicProps<'span'> {}
export interface ProgressViewProps extends HTMLProps<'span'>, ProgressViewBaseProps {}

export const ProgressView = (props: ProgressViewProps) => {
  const [state, localProps] = createSplitProps<ViewProps>()(props, ['state'])
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getViewProps(state), localProps)

  return <codesign.span {...mergedProps} />
}
