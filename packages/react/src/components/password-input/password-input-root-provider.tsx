'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import type { UsePasswordInputReturn } from './use-password-input.ts'
import { PasswordInputProvider } from './use-password-input-context.ts'

interface RootProviderProps {
  value: UsePasswordInputReturn
}

export interface PasswordInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface PasswordInputRootProviderProps extends HTMLProps<'div'>, PasswordInputRootProviderBaseProps {}

export const PasswordInputRootProvider = forwardRef<HTMLDivElement, PasswordInputRootProviderProps>((props, ref) => {
  const { value: passwordInput, ...localProps } = props
  const mergedProps = mergeProps(passwordInput.getRootProps(), localProps)

  return (
    <PasswordInputProvider value={passwordInput}>
      <codesign.div {...mergedProps} ref={ref} />
    </PasswordInputProvider>
  )
})

PasswordInputRootProvider.displayName = 'PasswordInputRootProvider'
