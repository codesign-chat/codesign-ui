import { defineComponent, h } from 'vue'

export const TableRow = defineComponent({
  name: 'TableRow',
  setup(_, { attrs, slots }) {
    return () => h('tr', { ...attrs, 'data-scope': 'table-row', 'data-part': 'root' }, slots.default?.())
  },
})

export const TableRowCell = defineComponent({
  name: 'TableRowCell',
  setup(_, { attrs, slots }) {
    return () => h('td', { ...attrs, 'data-scope': 'table-row', 'data-part': 'cell' }, slots.default?.())
  },
})
