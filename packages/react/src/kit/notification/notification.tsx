'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface NotificationBaseProps extends PolymorphicProps {}
export interface NotificationProps extends HTMLProps<'div'>, NotificationBaseProps {}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="notification" data-part="root" />
))

Notification.displayName = 'Notification'

export interface NotificationIconBaseProps extends PolymorphicProps {}
export interface NotificationIconProps extends HTMLProps<'span'>, NotificationIconBaseProps {}

export const NotificationIcon = forwardRef<HTMLSpanElement, NotificationIconProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="notification" data-part="icon" />
))

NotificationIcon.displayName = 'NotificationIcon'

export interface NotificationTitleBaseProps extends PolymorphicProps {}
export interface NotificationTitleProps extends HTMLProps<'h4'>, NotificationTitleBaseProps {}

export const NotificationTitle = forwardRef<HTMLHeadingElement, NotificationTitleProps>((props, ref) => (
  <codesign.h4 {...props} ref={ref} data-scope="notification" data-part="title" />
))

NotificationTitle.displayName = 'NotificationTitle'

export interface NotificationDescriptionBaseProps extends PolymorphicProps {}
export interface NotificationDescriptionProps extends HTMLProps<'p'>, NotificationDescriptionBaseProps {}

export const NotificationDescription = forwardRef<HTMLParagraphElement, NotificationDescriptionProps>((props, ref) => (
  <codesign.p {...props} ref={ref} data-scope="notification" data-part="description" />
))

NotificationDescription.displayName = 'NotificationDescription'

export interface NotificationActionBaseProps extends PolymorphicProps {}
export interface NotificationActionProps extends HTMLProps<'div'>, NotificationActionBaseProps {}

export const NotificationAction = forwardRef<HTMLDivElement, NotificationActionProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="notification" data-part="action" />
))

NotificationAction.displayName = 'NotificationAction'

export interface NotificationCloseTriggerBaseProps extends PolymorphicProps {}
export interface NotificationCloseTriggerProps extends HTMLProps<'button'>, NotificationCloseTriggerBaseProps {}

export const NotificationCloseTrigger = forwardRef<HTMLButtonElement, NotificationCloseTriggerProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="notification" data-part="close" />
))

NotificationCloseTrigger.displayName = 'NotificationCloseTrigger'
