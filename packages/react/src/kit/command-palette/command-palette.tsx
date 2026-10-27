'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface CommandPaletteBaseProps extends PolymorphicProps {}
export interface CommandPaletteProps extends HTMLProps<'div'>, CommandPaletteBaseProps {}

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="command-palette" data-part="root" />
))

CommandPalette.displayName = 'CommandPalette'

export interface CommandPaletteInputBaseProps extends PolymorphicProps {}
export interface CommandPaletteInputProps extends HTMLProps<'input'>, CommandPaletteInputBaseProps {}

export const CommandPaletteInput = forwardRef<HTMLInputElement, CommandPaletteInputProps>((props, ref) => (
  <codesign.input {...props} ref={ref} data-scope="command-palette" data-part="input" />
))

CommandPaletteInput.displayName = 'CommandPaletteInput'

export interface CommandPaletteListBaseProps extends PolymorphicProps {}
export interface CommandPaletteListProps extends HTMLProps<'ul'>, CommandPaletteListBaseProps {}

export const CommandPaletteList = forwardRef<HTMLUListElement, CommandPaletteListProps>((props, ref) => (
  <codesign.ul {...props} ref={ref} data-scope="command-palette" data-part="list" />
))

CommandPaletteList.displayName = 'CommandPaletteList'

export interface CommandPaletteGroupBaseProps extends PolymorphicProps {}
export interface CommandPaletteGroupProps extends HTMLProps<'div'>, CommandPaletteGroupBaseProps {}

export const CommandPaletteGroup = forwardRef<HTMLDivElement, CommandPaletteGroupProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="command-palette" data-part="group" />
))

CommandPaletteGroup.displayName = 'CommandPaletteGroup'

export interface CommandPaletteItemBaseProps extends PolymorphicProps {}
export interface CommandPaletteItemProps extends HTMLProps<'li'>, CommandPaletteItemBaseProps {}

export const CommandPaletteItem = forwardRef<HTMLLIElement, CommandPaletteItemProps>((props, ref) => (
  <codesign.li {...props} ref={ref} data-scope="command-palette" data-part="item" />
))

CommandPaletteItem.displayName = 'CommandPaletteItem'

export interface CommandPaletteEmptyBaseProps extends PolymorphicProps {}
export interface CommandPaletteEmptyProps extends HTMLProps<'div'>, CommandPaletteEmptyBaseProps {}

export const CommandPaletteEmpty = forwardRef<HTMLDivElement, CommandPaletteEmptyProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="command-palette" data-part="empty" />
))

CommandPaletteEmpty.displayName = 'CommandPaletteEmpty'
