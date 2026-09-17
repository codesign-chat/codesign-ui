import { defineComponent, h } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'

const SCOPE = 'task'

export const Task = defineComponent({
  name: 'Task',
  props: { defaultOpen: { type: Boolean, default: true } },
  setup(props, { attrs }) {
    return () =>
      h(CollapsibleRoot, { ...attrs, 'data-scope': SCOPE, 'data-part': 'root', defaultOpen: props.defaultOpen })
  },
})

export const TaskTrigger = defineComponent({
  name: 'TaskTrigger',
  props: { title: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        CollapsibleTrigger,
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'trigger', 'as-child': '' },
        () => slots.default?.() ?? [h('div', [h('p', props.title)])],
      )
  },
})

export const TaskContent = defineComponent({
  name: 'TaskContent',
  setup(_, { attrs, slots }) {
    return () =>
      h(CollapsibleContent, { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, () => [
        h('div', { 'data-scope': SCOPE, 'data-part': 'task-list' }, slots.default?.()),
      ])
  },
})

export const TaskItem = defineComponent({
  name: 'TaskItem',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'item' }, slots.default?.())
  },
})

export const TaskItemFile = defineComponent({
  name: 'TaskItemFile',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'item-file' }, slots.default?.())
  },
})
