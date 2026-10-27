'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface IconButtonBaseProps extends PolymorphicProps {}
export interface IconButtonProps extends HTMLProps<'button'>, IconButtonBaseProps {}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="icon-button" data-part="root" />
))

IconButton.displayName = 'IconButton'

export interface IconButtonIconBaseProps extends PolymorphicProps {}
export interface IconButtonIconProps extends HTMLProps<'span'>, IconButtonIconBaseProps {}

export const IconButtonIcon = forwardRef<HTMLSpanElement, IconButtonIconProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="icon-button" data-part="icon" />
))

IconButtonIcon.displayName = 'IconButtonIcon'
