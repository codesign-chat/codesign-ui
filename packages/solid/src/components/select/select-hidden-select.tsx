import { mergeProps } from '@zag-js/solid'
import { Index, Show, createMemo } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useSelectContext } from './use-select-context.ts'

export interface SelectHiddenSelectBaseProps extends PolymorphicProps<'select'> {}
export interface SelectHiddenSelectProps extends HTMLProps<'select'>, SelectHiddenSelectBaseProps {}

export const SelectHiddenSelect = (props: SelectHiddenSelectProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getHiddenSelectProps(), props)
  const isValueEmpty = createMemo(() => select().value.length === 0)
  const field = useFieldContext()

  return (
    <codesign.select aria-describedby={field?.().ariaDescribedby} {...mergedProps}>
      <Show when={isValueEmpty()}>
        <codesign.option value="" />
      </Show>
      <Index each={select().collection.items}>
        {(item) => (
          <codesign.option
            value={select().collection.getItemValue(item()) ?? ''}
            disabled={select().collection.getItemDisabled(item())}
          >
            {select().collection.stringifyItem(item())}
          </codesign.option>
        )}
      </Index>
    </codesign.select>
  )
}
