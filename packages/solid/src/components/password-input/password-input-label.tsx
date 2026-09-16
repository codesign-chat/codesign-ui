import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { usePasswordInputContext } from './use-password-input-context.ts'

export interface PasswordInputLabelBaseProps extends PolymorphicProps<'label'> {}
export interface PasswordInputLabelProps extends HTMLProps<'label'>, PasswordInputLabelBaseProps {}

export const PasswordInputLabel = (props: PasswordInputLabelProps) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(() => passwordInput().getLabelProps(), props)

  return <codesign.label {...mergedProps} />
}
