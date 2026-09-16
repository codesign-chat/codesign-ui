import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSwitchContext } from './use-switch-context.ts'

export interface SwitchLabelBaseProps extends PolymorphicProps<'span'> {}
export interface SwitchLabelProps extends HTMLProps<'span'>, SwitchLabelBaseProps {}

export const SwitchLabel = (props: SwitchLabelProps) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <codesign.span {...mergedProps} />
}
