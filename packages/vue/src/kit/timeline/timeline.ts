import { defineComponent, h } from 'vue'

export const Timeline = defineComponent({
  name: 'Timeline',
  setup(_, { attrs, slots }) {
    return () => h('ol', { ...attrs, 'data-scope': 'timeline', 'data-part': 'root' }, slots.default?.())
  },
})

export const TimelineItem = defineComponent({
  name: 'TimelineItem',
  setup(_, { attrs, slots }) {
    return () => h('li', { ...attrs, 'data-scope': 'timeline', 'data-part': 'item' }, slots.default?.())
  },
})

export const TimelineIndicator = defineComponent({
  name: 'TimelineIndicator',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'timeline', 'data-part': 'indicator' }, slots.default?.())
  },
})

export const TimelineContent = defineComponent({
  name: 'TimelineContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'timeline', 'data-part': 'content' }, slots.default?.())
  },
})
