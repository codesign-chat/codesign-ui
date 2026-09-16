import { qrCodeAnatomy } from '@codesign-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const qrCode = defineSlotRecipe({
  className: 'qrCode',
  slots: qrCodeAnatomy.keys(),
  base: {},
})
