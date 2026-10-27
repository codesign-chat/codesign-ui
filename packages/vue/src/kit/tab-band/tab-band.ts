import { defineComponent, h } from 'vue'

export const TabBand = defineComponent({
  name: 'TabBand',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'tab-band', 'data-part': 'root' }, slots.default?.())
  },
})

export const TabBandList = defineComponent({
  name: 'TabBandList',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'tab-band', 'data-part': 'list' }, slots.default?.())
  },
})

export const TabBandItem = defineComponent({
  name: 'TabBandItem',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'tab-band', 'data-part': 'item' }, slots.default?.())
  },
})
