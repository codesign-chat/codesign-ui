'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useFieldContext } from '../field/index.ts'
import { useEditableContext } from './use-editable-context.ts'

export interface EditableInputBaseProps extends PolymorphicProps {}
export interface EditableInputProps extends HTMLProps<'input'>, EditableInputBaseProps {}

export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getInputProps(), props)
  const field = useFieldContext()

  return <codesign.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

EditableInput.displayName = 'EditableInput'
