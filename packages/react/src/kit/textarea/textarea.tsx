'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface TextareaBaseProps extends PolymorphicProps {}
export interface TextareaProps extends HTMLProps<'textarea'>, TextareaBaseProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => (
  <codesign.textarea {...props} ref={ref} data-scope="textarea" data-part="root" />
))

Textarea.displayName = 'Textarea'
