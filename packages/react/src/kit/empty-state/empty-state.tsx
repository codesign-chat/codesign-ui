'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface EmptyStateBaseProps extends PolymorphicProps {}
export interface EmptyStateProps extends HTMLProps<'div'>, EmptyStateBaseProps {}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="empty-state" data-part="root" />
))

EmptyState.displayName = 'EmptyState'

export interface EmptyStateIconBaseProps extends PolymorphicProps {}
export interface EmptyStateIconProps extends HTMLProps<'div'>, EmptyStateIconBaseProps {}

export const EmptyStateIcon = forwardRef<HTMLDivElement, EmptyStateIconProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="empty-state" data-part="icon" />
))

EmptyStateIcon.displayName = 'EmptyStateIcon'

export interface EmptyStateTitleBaseProps extends PolymorphicProps {}
export interface EmptyStateTitleProps extends HTMLProps<'h3'>, EmptyStateTitleBaseProps {}

export const EmptyStateTitle = forwardRef<HTMLHeadingElement, EmptyStateTitleProps>((props, ref) => (
  <codesign.h3 {...props} ref={ref} data-scope="empty-state" data-part="title" />
))

EmptyStateTitle.displayName = 'EmptyStateTitle'

export interface EmptyStateDescriptionBaseProps extends PolymorphicProps {}
export interface EmptyStateDescriptionProps extends HTMLProps<'p'>, EmptyStateDescriptionBaseProps {}

export const EmptyStateDescription = forwardRef<HTMLParagraphElement, EmptyStateDescriptionProps>((props, ref) => (
  <codesign.p {...props} ref={ref} data-scope="empty-state" data-part="description" />
))

EmptyStateDescription.displayName = 'EmptyStateDescription'

export interface EmptyStateActionBaseProps extends PolymorphicProps {}
export interface EmptyStateActionProps extends HTMLProps<'div'>, EmptyStateActionBaseProps {}

export const EmptyStateAction = forwardRef<HTMLDivElement, EmptyStateActionProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="empty-state" data-part="action" />
))

EmptyStateAction.displayName = 'EmptyStateAction'
