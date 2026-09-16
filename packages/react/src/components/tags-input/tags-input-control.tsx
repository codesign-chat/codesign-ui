'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'

export interface TagsInputControlBaseProps extends PolymorphicProps {}
export interface TagsInputControlProps extends HTMLProps<'div'>, TagsInputControlBaseProps {}

export const TagsInputControl = forwardRef<HTMLDivElement, TagsInputControlProps>((props, ref) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(tagsInput.getControlProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

TagsInputControl.displayName = 'TagsInputControl'
