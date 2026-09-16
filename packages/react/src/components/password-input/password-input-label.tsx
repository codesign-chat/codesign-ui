'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'

export interface PasswordInputLabelBaseProps extends PolymorphicProps {}
export interface PasswordInputLabelProps extends HTMLProps<'label'>, PasswordInputLabelBaseProps {}

export const PasswordInputLabel = forwardRef<HTMLLabelElement, PasswordInputLabelProps>((props, ref) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(passwordInput.getLabelProps(), props)

  return <codesign.label {...mergedProps} ref={ref} />
})

PasswordInputLabel.displayName = 'PasswordInputLabel'
