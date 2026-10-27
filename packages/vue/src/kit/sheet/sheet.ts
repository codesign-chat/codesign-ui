import { defineComponent, h } from 'vue'

export const Sheet = defineComponent({
  name: 'Sheet',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'sheet', 'data-part': 'root' }, slots.default?.())
  },
})

export const SheetContent = defineComponent({
  name: 'SheetContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'sheet', 'data-part': 'content' }, slots.default?.())
  },
})

export const SheetHeader = defineComponent({
  name: 'SheetHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'sheet', 'data-part': 'header' }, slots.default?.())
  },
})

export const SheetTitle = defineComponent({
  name: 'SheetTitle',
  setup(_, { attrs, slots }) {
    return () => h('h2', { ...attrs, 'data-scope': 'sheet', 'data-part': 'title' }, slots.default?.())
  },
})

export const SheetBody = defineComponent({
  name: 'SheetBody',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'sheet', 'data-part': 'body' }, slots.default?.())
  },
})

export const SheetFooter = defineComponent({
  name: 'SheetFooter',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'sheet', 'data-part': 'footer' }, slots.default?.())
  },
})

export const SheetCloseTrigger = defineComponent({
  name: 'SheetCloseTrigger',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'sheet', 'data-part': 'close' }, slots.default?.())
  },
})
