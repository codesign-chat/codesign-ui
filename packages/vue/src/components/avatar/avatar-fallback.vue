<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface AvatarFallbackBaseProps extends PolymorphicProps {}
export interface AvatarFallbackProps
  extends
    AvatarFallbackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useAvatarContext } from './use-avatar-context.ts'

defineProps<AvatarFallbackProps>()
const avatar = useAvatarContext()
useForwardExpose()
</script>

<template>
  <codesign.span v-bind="avatar.getFallbackProps()" :as-child="asChild">
    <slot />
  </codesign.span>
</template>
