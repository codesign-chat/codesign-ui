import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useDateInputContext } from './use-date-input-context.ts'

export interface DateInputControlBaseProps extends PolymorphicProps<'div'> {}
export interface DateInputControlProps extends HTMLProps<'div'>, DateInputControlBaseProps {}

export const DateInputControl = (props: DateInputControlProps) => {
  const api = useDateInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)
  return <codesign.div {...mergedProps} />
}
