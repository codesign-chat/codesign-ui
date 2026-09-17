import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import { Collapsible } from '../../components/collapsible/index.ts'

export type TaskProps = JSX.HTMLAttributes<HTMLDivElement> & { defaultOpen?: boolean }

export function Task(props: TaskProps) {
  const [local, rest] = splitProps(props, ['defaultOpen'])
  return <Collapsible.Root data-scope="task" data-part="root" defaultOpen={local.defaultOpen ?? true} {...rest} />
}

export type TaskTriggerProps = JSX.HTMLAttributes<HTMLDivElement> & { title: string }

export function TaskTrigger(props: TaskTriggerProps) {
  const [local, rest] = splitProps(props, ['title', 'children'])
  void rest
  return (
    <Collapsible.Trigger
      asChild={(triggerProps) => (
        <div {...triggerProps} data-scope="task" data-part="trigger">
          <p>{local.children ?? local.title}</p>
        </div>
      )}
    />
  )
}

export type TaskContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function TaskContent(props: TaskContentProps) {
  return (
    <Collapsible.Content data-scope="task" data-part="content" {...props}>
      <div data-scope="task" data-part="task-list">
        {props.children}
      </div>
    </Collapsible.Content>
  )
}

export type TaskItemProps = JSX.HTMLAttributes<HTMLDivElement>

export function TaskItem(props: TaskItemProps) {
  return <div data-scope="task" data-part="item" {...props} />
}

export type TaskItemFileProps = JSX.HTMLAttributes<HTMLDivElement>

export function TaskItemFile(props: TaskItemFileProps) {
  return <div data-scope="task" data-part="item-file" {...props} />
}
