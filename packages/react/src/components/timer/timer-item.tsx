'use client'

import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/timer'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTimerContext } from './use-timer-context.ts'

export interface TimerItemBaseProps extends ItemProps, PolymorphicProps {}
export interface TimerItemProps extends HTMLProps<'div'>, TimerItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const TimerItem = forwardRef<HTMLDivElement, TimerItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['type'])
  const timer = useTimerContext()

  const mergedProps = mergeProps(timer.getItemProps(itemProps), localProps)

  return (
    <codesign.div {...mergedProps} ref={ref}>
      {timer.formattedTime[itemProps.type]}
    </codesign.div>
  )
})

TimerItem.displayName = 'TimerItem'
