'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface PopconfirmBaseProps extends PolymorphicProps {}
export interface PopconfirmProps extends HTMLProps<'div'>, PopconfirmBaseProps {}

export const Popconfirm = forwardRef<HTMLDivElement, PopconfirmProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="popconfirm" data-part="root" />
))

Popconfirm.displayName = 'Popconfirm'

export interface PopconfirmTriggerBaseProps extends PolymorphicProps {}
export interface PopconfirmTriggerProps extends HTMLProps<'button'>, PopconfirmTriggerBaseProps {}

export const PopconfirmTrigger = forwardRef<HTMLButtonElement, PopconfirmTriggerProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="popconfirm" data-part="trigger" />
))

PopconfirmTrigger.displayName = 'PopconfirmTrigger'

export interface PopconfirmContentBaseProps extends PolymorphicProps {}
export interface PopconfirmContentProps extends HTMLProps<'div'>, PopconfirmContentBaseProps {}

export const PopconfirmContent = forwardRef<HTMLDivElement, PopconfirmContentProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="popconfirm" data-part="content" />
))

PopconfirmContent.displayName = 'PopconfirmContent'

export interface PopconfirmTitleBaseProps extends PolymorphicProps {}
export interface PopconfirmTitleProps extends HTMLProps<'h3'>, PopconfirmTitleBaseProps {}

export const PopconfirmTitle = forwardRef<HTMLHeadingElement, PopconfirmTitleProps>((props, ref) => (
  <codesign.h3 {...props} ref={ref} data-scope="popconfirm" data-part="title" />
))

PopconfirmTitle.displayName = 'PopconfirmTitle'

export interface PopconfirmDescriptionBaseProps extends PolymorphicProps {}
export interface PopconfirmDescriptionProps extends HTMLProps<'p'>, PopconfirmDescriptionBaseProps {}

export const PopconfirmDescription = forwardRef<HTMLParagraphElement, PopconfirmDescriptionProps>((props, ref) => (
  <codesign.p {...props} ref={ref} data-scope="popconfirm" data-part="description" />
))

PopconfirmDescription.displayName = 'PopconfirmDescription'

export interface PopconfirmActionsBaseProps extends PolymorphicProps {}
export interface PopconfirmActionsProps extends HTMLProps<'div'>, PopconfirmActionsBaseProps {}

export const PopconfirmActions = forwardRef<HTMLDivElement, PopconfirmActionsProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="popconfirm" data-part="actions" />
))

PopconfirmActions.displayName = 'PopconfirmActions'
