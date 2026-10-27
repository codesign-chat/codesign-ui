'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface LinkBaseProps extends PolymorphicProps {}
export interface LinkProps extends HTMLProps<'a'>, LinkBaseProps {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <codesign.a {...props} ref={ref} data-scope="link" data-part="root" />
))

Link.displayName = 'Link'
