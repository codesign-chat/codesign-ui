'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface ChipBaseProps extends PolymorphicProps {}
export interface ChipProps extends HTMLProps<'span'>, ChipBaseProps {}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="chip" data-part="root" />
))

Chip.displayName = 'Chip'

export interface ChipLabelBaseProps extends PolymorphicProps {}
export interface ChipLabelProps extends HTMLProps<'span'>, ChipLabelBaseProps {}

export const ChipLabel = forwardRef<HTMLSpanElement, ChipLabelProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="chip" data-part="label" />
))

ChipLabel.displayName = 'ChipLabel'

export interface ChipRemoveTriggerBaseProps extends PolymorphicProps {}
export interface ChipRemoveTriggerProps extends HTMLProps<'button'>, ChipRemoveTriggerBaseProps {}

export const ChipRemoveTrigger = forwardRef<HTMLButtonElement, ChipRemoveTriggerProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="chip" data-part="remove" />
))

ChipRemoveTrigger.displayName = 'ChipRemoveTrigger'
