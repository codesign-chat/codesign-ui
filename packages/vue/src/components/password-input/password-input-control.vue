<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PasswordInputControlBaseProps extends PolymorphicProps {}
export interface PasswordInputControlProps
  extends
    PasswordInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PasswordInputControlProps>()

const passwordInput = usePasswordInputContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="passwordInput.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
