'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface BreadcrumbBaseProps extends PolymorphicProps {}
export interface BreadcrumbProps extends HTMLProps<'nav'>, BreadcrumbBaseProps {}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>((props, ref) => (
  <codesign.nav {...props} ref={ref} data-scope="breadcrumb" data-part="root" />
))

Breadcrumb.displayName = 'Breadcrumb'

export interface BreadcrumbListBaseProps extends PolymorphicProps {}
export interface BreadcrumbListProps extends HTMLProps<'ol'>, BreadcrumbListBaseProps {}

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>((props, ref) => (
  <codesign.ol {...props} ref={ref} data-scope="breadcrumb" data-part="list" />
))

BreadcrumbList.displayName = 'BreadcrumbList'

export interface BreadcrumbItemBaseProps extends PolymorphicProps {}
export interface BreadcrumbItemProps extends HTMLProps<'li'>, BreadcrumbItemBaseProps {}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>((props, ref) => (
  <codesign.li {...props} ref={ref} data-scope="breadcrumb" data-part="item" />
))

BreadcrumbItem.displayName = 'BreadcrumbItem'

export interface BreadcrumbLinkBaseProps extends PolymorphicProps {}
export interface BreadcrumbLinkProps extends HTMLProps<'a'>, BreadcrumbLinkBaseProps {}

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>((props, ref) => (
  <codesign.a {...props} ref={ref} data-scope="breadcrumb" data-part="link" />
))

BreadcrumbLink.displayName = 'BreadcrumbLink'

export interface BreadcrumbSeparatorBaseProps extends PolymorphicProps {}
export interface BreadcrumbSeparatorProps extends HTMLProps<'span'>, BreadcrumbSeparatorBaseProps {}

export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="breadcrumb" data-part="separator" />
))

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export interface BreadcrumbCurrentBaseProps extends PolymorphicProps {}
export interface BreadcrumbCurrentProps extends HTMLProps<'span'>, BreadcrumbCurrentBaseProps {}

export const BreadcrumbCurrent = forwardRef<HTMLSpanElement, BreadcrumbCurrentProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="breadcrumb" data-part="current" />
))

BreadcrumbCurrent.displayName = 'BreadcrumbCurrent'
