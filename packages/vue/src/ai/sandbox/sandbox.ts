import { defineComponent, h, type PropType, type VNode } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'
import { TabsRoot, TabList, TabTrigger, TabContent } from '../../components/tabs/index.ts'

const SCOPE = 'sandbox'

export const Sandbox = defineComponent({
  name: 'Sandbox',
  props: { defaultOpen: { type: Boolean, default: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        CollapsibleRoot as any,
        { ...attrs, defaultOpen: props.defaultOpen, 'data-scope': SCOPE, 'data-part': 'root' },
        slots.default,
      )
  },
})

export const SandboxHeader = defineComponent({
  name: 'SandboxHeader',
  props: {
    indicator: { type: Object, default: undefined },
    state: {
      type: String as PropType<'input-streaming' | 'input-available' | 'output-available' | 'output-error'>,
      default: undefined,
    },
    title: { type: Object, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const statusText =
        props.state === 'output-error' ? 'Error' : props.state === 'output-available' ? 'Done' : 'Running'
      const children = (slots.default?.() ?? [
        h(
          'span',
          { 'data-scope': SCOPE, 'data-part': 'header-identity' },
          [
            h('span', { 'data-scope': SCOPE, 'data-part': 'title' }, props.title),
            props.state
              ? h('span', { 'data-scope': SCOPE, 'data-part': 'status', 'data-state': props.state }, statusText)
              : null,
            props.indicator,
          ].filter((x): x is VNode => Boolean(x)),
        ),
      ]) as any
      return h(CollapsibleTrigger as any, { 'data-scope': SCOPE, 'data-part': 'header' }, children)
    }
  },
})

export const SandboxContent = defineComponent({
  name: 'SandboxContent',
  setup(_, { attrs, slots }) {
    return () => h(CollapsibleContent as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default)
  },
})

export const SandboxTabs = defineComponent({
  name: 'SandboxTabs',
  setup(_, { attrs, slots }) {
    return () => h(TabsRoot as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'tabs' }, slots.default)
  },
})

export const SandboxTabsBar = defineComponent({
  name: 'SandboxTabsBar',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'tabs-bar' }, slots.default?.())
  },
})

export const SandboxTabList = defineComponent({
  name: 'SandboxTabList',
  setup(_, { attrs, slots }) {
    return () => h(TabList as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'tabs-list' }, slots.default)
  },
})

export const SandboxTabTrigger = defineComponent({
  name: 'SandboxTabTrigger',
  setup(_, { attrs, slots }) {
    return () => h(TabTrigger as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'tabs-trigger' }, slots.default)
  },
})

export const SandboxTabContent = defineComponent({
  name: 'SandboxTabContent',
  setup(_, { attrs, slots }) {
    return () => h(TabContent as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'tab-content' }, slots.default)
  },
})
