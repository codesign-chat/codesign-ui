'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface DescriptionsBaseProps extends PolymorphicProps {}
export interface DescriptionsProps extends HTMLProps<'dl'>, DescriptionsBaseProps {}

export const Descriptions = forwardRef<HTMLDListElement, DescriptionsProps>((props, ref) => (
  <codesign.dl {...props} ref={ref} data-scope="descriptions" data-part="root" />
))

Descriptions.displayName = 'Descriptions'

export interface DescriptionsItemBaseProps extends PolymorphicProps {}
export interface DescriptionsItemProps extends HTMLProps<'div'>, DescriptionsItemBaseProps {}

export const DescriptionsItem = forwardRef<HTMLDivElement, DescriptionsItemProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="descriptions" data-part="item" />
))

DescriptionsItem.displayName = 'DescriptionsItem'

export interface DescriptionsLabelBaseProps extends PolymorphicProps {}
export interface DescriptionsLabelProps extends HTMLProps<'dt'>, DescriptionsLabelBaseProps {}

export const DescriptionsLabel = forwardRef<HTMLElement, DescriptionsLabelProps>((props, ref) => (
  <codesign.dt {...props} ref={ref} data-scope="descriptions" data-part="label" />
))

DescriptionsLabel.displayName = 'DescriptionsLabel'

export interface DescriptionsValueBaseProps extends PolymorphicProps {}
export interface DescriptionsValueProps extends HTMLProps<'dd'>, DescriptionsValueBaseProps {}

export const DescriptionsValue = forwardRef<HTMLElement, DescriptionsValueProps>((props, ref) => (
  <codesign.dd {...props} ref={ref} data-scope="descriptions" data-part="value" />
))

DescriptionsValue.displayName = 'DescriptionsValue'
