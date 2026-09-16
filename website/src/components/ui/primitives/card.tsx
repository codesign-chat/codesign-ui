'use client'
import type { Assign, PolymorphicProps } from '@codesign-ui/react'
import { type HTMLArkProps, codesign } from '@codesign-ui/react/factory'
import { type CardVariantProps, card } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(card)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, PolymorphicProps>, CardVariantProps>
>(codesign.div, 'root')

export const Body = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, PolymorphicProps>>(codesign.div, 'body')

export const Description = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, PolymorphicProps>>(
  codesign.div,
  'description',
)

export const Footer = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, PolymorphicProps>>(codesign.div, 'footer')

export const Header = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, PolymorphicProps>>(codesign.div, 'header')

export const Title = withContext<HTMLHeadingElement, Assign<HTMLStyledProps<'h3'>, HTMLArkProps<'h3'>>>(codesign.h3, 'title')
