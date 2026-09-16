'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useFieldContext } from '../field/index.ts'
import { useSelectContext } from './use-select-context.ts'

export interface SelectHiddenSelectBaseProps extends PolymorphicProps {}
export interface SelectHiddenSelectProps extends HTMLProps<'select'>, SelectHiddenSelectBaseProps {}

export const SelectHiddenSelect = forwardRef<HTMLSelectElement, SelectHiddenSelectProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getHiddenSelectProps(), props)
  const isValueEmpty = select.value.length === 0
  const field = useFieldContext()

  return (
    <codesign.select aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref}>
      {isValueEmpty && <option value="" />}
      {select.collection.items.map((item, index) => (
        <option
          key={index}
          value={select.collection.getItemValue(item) ?? ''}
          disabled={select.collection.getItemDisabled(item)}
        >
          {select.collection.stringifyItem(item)}
        </option>
      ))}
    </codesign.select>
  )
})
SelectHiddenSelect.displayName = 'SelectHiddenSelect'
