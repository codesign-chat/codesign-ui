'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface SplitButtonBaseProps extends PolymorphicProps {}
export interface SplitButtonProps extends HTMLProps<'div'>, SplitButtonBaseProps {}

export const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="split-button" data-part="root" />
))

SplitButton.displayName = 'SplitButton'

export interface SplitButtonActionBaseProps extends PolymorphicProps {}
export interface SplitButtonActionProps extends HTMLProps<'button'>, SplitButtonActionBaseProps {}

export const SplitButtonAction = forwardRef<HTMLButtonElement, SplitButtonActionProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="split-button" data-part="action" />
))

SplitButtonAction.displayName = 'SplitButtonAction'

export interface SplitButtonTriggerBaseProps extends PolymorphicProps {}
export interface SplitButtonTriggerProps extends HTMLProps<'button'>, SplitButtonTriggerBaseProps {}

export const SplitButtonTrigger = forwardRef<HTMLButtonElement, SplitButtonTriggerProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="split-button" data-part="trigger" />
))

SplitButtonTrigger.displayName = 'SplitButtonTrigger'
