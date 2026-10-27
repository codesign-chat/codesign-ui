'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface TabBandBaseProps extends PolymorphicProps {}
export interface TabBandProps extends HTMLProps<'div'>, TabBandBaseProps {}

export const TabBand = forwardRef<HTMLDivElement, TabBandProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="tab-band" data-part="root" />
))

TabBand.displayName = 'TabBand'

export interface TabBandListBaseProps extends PolymorphicProps {}
export interface TabBandListProps extends HTMLProps<'div'>, TabBandListBaseProps {}

export const TabBandList = forwardRef<HTMLDivElement, TabBandListProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="tab-band" data-part="list" />
))

TabBandList.displayName = 'TabBandList'

export interface TabBandItemBaseProps extends PolymorphicProps {}
export interface TabBandItemProps extends HTMLProps<'button'>, TabBandItemBaseProps {}

export const TabBandItem = forwardRef<HTMLButtonElement, TabBandItemProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="tab-band" data-part="item" />
))

TabBandItem.displayName = 'TabBandItem'
