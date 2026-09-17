import { defineComponent, h } from 'vue'
import { TooltipContent, TooltipPositioner, TooltipRoot, TooltipTrigger } from '../../components/tooltip/index.ts'

const SCOPE = 'artifact'

export const Artifact = defineComponent({
  name: 'Artifact',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default?.())
  },
})

export const ArtifactHeader = defineComponent({
  name: 'ArtifactHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'header' }, slots.default?.())
  },
})

export const ArtifactTitle = defineComponent({
  name: 'ArtifactTitle',
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, 'data-scope': SCOPE, 'data-part': 'title' }, slots.default?.())
  },
})

export const ArtifactDescription = defineComponent({
  name: 'ArtifactDescription',
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, 'data-scope': SCOPE, 'data-part': 'description' }, slots.default?.())
  },
})

export const ArtifactActions = defineComponent({
  name: 'ArtifactActions',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'actions' }, slots.default?.())
  },
})

export const ArtifactAction = defineComponent({
  name: 'ArtifactAction',
  props: {
    label: { type: String, default: undefined },
    tooltip: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const button = h(
        'button',
        {
          ...attrs,
          'aria-label': props.label ?? props.tooltip,
          'data-scope': SCOPE,
          'data-part': 'action',
          type: 'button',
        },
        slots.default?.(),
      )
      if (!props.tooltip) return button
      return h(TooltipRoot, null, [
        h(TooltipTrigger, { 'as-child': '' }, () => button),
        h(TooltipPositioner, null, () =>
          h(TooltipContent, { 'data-scope': SCOPE, 'data-part': 'tooltip' }, props.tooltip),
        ),
      ])
    }
  },
})

export const ArtifactContent = defineComponent({
  name: 'ArtifactContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default?.())
  },
})
