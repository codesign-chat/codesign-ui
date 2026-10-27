import { defineComponent, h } from 'vue'

export const Breadcrumb = defineComponent({
  name: 'Breadcrumb',
  setup(_, { attrs, slots }) {
    return () => h('nav', { ...attrs, 'data-scope': 'breadcrumb', 'data-part': 'root' }, slots.default?.())
  },
})

export const BreadcrumbList = defineComponent({
  name: 'BreadcrumbList',
  setup(_, { attrs, slots }) {
    return () => h('ol', { ...attrs, 'data-scope': 'breadcrumb', 'data-part': 'list' }, slots.default?.())
  },
})

export const BreadcrumbItem = defineComponent({
  name: 'BreadcrumbItem',
  setup(_, { attrs, slots }) {
    return () => h('li', { ...attrs, 'data-scope': 'breadcrumb', 'data-part': 'item' }, slots.default?.())
  },
})

export const BreadcrumbLink = defineComponent({
  name: 'BreadcrumbLink',
  setup(_, { attrs, slots }) {
    return () => h('a', { ...attrs, 'data-scope': 'breadcrumb', 'data-part': 'link' }, slots.default?.())
  },
})

export const BreadcrumbSeparator = defineComponent({
  name: 'BreadcrumbSeparator',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'breadcrumb', 'data-part': 'separator' }, slots.default?.())
  },
})

export const BreadcrumbCurrent = defineComponent({
  name: 'BreadcrumbCurrent',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'breadcrumb', 'data-part': 'current' }, slots.default?.())
  },
})
