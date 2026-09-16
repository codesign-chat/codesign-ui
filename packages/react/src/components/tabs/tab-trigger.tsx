'use client'

import { mergeProps } from '@zag-js/react'
import type { TriggerProps } from '@zag-js/tabs'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTabsContext } from './use-tabs-context.ts'

export interface TabTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface TabTriggerProps extends Assign<HTMLProps<'button'>, TabTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>((props, ref) => {
  const [tabProps, localProps] = splitTriggerProps(props, ['disabled', 'value'])
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs.getTriggerProps(tabProps), localProps)

  return <codesign.button {...mergedProps} ref={ref} />
})

TabTrigger.displayName = 'TabTrigger'
