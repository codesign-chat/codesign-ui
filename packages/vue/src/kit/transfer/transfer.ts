import { defineComponent, h } from 'vue'

export const Transfer = defineComponent({
  name: 'Transfer',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'transfer', 'data-part': 'root' }, slots.default?.())
  },
})

export const TransferPanel = defineComponent({
  name: 'TransferPanel',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'transfer', 'data-part': 'panel' }, slots.default?.())
  },
})

export const TransferList = defineComponent({
  name: 'TransferList',
  setup(_, { attrs, slots }) {
    return () => h('ul', { ...attrs, 'data-scope': 'transfer', 'data-part': 'list' }, slots.default?.())
  },
})

export const TransferItem = defineComponent({
  name: 'TransferItem',
  setup(_, { attrs, slots }) {
    return () => h('li', { ...attrs, 'data-scope': 'transfer', 'data-part': 'item' }, slots.default?.())
  },
})

export const TransferActions = defineComponent({
  name: 'TransferActions',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'transfer', 'data-part': 'actions' }, slots.default?.())
  },
})
