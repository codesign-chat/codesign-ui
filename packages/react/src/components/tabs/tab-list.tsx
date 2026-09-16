'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useTabsContext } from './use-tabs-context.ts'

export interface TabListBaseProps extends PolymorphicProps {}
export interface TabListProps extends HTMLProps<'div'>, TabListBaseProps {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs.getListProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

TabList.displayName = 'TabList'
