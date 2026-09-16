import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useFieldContext } from './use-field-context.ts'

export interface FieldHelperTextBaseProps extends PolymorphicProps<'span'> {}
export interface FieldHelperTextProps extends HTMLProps<'span'>, FieldHelperTextBaseProps {}

export const FieldHelperText = (props: FieldHelperTextProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field().getHelperTextProps(), props)

  return <codesign.span {...mergedProps} />
}
