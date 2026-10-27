'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface FabRootBaseProps extends PolymorphicProps {}
export interface FabRootProps extends HTMLProps<'button'>, FabRootBaseProps {}

export const FabRoot = forwardRef<HTMLButtonElement, FabRootProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="fab" data-part="root" />
))

FabRoot.displayName = 'FabRoot'

export interface FabIconBaseProps extends PolymorphicProps {}
export interface FabIconProps extends HTMLProps<'span'>, FabIconBaseProps {}

export const FabIcon = forwardRef<HTMLSpanElement, FabIconProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="fab" data-part="icon" />
))

FabIcon.displayName = 'FabIcon'

export interface FabLabelBaseProps extends PolymorphicProps {}
export interface FabLabelProps extends HTMLProps<'span'>, FabLabelBaseProps {}

export const FabLabel = forwardRef<HTMLSpanElement, FabLabelProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="fab" data-part="label" />
))

FabLabel.displayName = 'FabLabel'
