import { defineComponent, h } from 'vue'

export const TableState = defineComponent({
  name: 'TableState',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'table-state', 'data-part': 'root' }, slots.default?.())
  },
})

export const TableStateIcon = defineComponent({
  name: 'TableStateIcon',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'table-state', 'data-part': 'icon' }, slots.default?.())
  },
})

export const TableStateTitle = defineComponent({
  name: 'TableStateTitle',
  setup(_, { attrs, slots }) {
    return () => h('h3', { ...attrs, 'data-scope': 'table-state', 'data-part': 'title' }, slots.default?.())
  },
})

export const TableStateDescription = defineComponent({
  name: 'TableStateDescription',
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, 'data-scope': 'table-state', 'data-part': 'description' }, slots.default?.())
  },
})

export const TableStateAction = defineComponent({
  name: 'TableStateAction',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'table-state', 'data-part': 'action' }, slots.default?.())
  },
})
