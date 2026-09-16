<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PasswordInputLabelBaseProps extends PolymorphicProps {}
export interface PasswordInputLabelProps
  extends
    PasswordInputLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PasswordInputLabelProps>()

const passwordInput = usePasswordInputContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="passwordInput.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
