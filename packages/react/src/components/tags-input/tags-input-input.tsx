'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'

export interface TagsInputInputBaseProps extends PolymorphicProps {}
export interface TagsInputInputProps extends HTMLProps<'input'>, TagsInputInputBaseProps {}

export const TagsInputInput = forwardRef<HTMLInputElement, TagsInputInputProps>((props, ref) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(tagsInput.getInputProps(), props)

  return <codesign.input {...mergedProps} ref={ref} />
})

TagsInputInput.displayName = 'TagsInputInput'
