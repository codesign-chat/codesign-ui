'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface CardBaseProps extends PolymorphicProps {}
export interface CardProps extends HTMLProps<'div'>, CardBaseProps {}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="card" data-part="root" />
))

Card.displayName = 'Card'

export interface CardHeaderBaseProps extends PolymorphicProps {}
export interface CardHeaderProps extends HTMLProps<'div'>, CardHeaderBaseProps {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="card" data-part="header" />
))

CardHeader.displayName = 'CardHeader'

export interface CardTitleBaseProps extends PolymorphicProps {}
export interface CardTitleProps extends HTMLProps<'h3'>, CardTitleBaseProps {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>((props, ref) => (
  <codesign.h3 {...props} ref={ref} data-scope="card" data-part="title" />
))

CardTitle.displayName = 'CardTitle'

export interface CardDescriptionBaseProps extends PolymorphicProps {}
export interface CardDescriptionProps extends HTMLProps<'p'>, CardDescriptionBaseProps {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>((props, ref) => (
  <codesign.p {...props} ref={ref} data-scope="card" data-part="description" />
))

CardDescription.displayName = 'CardDescription'

export interface CardContentBaseProps extends PolymorphicProps {}
export interface CardContentProps extends HTMLProps<'div'>, CardContentBaseProps {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="card" data-part="content" />
))

CardContent.displayName = 'CardContent'

export interface CardFooterBaseProps extends PolymorphicProps {}
export interface CardFooterProps extends HTMLProps<'div'>, CardFooterBaseProps {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="card" data-part="footer" />
))

CardFooter.displayName = 'CardFooter'
