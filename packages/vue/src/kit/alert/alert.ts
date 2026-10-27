import { defineComponent, h } from 'vue'

export const Alert = defineComponent({
  name: 'Alert',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'alert', 'data-part': 'root' }, slots.default?.())
  },
})

export const AlertIcon = defineComponent({
  name: 'AlertIcon',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'alert', 'data-part': 'icon' }, slots.default?.())
  },
})

export const AlertTitle = defineComponent({
  name: 'AlertTitle',
  setup(_, { attrs, slots }) {
    return () => h('h3', { ...attrs, 'data-scope': 'alert', 'data-part': 'title' }, slots.default?.())
  },
})

export const AlertDescription = defineComponent({
  name: 'AlertDescription',
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, 'data-scope': 'alert', 'data-part': 'description' }, slots.default?.())
  },
})

export const AlertAction = defineComponent({
  name: 'AlertAction',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'alert', 'data-part': 'action' }, slots.default?.())
  },
})
