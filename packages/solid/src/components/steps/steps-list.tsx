import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useStepsContext } from './use-steps-context.ts'

export interface StepsListBaseProps extends PolymorphicProps<'div'> {}
export interface StepsListProps extends HTMLProps<'div'>, StepsListBaseProps {}

export const StepsList = (props: StepsListProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(() => steps().getListProps(), props)

  return <codesign.div {...mergedProps} />
}
