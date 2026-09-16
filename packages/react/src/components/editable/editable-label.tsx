'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'

export interface EditableLabelBaseProps extends PolymorphicProps {}
export interface EditableLabelProps extends HTMLProps<'label'>, EditableLabelBaseProps {}

export const EditableLabel = forwardRef<HTMLLabelElement, EditableLabelProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getLabelProps(), props)

  return <codesign.label {...mergedProps} ref={ref} />
})

EditableLabel.displayName = 'EditableLabel'
