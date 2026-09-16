import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { usePasswordInputContext } from './use-password-input-context.ts'

export interface PasswordInputVisibilityTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PasswordInputVisibilityTriggerProps
  extends HTMLProps<'button'>, PasswordInputVisibilityTriggerBaseProps {}

export const PasswordInputVisibilityTrigger = (props: PasswordInputVisibilityTriggerProps) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(() => passwordInput().getVisibilityTriggerProps(), props)

  return <codesign.button {...mergedProps} />
}
