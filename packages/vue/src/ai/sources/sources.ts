import { defineComponent, h } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'

const SCOPE = 'sources'

export const Sources = defineComponent({
  name: 'Sources',
  setup(_, { attrs }) {
    return () => h(CollapsibleRoot, { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' })
  },
})

export const SourcesTrigger = defineComponent({
  name: 'SourcesTrigger',
  props: { count: { type: Number, required: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        CollapsibleTrigger,
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'trigger' },
        () =>
          slots.default?.() ?? [
            h('p', { 'data-scope': SCOPE, 'data-part': 'count' }, 'Used ' + props.count + ' sources'),
          ],
      )
  },
})

export const SourcesContent = defineComponent({
  name: 'SourcesContent',
  setup(_, { attrs, slots }) {
    return () => h(CollapsibleContent, { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default)
  },
})

export const Source = defineComponent({
  name: 'Source',
  props: {
    href: { type: String, default: undefined },
    title: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'a',
        {
          ...attrs,
          'data-scope': SCOPE,
          'data-part': 'source',
          href: props.href,
          rel: 'noreferrer',
          target: '_blank',
        },
        slots.default?.() ?? [h('span', props.title)],
      )
  },
})
