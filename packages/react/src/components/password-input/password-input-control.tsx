'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'

export interface PasswordInputControlBaseProps extends PolymorphicProps {}
export interface PasswordInputControlProps extends HTMLProps<'div'>, PasswordInputControlBaseProps {}

export const PasswordInputControl = forwardRef<HTMLDivElement, PasswordInputControlProps>((props, ref) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(passwordInput.getControlProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

PasswordInputControl.displayName = 'PasswordInputControl'
