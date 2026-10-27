'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface AvatarGroupBaseProps extends PolymorphicProps {}
export interface AvatarGroupProps extends HTMLProps<'div'>, AvatarGroupBaseProps {}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="avatar-group" data-part="root" />
))

AvatarGroup.displayName = 'AvatarGroup'

export interface AvatarGroupItemBaseProps extends PolymorphicProps {}
export interface AvatarGroupItemProps extends HTMLProps<'div'>, AvatarGroupItemBaseProps {}

export const AvatarGroupItem = forwardRef<HTMLDivElement, AvatarGroupItemProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="avatar-group" data-part="item" />
))

AvatarGroupItem.displayName = 'AvatarGroupItem'
