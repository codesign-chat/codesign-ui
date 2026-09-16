'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'

export interface TreeViewLabelBaseProps extends PolymorphicProps {}
export interface TreeViewLabelProps extends HTMLProps<'h3'>, TreeViewLabelBaseProps {}

export const TreeViewLabel = forwardRef<HTMLHeadingElement, TreeViewLabelProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getLabelProps(), props)

  return <codesign.h3 {...mergedProps} ref={ref} />
})

TreeViewLabel.displayName = 'TreeViewLabel'
