'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface SheetBaseProps extends PolymorphicProps {}
export interface SheetProps extends HTMLProps<'div'>, SheetBaseProps {}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="sheet" data-part="root" />
))

Sheet.displayName = 'Sheet'

export interface SheetContentBaseProps extends PolymorphicProps {}
export interface SheetContentProps extends HTMLProps<'div'>, SheetContentBaseProps {}

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="sheet" data-part="content" />
))

SheetContent.displayName = 'SheetContent'

export interface SheetHeaderBaseProps extends PolymorphicProps {}
export interface SheetHeaderProps extends HTMLProps<'div'>, SheetHeaderBaseProps {}

export const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="sheet" data-part="header" />
))

SheetHeader.displayName = 'SheetHeader'

export interface SheetTitleBaseProps extends PolymorphicProps {}
export interface SheetTitleProps extends HTMLProps<'h2'>, SheetTitleBaseProps {}

export const SheetTitle = forwardRef<HTMLHeadingElement, SheetTitleProps>((props, ref) => (
  <codesign.h2 {...props} ref={ref} data-scope="sheet" data-part="title" />
))

SheetTitle.displayName = 'SheetTitle'

export interface SheetBodyBaseProps extends PolymorphicProps {}
export interface SheetBodyProps extends HTMLProps<'div'>, SheetBodyBaseProps {}

export const SheetBody = forwardRef<HTMLDivElement, SheetBodyProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="sheet" data-part="body" />
))

SheetBody.displayName = 'SheetBody'

export interface SheetFooterBaseProps extends PolymorphicProps {}
export interface SheetFooterProps extends HTMLProps<'div'>, SheetFooterBaseProps {}

export const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="sheet" data-part="footer" />
))

SheetFooter.displayName = 'SheetFooter'

export interface SheetCloseTriggerBaseProps extends PolymorphicProps {}
export interface SheetCloseTriggerProps extends HTMLProps<'button'>, SheetCloseTriggerBaseProps {}

export const SheetCloseTrigger = forwardRef<HTMLButtonElement, SheetCloseTriggerProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="sheet" data-part="close" />
))

SheetCloseTrigger.displayName = 'SheetCloseTrigger'
