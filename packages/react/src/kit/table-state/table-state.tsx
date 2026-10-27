'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface TableStateBaseProps extends PolymorphicProps {}
export interface TableStateProps extends HTMLProps<'div'>, TableStateBaseProps {}

export const TableState = forwardRef<HTMLDivElement, TableStateProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="table-state" data-part="root" />
))

TableState.displayName = 'TableState'

export interface TableStateIconBaseProps extends PolymorphicProps {}
export interface TableStateIconProps extends HTMLProps<'span'>, TableStateIconBaseProps {}

export const TableStateIcon = forwardRef<HTMLSpanElement, TableStateIconProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="table-state" data-part="icon" />
))

TableStateIcon.displayName = 'TableStateIcon'

export interface TableStateTitleBaseProps extends PolymorphicProps {}
export interface TableStateTitleProps extends HTMLProps<'h3'>, TableStateTitleBaseProps {}

export const TableStateTitle = forwardRef<HTMLHeadingElement, TableStateTitleProps>((props, ref) => (
  <codesign.h3 {...props} ref={ref} data-scope="table-state" data-part="title" />
))

TableStateTitle.displayName = 'TableStateTitle'

export interface TableStateDescriptionBaseProps extends PolymorphicProps {}
export interface TableStateDescriptionProps extends HTMLProps<'p'>, TableStateDescriptionBaseProps {}

export const TableStateDescription = forwardRef<HTMLParagraphElement, TableStateDescriptionProps>((props, ref) => (
  <codesign.p {...props} ref={ref} data-scope="table-state" data-part="description" />
))

TableStateDescription.displayName = 'TableStateDescription'

export interface TableStateActionBaseProps extends PolymorphicProps {}
export interface TableStateActionProps extends HTMLProps<'div'>, TableStateActionBaseProps {}

export const TableStateAction = forwardRef<HTMLDivElement, TableStateActionProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="table-state" data-part="action" />
))

TableStateAction.displayName = 'TableStateAction'
