'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuIndicatorBaseProps extends PolymorphicProps {}
export interface MenuIndicatorProps extends HTMLProps<'div'>, MenuIndicatorBaseProps {}

export const MenuIndicator = forwardRef<HTMLDivElement, MenuIndicatorProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getIndicatorProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

MenuIndicator.displayName = 'MenuIndicator'
