'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useFieldContext } from '../field/index.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'

export interface PasswordInputInputBaseProps extends PolymorphicProps {}
export interface PasswordInputInputProps extends HTMLProps<'input'>, PasswordInputInputBaseProps {}

export const PasswordInputInput = forwardRef<HTMLInputElement, PasswordInputInputProps>((props, ref) => {
  const passwordInput = usePasswordInputContext()
  const mergedProps = mergeProps(passwordInput.getInputProps(), props)
  const field = useFieldContext()

  return <codesign.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

PasswordInputInput.displayName = 'PasswordInputInput'
