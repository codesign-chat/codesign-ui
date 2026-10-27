import { defineComponent, h } from 'vue'

export const Badge = defineComponent({
  name: 'Badge',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'badge', 'data-part': 'root' }, slots.default?.())
  },
})
