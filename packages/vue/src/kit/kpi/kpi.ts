import { defineComponent, h } from 'vue'

export const KpiRoot = defineComponent({
  name: 'KpiRoot',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'kpi', 'data-part': 'root' }, slots.default?.())
  },
})

export const KpiLabel = defineComponent({
  name: 'KpiLabel',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'kpi', 'data-part': 'label' }, slots.default?.())
  },
})

export const KpiValue = defineComponent({
  name: 'KpiValue',
  setup(_, { attrs, slots }) {
    return () => h('strong', { ...attrs, 'data-scope': 'kpi', 'data-part': 'value' }, slots.default?.())
  },
})

export const KpiDelta = defineComponent({
  name: 'KpiDelta',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'kpi', 'data-part': 'delta' }, slots.default?.())
  },
})
