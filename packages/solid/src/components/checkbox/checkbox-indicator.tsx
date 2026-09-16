import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useCheckboxContext } from './use-checkbox-context.ts'

interface IndicatorProps {
  indeterminate?: boolean
}

export interface CheckboxIndicatorBaseProps extends IndicatorProps, PolymorphicProps<'div'> {}
export interface CheckboxIndicatorProps extends HTMLProps<'div'>, CheckboxIndicatorBaseProps {}

export const CheckboxIndicator = (props: CheckboxIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<IndicatorProps>()(props, ['indeterminate'])
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().getIndicatorProps(), localProps)

  return (
    <codesign.div
      {...mergedProps}
      hidden={!(indicatorProps.indeterminate ? checkbox().indeterminate : checkbox().checked)}
    />
  )
}
