'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface AlertBaseProps extends PolymorphicProps {}
export interface AlertProps extends HTMLProps<'div'>, AlertBaseProps {}

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="alert" data-part="root" />
))

Alert.displayName = 'Alert'

export interface AlertIconBaseProps extends PolymorphicProps {}
export interface AlertIconProps extends HTMLProps<'span'>, AlertIconBaseProps {}

export const AlertIcon = forwardRef<HTMLSpanElement, AlertIconProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="alert" data-part="icon" />
))

AlertIcon.displayName = 'AlertIcon'

export interface AlertTitleBaseProps extends PolymorphicProps {}
export interface AlertTitleProps extends HTMLProps<'h3'>, AlertTitleBaseProps {}

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>((props, ref) => (
  <codesign.h3 {...props} ref={ref} data-scope="alert" data-part="title" />
))

AlertTitle.displayName = 'AlertTitle'

export interface AlertDescriptionBaseProps extends PolymorphicProps {}
export interface AlertDescriptionProps extends HTMLProps<'p'>, AlertDescriptionBaseProps {}

export const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>((props, ref) => (
  <codesign.p {...props} ref={ref} data-scope="alert" data-part="description" />
))

AlertDescription.displayName = 'AlertDescription'

export interface AlertActionBaseProps extends PolymorphicProps {}
export interface AlertActionProps extends HTMLProps<'div'>, AlertActionBaseProps {}

export const AlertAction = forwardRef<HTMLDivElement, AlertActionProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="alert" data-part="action" />
))

AlertAction.displayName = 'AlertAction'
