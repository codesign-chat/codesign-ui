import { codesign } from '@codesign-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { kbd } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type KbdProps = ComponentProps<typeof Kbd>
export const Kbd = styled(codesign.kbd, kbd)
