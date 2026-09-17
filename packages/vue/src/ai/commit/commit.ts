import { computed, defineComponent, h, ref, type PropType } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'
import { AvatarRoot, AvatarFallback } from '../../components/avatar/index.ts'

const SCOPE = 'commit'

const relativeTimeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

const formatRelativeDate = (date: Date) => {
  const days = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  return relativeTimeFormat.format(days, 'day')
}

export const Commit = defineComponent({
  name: 'Commit',
  setup(_, { attrs, slots }) {
    return () => h(CollapsibleRoot as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default)
  },
})

export const CommitHeader = defineComponent({
  name: 'CommitHeader',
  setup(_, { attrs, slots }) {
    return () => h(CollapsibleTrigger as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'header' }, slots.default)
  },
})

export const CommitHash = defineComponent({
  name: 'CommitHash',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'hash' }, slots.default?.())
  },
})

export const CommitMessage = defineComponent({
  name: 'CommitMessage',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'message' }, slots.default?.())
  },
})

export const CommitMetadata = defineComponent({
  name: 'CommitMetadata',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'metadata' }, slots.default?.())
  },
})

export const CommitSeparator = defineComponent({
  name: 'CommitSeparator',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'separator' }, slots.default?.() ?? '•')
  },
})

export const CommitInfo = defineComponent({
  name: 'CommitInfo',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'info' }, slots.default?.())
  },
})

export const CommitAuthor = defineComponent({
  name: 'CommitAuthor',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'author' }, slots.default?.())
  },
})

export const CommitAuthorAvatar = defineComponent({
  name: 'CommitAuthorAvatar',
  props: { initials: { type: String, required: true } },
  setup(props, { attrs }) {
    return () =>
      h(AvatarRoot as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'author-avatar' }, () =>
        h(AvatarFallback as any, null, () => props.initials),
      )
  },
})

export const CommitTimestamp = defineComponent({
  name: 'CommitTimestamp',
  props: { date: { type: Object as PropType<Date>, required: true } },
  setup(props, { attrs, slots }) {
    const formatted = computed(() => formatRelativeDate(props.date))
    return () =>
      h(
        'time',
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'timestamp', dateTime: props.date.toISOString() },
        slots.default?.() ?? formatted.value,
      )
  },
})

export const CommitActions = defineComponent({
  name: 'CommitActions',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-scope': SCOPE,
          'data-part': 'actions',
          onClick: (event: Event) => event.stopPropagation(),
          onKeydown: (event: Event) => event.stopPropagation(),
          role: 'group',
        },
        slots.default?.(),
      )
  },
})

export const CommitCopyButton = defineComponent({
  name: 'CommitCopyButton',
  props: {
    hash: { type: String, required: true },
    timeout: { type: Number, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const isCopied = ref(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    return () =>
      h(
        'button',
        {
          ...attrs,
          'aria-label': 'Copy hash',
          'data-copied': isCopied.value || undefined,
          'data-scope': SCOPE,
          'data-part': 'copy-button',
          onClick: () => {
            navigator.clipboard
              .writeText(props.hash)
              .then(() => {
                isCopied.value = true
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => (isCopied.value = false), props.timeout ?? 2000)
              })
              .catch(() => {
                // clipboard unavailable
              })
          },
          type: 'button',
        },
        slots.default?.({ isCopied: isCopied.value }),
      )
  },
})

export const CommitContent = defineComponent({
  name: 'CommitContent',
  setup(_, { attrs, slots }) {
    return () => h(CollapsibleContent as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default)
  },
})

export const CommitFiles = defineComponent({
  name: 'CommitFiles',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'files' }, slots.default?.())
  },
})

export const CommitFile = defineComponent({
  name: 'CommitFile',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'file' }, slots.default?.())
  },
})

export const CommitFileInfo = defineComponent({
  name: 'CommitFileInfo',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'file-info' }, slots.default?.())
  },
})

const fileStatusLabels = { added: 'A', deleted: 'D', modified: 'M', renamed: 'R' } as const

export const CommitFileStatus = defineComponent({
  name: 'CommitFileStatus',
  props: { status: { type: String as PropType<'added' | 'deleted' | 'modified' | 'renamed'>, required: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'span',
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'file-status', 'data-status': props.status },
        slots.default?.() ?? fileStatusLabels[props.status],
      )
  },
})

export const CommitFilePath = defineComponent({
  name: 'CommitFilePath',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'file-path' }, slots.default?.())
  },
})

export const CommitFileChanges = defineComponent({
  name: 'CommitFileChanges',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'file-changes' }, slots.default?.())
  },
})

export const CommitFileAdditions = defineComponent({
  name: 'CommitFileAdditions',
  props: { count: { type: Number, required: true } },
  setup(props, { attrs, slots }) {
    return () =>
      props.count > 0
        ? h(
            'span',
            { ...attrs, 'data-scope': SCOPE, 'data-part': 'file-additions' },
            slots.default?.() ?? `+${props.count}`,
          )
        : null
  },
})

export const CommitFileDeletions = defineComponent({
  name: 'CommitFileDeletions',
  props: { count: { type: Number, required: true } },
  setup(props, { attrs, slots }) {
    return () =>
      props.count > 0
        ? h(
            'span',
            { ...attrs, 'data-scope': SCOPE, 'data-part': 'file-deletions' },
            slots.default?.() ?? `-${props.count}`,
          )
        : null
  },
})
