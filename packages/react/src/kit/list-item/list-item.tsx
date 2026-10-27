'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface ListItemBaseProps extends PolymorphicProps {}
export interface ListItemProps extends HTMLProps<'div'>, ListItemBaseProps {}

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="list-item" data-part="root" />
))

ListItem.displayName = 'ListItem'

export interface ListItemContentBaseProps extends PolymorphicProps {}
export interface ListItemContentProps extends HTMLProps<'div'>, ListItemContentBaseProps {}

export const ListItemContent = forwardRef<HTMLDivElement, ListItemContentProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="list-item" data-part="content" />
))

ListItemContent.displayName = 'ListItemContent'

export interface ListItemTitleBaseProps extends PolymorphicProps {}
export interface ListItemTitleProps extends HTMLProps<'span'>, ListItemTitleBaseProps {}

export const ListItemTitle = forwardRef<HTMLSpanElement, ListItemTitleProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="list-item" data-part="title" />
))

ListItemTitle.displayName = 'ListItemTitle'

export interface ListItemDescriptionBaseProps extends PolymorphicProps {}
export interface ListItemDescriptionProps extends HTMLProps<'span'>, ListItemDescriptionBaseProps {}

export const ListItemDescription = forwardRef<HTMLSpanElement, ListItemDescriptionProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="list-item" data-part="description" />
))

ListItemDescription.displayName = 'ListItemDescription'

export interface ListItemTrailingBaseProps extends PolymorphicProps {}
export interface ListItemTrailingProps extends HTMLProps<'div'>, ListItemTrailingBaseProps {}

export const ListItemTrailing = forwardRef<HTMLDivElement, ListItemTrailingProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="list-item" data-part="trailing" />
))

ListItemTrailing.displayName = 'ListItemTrailing'
