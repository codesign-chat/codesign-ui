import { defineComponent, h } from 'vue'
import {
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
  CarouselRoot,
} from '../../components/carousel/index.ts'
import {
  HoverCardContent,
  HoverCardPositioner,
  HoverCardRoot,
  HoverCardTrigger,
} from '../../components/hover-card/index.ts'

const SCOPE = 'inline-citation'

export const InlineCitation = defineComponent({
  name: 'InlineCitation',
  setup(_, { attrs }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' })
  },
})

export const InlineCitationText = defineComponent({
  name: 'InlineCitationText',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'text' }, slots.default?.())
  },
})

export const InlineCitationCard = defineComponent({
  name: 'InlineCitationCard',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        HoverCardRoot,
        { ...attrs, closeDelay: 0, 'data-scope': SCOPE, 'data-part': 'card', openDelay: 0 },
        slots.default,
      )
  },
})

export const InlineCitationCardTrigger = defineComponent({
  name: 'InlineCitationCardTrigger',
  props: { sources: { type: Array as () => string[], required: true } },
  setup(props, { attrs }) {
    return () => {
      const first = props.sources[0]
      const label = first
        ? props.sources.length > 1
          ? new URL(first).hostname + ' +' + (props.sources.length - 1)
          : new URL(first).hostname
        : 'unknown'
      return h(HoverCardTrigger, { ...attrs, 'data-scope': SCOPE, 'as-child': '' }, () => [
        h('span', { 'data-scope': SCOPE, 'data-part': 'citation-badge' }, label),
      ])
    }
  },
})

export const InlineCitationCardBody = defineComponent({
  name: 'InlineCitationCardBody',
  setup(_, { attrs, slots }) {
    return () =>
      h(HoverCardPositioner, null, () =>
        h(HoverCardContent, { ...attrs, 'data-scope': SCOPE, 'data-part': 'card-body' }, slots.default),
      )
  },
})

export const InlineCitationCarousel = defineComponent({
  name: 'InlineCitationCarousel',
  setup(_, { attrs, slots }) {
    return () =>
      h(CarouselRoot as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'carousel' }, () => slots.default?.())
  },
})

export const InlineCitationCarouselContent = defineComponent({
  name: 'InlineCitationCarouselContent',
  setup(_, { attrs, slots }) {
    return () =>
      h(CarouselItemGroup, { ...attrs, 'data-scope': SCOPE, 'data-part': 'carousel-content' }, () => slots.default?.())
  },
})

export const InlineCitationCarouselItem = defineComponent({
  name: 'InlineCitationCarouselItem',
  props: { index: { type: Number, required: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(CarouselItem, { ...attrs, 'data-scope': SCOPE, 'data-part': 'carousel-item', index: props.index }, () =>
        slots.default?.(),
      )
  },
})

export const InlineCitationCarouselHeader = defineComponent({
  name: 'InlineCitationCarouselHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'carousel-header' }, slots.default?.())
  },
})

export const InlineCitationCarouselIndex = defineComponent({
  name: 'InlineCitationCarouselIndex',
  setup(_, { attrs }) {
    return () => h(CarouselProgressText, { ...attrs, 'data-scope': SCOPE, 'data-part': 'carousel-index' })
  },
})

export const InlineCitationCarouselPrev = defineComponent({
  name: 'InlineCitationCarouselPrev',
  setup(_, { attrs, slots }) {
    return () => h(CarouselPrevTrigger, { ...attrs, 'data-scope': SCOPE, 'data-part': 'carousel-prev' }, slots.default)
  },
})

export const InlineCitationCarouselNext = defineComponent({
  name: 'InlineCitationCarouselNext',
  setup(_, { attrs, slots }) {
    return () => h(CarouselNextTrigger, { ...attrs, 'data-scope': SCOPE, 'data-part': 'carousel-next' }, slots.default)
  },
})

export const InlineCitationSource = defineComponent({
  name: 'InlineCitationSource',
  props: {
    description: { type: String, default: undefined },
    title: { type: String, default: undefined },
    url: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'source' }, [
        props.title ? h('h4', { 'data-scope': SCOPE, 'data-part': 'source-title' }, props.title) : null,
        props.url ? h('p', { 'data-scope': SCOPE, 'data-part': 'source-url' }, props.url) : null,
        props.description
          ? h('p', { 'data-scope': SCOPE, 'data-part': 'source-description' }, props.description)
          : null,
        slots.default?.(),
      ])
  },
})

export const InlineCitationQuote = defineComponent({
  name: 'InlineCitationQuote',
  setup(_, { attrs, slots }) {
    return () => h('blockquote', { ...attrs, 'data-scope': SCOPE, 'data-part': 'quote' }, slots.default?.())
  },
})
