'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewBranchTriggerBaseProps extends PolymorphicProps {}
export interface TreeViewBranchTriggerProps extends HTMLProps<'div'>, TreeViewBranchTriggerBaseProps {}

export const TreeViewBranchTrigger = forwardRef<HTMLDivElement, TreeViewBranchTriggerProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchTriggerProps(nodeProps), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

TreeViewBranchTrigger.displayName = 'TreeViewBranchTrigger'
