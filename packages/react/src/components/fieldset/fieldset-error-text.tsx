'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetErrorTextBaseProps extends PolymorphicProps {}
export interface FieldsetErrorTextProps extends HTMLProps<'span'>, FieldsetErrorTextBaseProps {}

export const FieldsetErrorText = forwardRef<HTMLSpanElement, FieldsetErrorTextProps>((props, ref) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps(fieldset.getErrorTextProps(), props)

  return fieldset.invalid ? <codesign.span {...mergedProps} ref={ref} /> : null
})

FieldsetErrorText.displayName = 'FieldsetErrorText'
