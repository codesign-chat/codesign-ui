import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useFieldContext } from './use-field-context.ts'

export interface FieldSelectBaseProps extends PolymorphicProps<'select'> {}
export interface FieldSelectProps extends HTMLProps<'select'>, FieldSelectBaseProps {}

export const FieldSelect = (props: FieldSelectProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field?.().getSelectProps(), props)

  return <codesign.select {...mergedProps} />
}
