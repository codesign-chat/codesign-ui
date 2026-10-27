import { defineComponent, h } from 'vue'

export const Notification = defineComponent({
  name: 'Notification',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'notification', 'data-part': 'root' }, slots.default?.())
  },
})

export const NotificationIcon = defineComponent({
  name: 'NotificationIcon',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'notification', 'data-part': 'icon' }, slots.default?.())
  },
})

export const NotificationTitle = defineComponent({
  name: 'NotificationTitle',
  setup(_, { attrs, slots }) {
    return () => h('h4', { ...attrs, 'data-scope': 'notification', 'data-part': 'title' }, slots.default?.())
  },
})

export const NotificationDescription = defineComponent({
  name: 'NotificationDescription',
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, 'data-scope': 'notification', 'data-part': 'description' }, slots.default?.())
  },
})

export const NotificationAction = defineComponent({
  name: 'NotificationAction',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'notification', 'data-part': 'action' }, slots.default?.())
  },
})

export const NotificationCloseTrigger = defineComponent({
  name: 'NotificationCloseTrigger',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'notification', 'data-part': 'close' }, slots.default?.())
  },
})
