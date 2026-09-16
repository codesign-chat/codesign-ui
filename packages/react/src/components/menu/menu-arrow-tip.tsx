'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuArrowTipBaseProps extends PolymorphicProps {}
export interface MenuArrowTipProps extends HTMLProps<'div'>, MenuArrowTipBaseProps {}

export const MenuArrowTip = forwardRef<HTMLDivElement, MenuArrowTipProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getArrowTipProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

MenuArrowTip.displayName = 'MenuArrowTip'
