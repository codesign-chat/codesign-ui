'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface InputBaseProps extends PolymorphicProps {}
export interface InputProps extends HTMLProps<'input'>, InputBaseProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <codesign.input {...props} ref={ref} data-scope="input" data-part="root" />
))

Input.displayName = 'Input'
