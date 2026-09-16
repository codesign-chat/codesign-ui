import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useProgressContext } from './use-progress-context.ts'

export interface ProgressValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface ProgressValueTextProps extends HTMLProps<'span'>, ProgressValueTextBaseProps {}

export const ProgressValueText = (props: ProgressValueTextProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().getValueTextProps(), props)

  return <codesign.span {...mergedProps}>{props.children || api().percentAsString}</codesign.span>
}
