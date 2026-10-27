'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface SearchBaseProps extends PolymorphicProps {}
export interface SearchProps extends HTMLProps<'div'>, SearchBaseProps {}

export const Search = forwardRef<HTMLDivElement, SearchProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="search" data-part="root" />
))

Search.displayName = 'Search'

export interface SearchInputBaseProps extends PolymorphicProps {}
export interface SearchInputProps extends HTMLProps<'input'>, SearchInputBaseProps {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => (
  <codesign.input {...props} ref={ref} data-scope="search" data-part="input" />
))

SearchInput.displayName = 'SearchInput'

export interface SearchIconBaseProps extends PolymorphicProps {}
export interface SearchIconProps extends HTMLProps<'span'>, SearchIconBaseProps {}

export const SearchIcon = forwardRef<HTMLSpanElement, SearchIconProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="search" data-part="icon" />
))

SearchIcon.displayName = 'SearchIcon'

export interface SearchClearTriggerBaseProps extends PolymorphicProps {}
export interface SearchClearTriggerProps extends HTMLProps<'button'>, SearchClearTriggerBaseProps {}

export const SearchClearTrigger = forwardRef<HTMLButtonElement, SearchClearTriggerProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="search" data-part="clear" />
))

SearchClearTrigger.displayName = 'SearchClearTrigger'
