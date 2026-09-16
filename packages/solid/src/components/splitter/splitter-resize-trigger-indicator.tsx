import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSplitterContext } from './use-splitter-context.ts'
import { useSplitterResizeTriggerPropsContext } from './use-splitter-resize-trigger-props-context.ts'

export interface SplitterResizeTriggerIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface SplitterResizeTriggerIndicatorProps
  extends HTMLProps<'div'>, SplitterResizeTriggerIndicatorBaseProps {}

export const SplitterResizeTriggerIndicator = (props: SplitterResizeTriggerIndicatorProps) => {
  const splitter = useSplitterContext()
  const triggerProps = useSplitterResizeTriggerPropsContext()
  const mergedProps = mergeProps(() => splitter().getResizeTriggerIndicator(triggerProps), props)

  return <codesign.div {...mergedProps} />
}
