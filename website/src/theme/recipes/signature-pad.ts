import { signaturePadAnatomy } from '@codesign-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const signaturePad = defineSlotRecipe({
  className: 'signaturePad',
  slots: signaturePadAnatomy.keys(),
  base: {},
})
