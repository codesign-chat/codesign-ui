import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useStepsContext } from './use-steps-context.ts'
import { useStepsItemPropsContext } from './use-steps-item-props-context.ts'

export interface StepsTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface StepsTriggerProps extends HTMLProps<'button'>, StepsTriggerBaseProps {}

export const StepsTrigger = (props: StepsTriggerProps) => {
  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = mergeProps(() => steps().getTriggerProps(itemProps), props)

  return <codesign.button {...mergedProps} />
}
