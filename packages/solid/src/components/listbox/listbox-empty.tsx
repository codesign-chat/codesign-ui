import { createMemo, Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { listboxAnatomy } from './listbox.anatomy.ts'
import { useListboxContext } from './use-listbox-context.ts'

const parts = listboxAnatomy.build()

export interface ListboxEmptyBaseProps extends PolymorphicProps<'div'> {}
export interface ListboxEmptyProps extends HTMLProps<'div'>, ListboxEmptyBaseProps {}

export const ListboxEmpty = (props: ListboxEmptyProps) => {
  const listbox = useListboxContext()
  const size = createMemo(() => listbox().collection.size)

  return (
    <Show when={size() === 0}>
      <codesign.div {...parts.empty.attrs} {...props} role="presentation" />
    </Show>
  )
}
