import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useSelectContext } from './use-select-context.ts'

export interface SelectControlBaseProps extends PolymorphicProps<'div'> {}
export interface SelectControlProps extends HTMLProps<'div'>, SelectControlBaseProps {}

export const SelectControl = (props: SelectControlProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getControlProps(), props)

  return <codesign.div {...mergedProps} />
}
