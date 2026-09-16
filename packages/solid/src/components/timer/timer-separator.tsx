import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useTimerContext } from './use-timer-context.ts'

export interface TimerSeparatorBaseProps extends PolymorphicProps<'div'> {}
export interface TimerSeparatorProps extends HTMLProps<'div'>, TimerSeparatorBaseProps {}

export const TimerSeparator = (props: TimerSeparatorProps) => {
  const timer = useTimerContext()

  const mergedProps = mergeProps(() => timer().getSeparatorProps(), props)

  return <codesign.div {...mergedProps} />
}
