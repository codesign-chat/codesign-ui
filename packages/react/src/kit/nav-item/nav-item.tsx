'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface NavItemBaseProps extends PolymorphicProps {}
export interface NavItemProps extends HTMLProps<'a'>, NavItemBaseProps {}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>((props, ref) => (
  <codesign.a {...props} ref={ref} data-scope="nav-item" data-part="root" />
))

NavItem.displayName = 'NavItem'

export interface NavItemIconBaseProps extends PolymorphicProps {}
export interface NavItemIconProps extends HTMLProps<'span'>, NavItemIconBaseProps {}

export const NavItemIcon = forwardRef<HTMLSpanElement, NavItemIconProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="nav-item" data-part="icon" />
))

NavItemIcon.displayName = 'NavItemIcon'

export interface NavItemLabelBaseProps extends PolymorphicProps {}
export interface NavItemLabelProps extends HTMLProps<'span'>, NavItemLabelBaseProps {}

export const NavItemLabel = forwardRef<HTMLSpanElement, NavItemLabelProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="nav-item" data-part="label" />
))

NavItemLabel.displayName = 'NavItemLabel'

export interface NavItemTrailingBaseProps extends PolymorphicProps {}
export interface NavItemTrailingProps extends HTMLProps<'span'>, NavItemTrailingBaseProps {}

export const NavItemTrailing = forwardRef<HTMLSpanElement, NavItemTrailingProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="nav-item" data-part="trailing" />
))

NavItemTrailing.displayName = 'NavItemTrailing'
