'use client'
import { useTreeViewNodeContext } from '@codesign-ui/react'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import { forwardRef } from 'react'
import * as CodesignTreeView from './primitives/tree-view'

export const TreeView = forwardRef<HTMLDivElement, CodesignTreeView.RootProps>((props, ref) => {
  return (
    <CodesignTreeView.Root ref={ref} {...props}>
      <CodesignTreeView.Tree>
        {/* @ts-expect-error */}
        {props.collection.rootNode.children.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </CodesignTreeView.Tree>
    </CodesignTreeView.Root>
  )
})

TreeView.displayName = 'TreeView'

function BranchIcon() {
  const nodeState = useTreeViewNodeContext()
  return nodeState.expanded ? <FolderOpenIcon /> : <FolderIcon />
}

const TreeNode = (props: CodesignTreeView.NodeProviderProps) => {
  const { node, indexPath } = props
  return (
    <CodesignTreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <CodesignTreeView.Branch>
          <CodesignTreeView.BranchControl>
            <CodesignTreeView.BranchIndicator>
              <ChevronRightIcon />
            </CodesignTreeView.BranchIndicator>
            <CodesignTreeView.BranchText>
              <BranchIcon /> {node.name}
            </CodesignTreeView.BranchText>
          </CodesignTreeView.BranchControl>
          <CodesignTreeView.BranchContent>
            <CodesignTreeView.BranchIndentGuide />
            {/* @ts-expect-error */}
            {node.children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </CodesignTreeView.BranchContent>
        </CodesignTreeView.Branch>
      ) : (
        <CodesignTreeView.Item>
          <CodesignTreeView.ItemText>
            <FileIcon />
            {node.name}
          </CodesignTreeView.ItemText>
        </CodesignTreeView.Item>
      )}
    </CodesignTreeView.NodeProvider>
  )
}
