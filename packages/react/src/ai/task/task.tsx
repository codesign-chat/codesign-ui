import type { ComponentProps } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'

export type TaskItemFileProps = ComponentProps<'div'>

export function TaskItemFile(props: TaskItemFileProps) {
  return <div data-scope="task" data-part="item-file" {...props} />
}

export type TaskItemProps = ComponentProps<'div'>

export function TaskItem(props: TaskItemProps) {
  return <div data-scope="task" data-part="item" {...props} />
}

export type TaskProps = ComponentProps<typeof Collapsible.Root>

export function Task({ defaultOpen = true, ...props }: TaskProps) {
  return <Collapsible.Root data-scope="task" data-part="root" defaultOpen={defaultOpen} {...props} />
}

export type TaskTriggerProps = Omit<ComponentProps<typeof Collapsible.Trigger>, 'onOpenChange'> & {
  title: string
}

export function TaskTrigger({ children, title, ...props }: TaskTriggerProps) {
  return (
    <Collapsible.Trigger asChild data-scope="task" data-part="trigger" {...props}>
      {children ?? (
        <div>
          <p>{title}</p>
        </div>
      )}
    </Collapsible.Trigger>
  )
}

export type TaskContentProps = ComponentProps<typeof Collapsible.Content>

export function TaskContent({ children, ...props }: TaskContentProps) {
  return (
    <Collapsible.Content data-scope="task" data-part="content" {...props}>
      <div data-part="task-list">{children}</div>
    </Collapsible.Content>
  )
}
