import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useStepsContext } from './use-steps-context.ts'

export interface StepsNextTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface StepsNextTriggerProps extends HTMLProps<'button'>, StepsNextTriggerBaseProps {}

export const StepsNextTrigger = (props: StepsNextTriggerProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(() => steps().getNextTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
