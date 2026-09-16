import { codesign } from '@codesign-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { formLabel } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type FormLabelProps = ComponentProps<typeof FormLabel>
export const FormLabel = styled(codesign.label, formLabel)
