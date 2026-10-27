'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface ButtonBaseProps extends PolymorphicProps {}
export interface ButtonProps extends HTMLProps<'button'>, ButtonBaseProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="button" data-part="root" />
))

Button.displayName = 'Button'

export interface ButtonIconBaseProps extends PolymorphicProps {}
export interface ButtonIconProps extends HTMLProps<'span'>, ButtonIconBaseProps {}

export const ButtonIcon = forwardRef<HTMLSpanElement, ButtonIconProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="button" data-part="icon" />
))

ButtonIcon.displayName = 'ButtonIcon'

export interface ButtonLabelBaseProps extends PolymorphicProps {}
export interface ButtonLabelProps extends HTMLProps<'span'>, ButtonLabelBaseProps {}

export const ButtonLabel = forwardRef<HTMLSpanElement, ButtonLabelProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="button" data-part="label" />
))

ButtonLabel.displayName = 'ButtonLabel'
