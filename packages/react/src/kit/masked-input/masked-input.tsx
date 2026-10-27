'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface MaskedInputBaseProps extends PolymorphicProps {}
export interface MaskedInputProps extends HTMLProps<'input'>, MaskedInputBaseProps {}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>((props, ref) => (
  <codesign.input {...props} ref={ref} data-scope="masked-input" data-part="root" />
))

MaskedInput.displayName = 'MaskedInput'
