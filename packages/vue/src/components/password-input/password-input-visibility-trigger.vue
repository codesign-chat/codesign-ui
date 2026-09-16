<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PasswordInputVisibilityTriggerBaseProps extends PolymorphicProps {}
export interface PasswordInputVisibilityTriggerProps
  extends
    PasswordInputVisibilityTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PasswordInputVisibilityTriggerProps>()

const passwordInput = usePasswordInputContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="passwordInput.getVisibilityTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
