import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { usePinInputContext } from './use-pin-input-context.ts'

export interface PinInputLabelBaseProps extends PolymorphicProps<'label'> {}
export interface PinInputLabelProps extends HTMLProps<'label'>, PinInputLabelBaseProps {}

export const PinInputLabel = (props: PinInputLabelProps) => {
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <codesign.label {...mergedProps} />
}
