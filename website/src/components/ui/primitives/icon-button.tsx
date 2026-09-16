import { codesign } from '@codesign-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { type ButtonVariantProps, button } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type IconButtonProps = ComponentProps<typeof IconButton>
export const IconButton = styled(codesign.button, button, {
  defaultProps: { px: '0' } as ButtonVariantProps,
})
