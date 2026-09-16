'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

export interface FieldHelperTextBaseProps extends PolymorphicProps {}
export interface FieldHelperTextProps extends HTMLProps<'span'>, FieldHelperTextBaseProps {}

export const FieldHelperText = forwardRef<HTMLSpanElement, FieldHelperTextProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'span'>>(field?.getHelperTextProps(), props)

  return <codesign.span {...mergedProps} ref={ref} />
})

FieldHelperText.displayName = 'FieldHelperText'
