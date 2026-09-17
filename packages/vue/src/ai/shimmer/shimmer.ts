import { computed, defineComponent, h } from 'vue'

const SCOPE = 'shimmer'

export interface ShimmerProps {
  children: string
  duration?: number
  as?: string
}

export const Shimmer = defineComponent({
  name: 'Shimmer',
  props: {
    children: { type: String, required: true },
    duration: { type: Number, default: 2 },
    as: { type: String, default: 'p' },
  },
  setup(props, { attrs }) {
    const words = computed(() => props.children.split(' '))

    return () =>
      h(
        props.as,
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' },
        words.value.map((word, index) =>
          h(
            'span',
            {
              key: index,
              'data-scope': SCOPE,
              'data-part': 'word',
              style: {
                'animation-delay': index * 60 + 'ms',
                'animation-duration': props.duration + 's',
              },
            },
            [word, ' '],
          ),
        ),
      )
  },
})
