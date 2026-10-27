import { defineComponent, h } from 'vue'

export const Card = defineComponent({
  name: 'Card',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'card', 'data-part': 'root' }, slots.default?.())
  },
})

export const CardHeader = defineComponent({
  name: 'CardHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'card', 'data-part': 'header' }, slots.default?.())
  },
})

export const CardTitle = defineComponent({
  name: 'CardTitle',
  setup(_, { attrs, slots }) {
    return () => h('h3', { ...attrs, 'data-scope': 'card', 'data-part': 'title' }, slots.default?.())
  },
})

export const CardDescription = defineComponent({
  name: 'CardDescription',
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, 'data-scope': 'card', 'data-part': 'description' }, slots.default?.())
  },
})

export const CardContent = defineComponent({
  name: 'CardContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'card', 'data-part': 'content' }, slots.default?.())
  },
})

export const CardFooter = defineComponent({
  name: 'CardFooter',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'card', 'data-part': 'footer' }, slots.default?.())
  },
})
