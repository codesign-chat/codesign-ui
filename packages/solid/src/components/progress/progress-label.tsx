import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useProgressContext } from './use-progress-context.ts'

export interface ProgressLabelBaseProps extends PolymorphicProps<'span'> {}
export interface ProgressLabelProps extends HTMLProps<'span'>, ProgressLabelBaseProps {}

export const ProgressLabel = (props: ProgressLabelProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <codesign.span {...mergedProps} />
}
