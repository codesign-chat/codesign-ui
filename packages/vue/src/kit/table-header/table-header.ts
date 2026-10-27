import { defineComponent, h } from 'vue'

export const TableHeader = defineComponent({
  name: 'TableHeader',
  setup(_, { attrs, slots }) {
    return () => h('thead', { ...attrs, 'data-scope': 'table-header', 'data-part': 'root' }, slots.default?.())
  },
})

export const TableHeaderCell = defineComponent({
  name: 'TableHeaderCell',
  setup(_, { attrs, slots }) {
    return () => h('th', { ...attrs, 'data-scope': 'table-header', 'data-part': 'cell' }, slots.default?.())
  },
})

export const TableHeaderSortTrigger = defineComponent({
  name: 'TableHeaderSortTrigger',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'table-header', 'data-part': 'sort' }, slots.default?.())
  },
})
