import { defineComponent, h, type PropType, type VNode } from 'vue'
import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from '../../components/accordion/index.ts'
import { CodeBlock } from '../code-block/code-block.ts'

const SCOPE = 'agent'

export const Agent = defineComponent({
  name: 'Agent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default?.())
  },
})

export const AgentHeader = defineComponent({
  name: 'AgentHeader',
  props: {
    model: { type: Object as PropType<VNode>, default: undefined },
    name: { type: Object as PropType<VNode>, required: true },
  },
  setup(props, { slots }) {
    return () =>
      h('div', { 'data-scope': SCOPE, 'data-part': 'header' }, [
        h('div', { 'data-scope': SCOPE, 'data-part': 'header-identity' }, [
          slots.default?.() ??
            [
              h('span', { 'data-scope': SCOPE, 'data-part': 'name' }, props.name),
              props.model ? h('span', { 'data-scope': SCOPE, 'data-part': 'model' }, props.model) : null,
            ].filter(Boolean),
        ]),
      ])
  },
})

export const AgentContent = defineComponent({
  name: 'AgentContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default?.())
  },
})

export const AgentInstructions = defineComponent({
  name: 'AgentInstructions',
  props: { children: { type: String, required: true } },
  setup(props) {
    return () =>
      h('div', { 'data-scope': SCOPE, 'data-part': 'instructions' }, [
        h('span', { 'data-scope': SCOPE, 'data-part': 'instructions-label' }, 'Instructions'),
        h('p', { 'data-scope': SCOPE, 'data-part': 'instructions-body' }, props.children),
      ])
  },
})

export const AgentTools = defineComponent({
  name: 'AgentTools',
  setup(_, { attrs, slots }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'tools' }, [
        h('span', { 'data-scope': SCOPE, 'data-part': 'tools-label' }, 'Tools'),
        h(AccordionRoot as any, { 'data-scope': SCOPE, 'data-part': 'tools-list' }, slots.default),
      ])
  },
})

export const AgentTool = defineComponent({
  name: 'AgentTool',
  props: {
    description: { type: Object as PropType<VNode>, default: undefined },
    schema: { type: String, required: true },
    toolName: { type: String, required: true },
  },
  setup(props, { attrs }) {
    return () =>
      h(AccordionItem as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'tool', value: props.toolName }, () => [
        h(AccordionItemTrigger as any, { 'data-scope': SCOPE, 'data-part': 'tool-trigger' }, () => [
          h('span', { 'data-scope': SCOPE, 'data-part': 'tool-name' }, props.toolName),
          h('span', { 'data-scope': SCOPE, 'data-part': 'tool-description' }, props.description ?? 'No description'),
        ]),
        h(AccordionItemContent as any, { 'data-scope': SCOPE, 'data-part': 'tool-content' }, () =>
          h('div', { 'data-scope': SCOPE, 'data-part': 'tool-schema' }, () =>
            h(CodeBlock, { code: props.schema, language: 'json' }),
          ),
        ),
      ])
  },
})

export const AgentOutput = defineComponent({
  name: 'AgentOutput',
  props: { schema: { type: String, required: true } },
  setup(props, { attrs }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'output' }, [
        h('span', { 'data-scope': SCOPE, 'data-part': 'output-label' }, 'Output Schema'),
        h('div', { 'data-scope': SCOPE, 'data-part': 'output-schema' }, () =>
          h(CodeBlock, { code: props.schema, language: 'typescript' }),
        ),
      ])
  },
})
