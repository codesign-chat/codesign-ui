import { defineComponent, h } from 'vue'

export const Textarea = defineComponent({
  name: 'Textarea',
  setup(_, { attrs, slots }) {
    return () => h('textarea', { ...attrs, 'data-scope': 'textarea', 'data-part': 'root' }, slots.default?.())
  },
})
