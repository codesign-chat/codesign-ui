import { defineComponent, h } from 'vue'

export const MiniCalendar = defineComponent({
  name: 'MiniCalendar',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'mini-calendar', 'data-part': 'root' }, slots.default?.())
  },
})

export const MiniCalendarGrid = defineComponent({
  name: 'MiniCalendarGrid',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'mini-calendar', 'data-part': 'grid' }, slots.default?.())
  },
})

export const MiniCalendarDay = defineComponent({
  name: 'MiniCalendarDay',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'mini-calendar', 'data-part': 'day' }, slots.default?.())
  },
})
