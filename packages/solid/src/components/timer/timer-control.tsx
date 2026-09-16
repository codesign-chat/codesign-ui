import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useTimerContext } from './use-timer-context.ts'

export interface TimerControlBaseProps extends PolymorphicProps<'div'> {}
export interface TimerControlProps extends HTMLProps<'div'>, TimerControlBaseProps {}

export const TimerControl = (props: TimerControlProps) => {
  const timer = useTimerContext()
  const mergedProps = mergeProps(() => timer().getControlProps(), props)

  return <codesign.div {...mergedProps} />
}
