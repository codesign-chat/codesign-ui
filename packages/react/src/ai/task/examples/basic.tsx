import 'styles/ai.module.css'
import { Task, TaskContent, TaskItem, TaskItemFile, TaskTrigger } from '../task.tsx'

export function Basic() {
  return (
    <Task>
      <TaskTrigger title="Searching the documentation" />
      <TaskContent>
        <TaskItem>Retrieved the component contract from AGENTS.md</TaskItem>
        <TaskItem>Matched the query against data-part attributes</TaskItem>
        <TaskItem>
          <TaskItemFile>ai.module.css</TaskItemFile>
        </TaskItem>
      </TaskContent>
    </Task>
  )
}
