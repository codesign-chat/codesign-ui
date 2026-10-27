import { defineComponent, h } from 'vue'

export const Skeleton = defineComponent({
  name: 'Skeleton',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'skeleton', 'data-part': 'root' }, slots.default?.())
  },
})
