import { defineComponent, h } from 'vue'

export const EmptyState = defineComponent({
  name: 'EmptyState',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'empty-state', 'data-part': 'root' }, slots.default?.())
  },
})

export const EmptyStateIcon = defineComponent({
  name: 'EmptyStateIcon',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'empty-state', 'data-part': 'icon' }, slots.default?.())
  },
})

export const EmptyStateTitle = defineComponent({
  name: 'EmptyStateTitle',
  setup(_, { attrs, slots }) {
    return () => h('h3', { ...attrs, 'data-scope': 'empty-state', 'data-part': 'title' }, slots.default?.())
  },
})

export const EmptyStateDescription = defineComponent({
  name: 'EmptyStateDescription',
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, 'data-scope': 'empty-state', 'data-part': 'description' }, slots.default?.())
  },
})

export const EmptyStateAction = defineComponent({
  name: 'EmptyStateAction',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'empty-state', 'data-part': 'action' }, slots.default?.())
  },
})
