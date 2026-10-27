'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface ButtonGroupBaseProps extends PolymorphicProps {}
export interface ButtonGroupProps extends HTMLProps<'div'>, ButtonGroupBaseProps {}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="button-group" data-part="root" />
))

ButtonGroup.displayName = 'ButtonGroup'

export interface ButtonGroupItemBaseProps extends PolymorphicProps {}
export interface ButtonGroupItemProps extends HTMLProps<'button'>, ButtonGroupItemBaseProps {}

export const ButtonGroupItem = forwardRef<HTMLButtonElement, ButtonGroupItemProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="button-group" data-part="item" />
))

ButtonGroupItem.displayName = 'ButtonGroupItem'
