import { defineComponent, h } from 'vue'

export const Popconfirm = defineComponent({
  name: 'Popconfirm',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'popconfirm', 'data-part': 'root' }, slots.default?.())
  },
})

export const PopconfirmTrigger = defineComponent({
  name: 'PopconfirmTrigger',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'popconfirm', 'data-part': 'trigger' }, slots.default?.())
  },
})

export const PopconfirmContent = defineComponent({
  name: 'PopconfirmContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'popconfirm', 'data-part': 'content' }, slots.default?.())
  },
})

export const PopconfirmTitle = defineComponent({
  name: 'PopconfirmTitle',
  setup(_, { attrs, slots }) {
    return () => h('h3', { ...attrs, 'data-scope': 'popconfirm', 'data-part': 'title' }, slots.default?.())
  },
})

export const PopconfirmDescription = defineComponent({
  name: 'PopconfirmDescription',
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, 'data-scope': 'popconfirm', 'data-part': 'description' }, slots.default?.())
  },
})

export const PopconfirmActions = defineComponent({
  name: 'PopconfirmActions',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'popconfirm', 'data-part': 'actions' }, slots.default?.())
  },
})
